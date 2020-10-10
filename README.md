@nowcomponent/kb-approval-card
===============================================
An approval request for a KB Article rendered a now-card component.

For Paris release version - leverages [now-card](https://developer.servicenow.com/dev.do#!/reference/now-experience/paris/now-components/now-card/overview), [now-rich-text](https://developer.servicenow.com/dev.do#!/reference/now-experience/paris/now-components/now-rich-text/overview), and [now-modal](https://developer.servicenow.com/dev.do#!/reference/now-experience/paris/now-components/now-modal/overview) components

The KB article content is displayed in a now-modal pop-up when clicking on the action represented by the eye icon in the top right corner of the card.

To test, update the sysid attribute in the [example](example/element.js) - provide a valid sys_id of an Approval [sysapproval_approver] record in your instance.
