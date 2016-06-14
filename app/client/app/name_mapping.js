export const oipaKeyToName = {
    'recipient_country': 'Recipient country',
    'recipient_region': 'Recipient region',
    'sector': 'Sector',
    'reporting_organisation': 'Reporting organisation',
    'document_link_category': 'Document link category',
    'activity_status': 'Activity status',
    'policy_marker': 'Policy marker',
    'collaboration_type': 'Collaboration type',
    'default_flow_type': 'Default flow type',
    'default_aid_type': 'Default aid type',
    'default_finance_type': 'Default finance type',
    'default_tied_status': 'Default tied status',
    'budget': 'Budget',
    'transaction_date_lte': 'Maximum transaction date',
    'transaction_date_gte': 'Minimum transaction date',
}

export const oipaKeyToDesc = {
    'recipient_country': 'The beneficiary country.',
    'recipient_region': 'The beneficiary supranational geopolitical region. ',
    'sector': 'The beneficiary sector.',
    'reporting_organisation': 'The organisation issuing a report (not necessarily involved in the organisation or activity being described).',
    'document_link_category': 'A categorised link to an external document.',
    'activity_status': 'The current status of the activity.',
    'policy_marker': 'A policy or theme addressed by the activity.',
    'collaboration_type': 'The type of collaboration involved in the activity’s disbursements, e.g. “bilateral” or “multilateral”.',
    'default_flow_type': 'Whether the activity is funded by Official Development Assistance (ODA), Other Official Flows (OOF), etc.',
    'default_aid_type': 'The type of aid being supplied (project-type intervention, budget support, debt relief, etc.).',
    'default_finance_type': 'The type of finance (e.g. grant, loan, debt relief, etc).',
    'default_tied_status': 'Whether the aid is untied, tied, or partially tied.',
    'budget': 'The value of the aid activity’s budget over the lifetime of the activity. ',
    'transaction_date': 'The date on which the transaction was made or (in the case of commitments) agreed.',
}

export const transactionTypeKeyToName = {
    'incoming_fund': 'Incoming funds',
    'commitment': 'Commitment',
    'disbursement': 'Disbursement',
    'expenditure': 'Expenditure',
}
