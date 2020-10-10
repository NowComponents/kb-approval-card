import { actionTypes } from '@servicenow/ui-core';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import { createHttpEffect } from '@servicenow/ui-effect-http';

import { columns } from './columns.js';

export default {
    actionHandlers: {
        /**
         * Get approval data on load of component
         */
        [COMPONENT_BOOTSTRAPPED]: ({ dispatch, properties }) => {
            const fields = columns.map((col) => {
                return col.field;
            }).join(',');
            dispatch('FETCH_KB_APPROVAL_DATA', {
                sys_id: properties.sysid,
                sysparm_display_value: 'all',
                sysparm_exclude_reference_link: true,
                sysparm_fields: fields
            });
        },
        'FETCH_KB_APPROVAL_DATA': createHttpEffect('api/now/table/sysapproval_approver/:sys_id', {
            method: 'GET',
            pathParams: ['sys_id'],
            queryParams: [
                'sysparm_fields',
                'sysparm_display_value',
                'sysparm_exclude_reference_link'
            ],
            successActionType: 'FETCH_KB_APPROVAL_DATA_SUCCEEDED'
		}),
		'FETCH_KB_APPROVAL_DATA_SUCCEEDED': ({ action, updateState }) => {
            const record = action.payload.result;
            const modalState = { "modalOpened": false }
            updateState({record, modalState});
        },
        /**
         * Eye icon action clicked, open the modal which contains the 
         * KB article body for review
         */
        'NOW_CARD_HEADER#ACTION_CLICKED': ({ action, updateState }) => {
            const modalState = { "modalOpened": true }
            updateState({modalState});
        },
        /**
         * X clicked in modal pop-up, close the modal
         */
        'NOW_MODAL#OPENED_SET': ({ action, updateState }) => {
            const modalState = { "modalOpened": false }
            updateState({modalState});
        },
        /**
         * One of the approval action button clicked
         * Trigger the action to update the approval state based on which
         * button was clicked
         */
        'NOW_CARD_ACTIONS#ACTION_CLICKED': ({ action, properties, dispatch }) => {
            if (action.payload.action.label == 'Approve') {
                dispatch('UPDATE_APPROVAL', {
                    data: {"state": 'approved'},
                    sys_id: properties.sysid
                });
            }
            else if (action.payload.action.label == 'Reject') {
                dispatch('UPDATE_APPROVAL', {
                    data: {"state": 'rejected'},
                    sys_id: properties.sysid
                });
            }
        },
        /**
         * Update approval state via REST API
         */
        'UPDATE_APPROVAL': createHttpEffect('api/now/table/sysapproval_approver/:sys_id', {
            method: 'PATCH',
            pathParams: ['sys_id'],
            dataParam: 'data',            
            successActionType: 'UPDATE_KB_APPROVAL_SUCCEEDED'
        }),
        /**
         * TO DO: React to the updated state of the Approval
         */
        'UPDATE_KB_APPROVAL_SUCCEEDED': ({ action, updateState }) => {
            console.log("Approval action successful");
        }
    }
}