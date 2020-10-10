/**
 * Default columns retrieved for the Approval [sysapproval_approver]
 * record with REST API call
 */
export const columns = [
    {
        field: "document_id.number",
        label: "Number"
    },
    {
        field: "document_id.short_description",
        label: "Short Description"
    },
    {
        field: "document_id.author",
        label: "Author"
    },
    {
        field: "document_id.kb_knowledge_base",
        label: "Knowledge Base"
    },
    {
        field: "document_id.kb_category",
        label: "Category"
    },
    {
        field: "document_id.text",
        label: "Article body"
    },
    {
        field: "state",
        label: "state"
    }
];