
import {CALL_API} from '../middleware/api'
import {arrayOf} from 'normalizr'
import * as Schemas from '../schemas'
import _ from 'lodash'

/*
 * MarkReadyToPublish organisation
 */
export const MARK_READY_TO_PUBLISH_ORGANISATION_REQUEST = 'MARK_READY_TO_PUBLISH_ORGANISATION_REQUEST';
export const MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS = 'MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS';
export const MARK_READY_TO_PUBLISH_ORGANISATION_FAILURE = 'MARK_READY_TO_PUBLISH_ORGANISATION_FAILURE';
export function markReadyToPublishOrganisation(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [MARK_READY_TO_PUBLISH_ORGANISATION_REQUEST, MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS, MARK_READY_TO_PUBLISH_ORGANISATION_FAILURE],
            endpoint: 'Organisation.markReadyToPublish',
            payload: [publisherId, id],
        }
    }
}

/*
 * Get organisation (Identification form)
 */
export const GET_ORGANISATION_REQUEST = 'GET_ORGANISATION_REQUEST';
export const GET_ORGANISATION_SUCCESS = 'GET_ORGANISATION_SUCCESS';
export const GET_ORGANISATION_FAILURE = 'GET_ORGANISATION_FAILURE';

export function getOrganisation(publisherId, id) {
    return {
        [CALL_API]: {
            types: [GET_ORGANISATION_REQUEST, GET_ORGANISATION_SUCCESS, GET_ORGANISATION_FAILURE],
            endpoint: 'Organisation.get',
            payload: [publisherId, id],
            schema: Schemas.organisation,
        }
    }
}

/*
 * Create organisation (Identification form)
 */
export const CREATE_ORGANISATION_REQUEST = 'CREATE_ORGANISATION_REQUEST';
export const CREATE_ORGANISATION_SUCCESS = 'CREATE_ORGANISATION_SUCCESS';
export const CREATE_ORGANISATION_FAILURE = 'CREATE_ORGANISATION_FAILURE';
export function createOrganisation(publisherId, organisation) {
    return {
        [CALL_API]: {
            types: [CREATE_ORGANISATION_REQUEST, CREATE_ORGANISATION_SUCCESS, CREATE_ORGANISATION_FAILURE],
            endpoint: 'Organisation.create',
            payload: [publisherId, organisation],
            schema: Schemas.organisation,
        }
    }
}

/*
 * Update organisation (Identification form)
 */
export const UPDATE_ORGANISATION_REQUEST = 'UPDATE_ORGANISATION_REQUEST';
export const UPDATE_ORGANISATION_SUCCESS = 'UPDATE_ORGANISATION_SUCCESS';
export const UPDATE_ORGANISATION_FAILURE = 'UPDATE_ORGANISATION_FAILURE';
export function updateOrganisation(publisherId, organisationId, data) {

    console.log(data);

    return {
        [CALL_API]: {
            types: [UPDATE_ORGANISATION_REQUEST, UPDATE_ORGANISATION_SUCCESS, UPDATE_ORGANISATION_FAILURE],
            endpoint: 'Organisation.update',
            payload: [publisherId, organisationId, data ],
            schema: Schemas.organisation,
        }
    }
}

/*
 * Delete organisation (Identification form)
 */
export const DELETE_ORGANISATION_REQUEST = 'DELETE_ORGANISATION_REQUEST';
export const DELETE_ORGANISATION_SUCCESS = 'DELETE_ORGANISATION_SUCCESS';
export const DELETE_ORGANISATION_FAILURE = 'DELETE_ORGANISATION_FAILURE';
export function deleteOrganisation(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_ORGANISATION_REQUEST, DELETE_ORGANISATION_SUCCESS, DELETE_ORGANISATION_FAILURE],
            endpoint: 'Organisation.delete',
            payload: [publisherId, id],
        }
    }
}

/*
 * Get reporting_organisation (Identification form)
 */
export const GET_REPORTING_ORGANISATION_REQUEST = 'GET_REPORTING_ORGANISATION_REQUEST';
export const GET_REPORTING_ORGANISATION_SUCCESS = 'GET_REPORTING_ORGANISATION_SUCCESS';
export const GET_REPORTING_ORGANISATION_FAILURE = 'GET_REPORTING_ORGANISATION_FAILURE';

export function getReportingOrganisation(publisherId, id) {
    return {
        [CALL_API]: {
            types: [GET_REPORTING_ORGANISATION_REQUEST, GET_REPORTING_ORGANISATION_SUCCESS, GET_REPORTING_ORGANISATION_FAILURE],
            endpoint: 'Organisation.getReportingOrganisation',
            payload: [publisherId, id],
        }
    }
}

/*
 * Create reporting_organisation (Identification form)
 */
export const CREATE_REPORTING_ORGANISATION_REQUEST = 'CREATE_REPORTING_ORGANISATION_REQUEST';
export const CREATE_REPORTING_ORGANISATION_SUCCESS = 'CREATE_REPORTING_ORGANISATION_SUCCESS';
export const CREATE_REPORTING_ORGANISATION_FAILURE = 'CREATE_REPORTING_ORGANISATION_FAILURE';
export function createReportingOrganisation(publisherId, organisationId, reporting_organisation) {
    return {
        [CALL_API]: {
            types: [CREATE_REPORTING_ORGANISATION_REQUEST, CREATE_REPORTING_ORGANISATION_SUCCESS, CREATE_REPORTING_ORGANISATION_FAILURE],
            endpoint: 'Organisation.createReportingOrganisation',
            payload: [publisherId, organisationId, reporting_organisation],
        }
    }
}

/*
 * Update reporting_organisation (Identification form)
 */
export const UPDATE_REPORTING_ORGANISATION_REQUEST = 'UPDATE_REPORTING_ORGANISATION_REQUEST';
export const UPDATE_REPORTING_ORGANISATION_SUCCESS = 'UPDATE_REPORTING_ORGANISATION_SUCCESS';
export const UPDATE_REPORTING_ORGANISATION_FAILURE = 'UPDATE_REPORTING_ORGANISATION_FAILURE';
export function updateReportingOrganisation(publisherId, organisationId, id, data) {
    return {
        [CALL_API]: {
            types: [UPDATE_REPORTING_ORGANISATION_REQUEST, UPDATE_REPORTING_ORGANISATION_SUCCESS, UPDATE_REPORTING_ORGANISATION_FAILURE],
            endpoint: 'Organisation.updateReportingOrganisation',
            payload: [publisherId, organisationId, id, data ],
        }
    }
}

/*
 * Delete reporting_organisation (Identification form)
 */
export const DELETE_REPORTING_ORGANISATION_REQUEST = 'DELETE_REPORTING_ORGANISATION_REQUEST';
export const DELETE_REPORTING_ORGANISATION_SUCCESS = 'DELETE_REPORTING_ORGANISATION_SUCCESS';
export const DELETE_REPORTING_ORGANISATION_FAILURE = 'DELETE_REPORTING_ORGANISATION_FAILURE';
export function deleteReportingOrganisation(publisherId, organisationId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_REPORTING_ORGANISATION_REQUEST, DELETE_REPORTING_ORGANISATION_SUCCESS, DELETE_REPORTING_ORGANISATION_FAILURE],
            endpoint: 'Organisation.deleteReportingOrganisation',
            payload: [publisherId, organisationId, id],
        }
    }
}



/*
 * Get total_budget (Identification form)
 */
export const GET_TOTAL_BUDGETS_REQUEST = 'GET_TOTAL_BUDGETS_REQUEST';
export const GET_TOTAL_BUDGETS_SUCCESS = 'GET_TOTAL_BUDGETS_SUCCESS';
export const GET_TOTAL_BUDGETS_FAILURE = 'GET_TOTAL_BUDGETS_FAILURE';

export function getTotalBudgets(publisherId, organisationId) {
    return {
        [CALL_API]: {
            types: [GET_TOTAL_BUDGETS_REQUEST, GET_TOTAL_BUDGETS_SUCCESS, GET_TOTAL_BUDGETS_FAILURE],
            endpoint: 'Organisation.getTotalBudgets',
            payload: [publisherId, organisationId],
            schema: arrayOf(Schemas.organisationTotalBudget),
        }
    }
}

/*
 * Create total_budget (Identification form)
 */
export const CREATE_TOTAL_BUDGET_REQUEST = 'CREATE_TOTAL_BUDGET_REQUEST';
export const CREATE_TOTAL_BUDGET_SUCCESS = 'CREATE_TOTAL_BUDGET_SUCCESS';
export const CREATE_TOTAL_BUDGET_FAILURE = 'CREATE_TOTAL_BUDGET_FAILURE';
export function createTotalBudget(publisherId, organisationId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_TOTAL_BUDGET_REQUEST, CREATE_TOTAL_BUDGET_SUCCESS, CREATE_TOTAL_BUDGET_FAILURE],
            endpoint: 'Organisation.createTotalBudget',
            payload: [publisherId, organisationId, data],
            schema: Schemas.organisationTotalBudget,
        }
    }
}

/*
 * Update total_budget (Identification form)
 */
export const UPDATE_TOTAL_BUDGET_REQUEST = 'UPDATE_TOTAL_BUDGET_REQUEST';
export const UPDATE_TOTAL_BUDGET_SUCCESS = 'UPDATE_TOTAL_BUDGET_SUCCESS';
export const UPDATE_TOTAL_BUDGET_FAILURE = 'UPDATE_TOTAL_BUDGET_FAILURE';
export function updateTotalBudget(publisherId, organisationId, id, data) {
    return {
        [CALL_API]: {
            types: [UPDATE_TOTAL_BUDGET_REQUEST, UPDATE_TOTAL_BUDGET_SUCCESS, UPDATE_TOTAL_BUDGET_FAILURE],
            endpoint: 'Organisation.updateTotalBudget',
            payload: [publisherId, organisationId, id, data ],
            schema: Schemas.organisationTotalBudget,
        }
    }
}

/*
 * Delete total_budget (Identification form)
 */
export const DELETE_TOTAL_BUDGET_REQUEST = 'DELETE_TOTAL_BUDGET_REQUEST';
export const DELETE_TOTAL_BUDGET_SUCCESS = 'DELETE_TOTAL_BUDGET_SUCCESS';
export const DELETE_TOTAL_BUDGET_FAILURE = 'DELETE_TOTAL_BUDGET_FAILURE';
export function deleteTotalBudget(publisherId, organisationId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_TOTAL_BUDGET_REQUEST, DELETE_TOTAL_BUDGET_SUCCESS, DELETE_TOTAL_BUDGET_FAILURE],
            endpoint: 'Organisation.deleteTotalBudget',
            payload: [publisherId, organisationId, id],
        }
    }
}

/*
 * Create total_budget_budget_line (Identification form)
 */
export const CREATE_TOTAL_BUDGET_BUDGET_LINE_REQUEST = 'CREATE_TOTAL_BUDGET_BUDGET_LINE_REQUEST';
export const CREATE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS = 'CREATE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS';
export const CREATE_TOTAL_BUDGET_BUDGET_LINE_FAILURE = 'CREATE_TOTAL_BUDGET_BUDGET_LINE_FAILURE';
export function createTotalBudgetBudgetLine(publisherId, organisationId, budgetId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_TOTAL_BUDGET_BUDGET_LINE_REQUEST, CREATE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS, CREATE_TOTAL_BUDGET_BUDGET_LINE_FAILURE],
            endpoint: 'Organisation.createTotalBudgetBudgetLine',
            payload: [publisherId, organisationId, budgetId, data],
            schema: Schemas.organisationTotalBudgetBudgetLine,
        }
    }
}

/*
 * Update total_budget_budget_line (Identification form)
 */
export const UPDATE_TOTAL_BUDGET_BUDGET_LINE_REQUEST = 'UPDATE_TOTAL_BUDGET_BUDGET_LINE_REQUEST';
export const UPDATE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS = 'UPDATE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS';
export const UPDATE_TOTAL_BUDGET_BUDGET_LINE_FAILURE = 'UPDATE_TOTAL_BUDGET_BUDGET_LINE_FAILURE';
export function updateTotalBudgetBudgetLine(publisherId, organisationId, budgetId, id, data) {
    return {
        [CALL_API]: {
            types: [UPDATE_TOTAL_BUDGET_BUDGET_LINE_REQUEST, UPDATE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS, UPDATE_TOTAL_BUDGET_BUDGET_LINE_FAILURE],
            endpoint: 'Organisation.updateTotalBudgetBudgetLine',
            payload: [publisherId, organisationId, budgetId, id, data ],
            schema: Schemas.organisationTotalBudgetBudgetLine,
        }
    }
}

/*
 * Delete total_budget_budget_line (Identification form)
 */
export const DELETE_TOTAL_BUDGET_BUDGET_LINE_REQUEST = 'DELETE_TOTAL_BUDGET_BUDGET_LINE_REQUEST';
export const DELETE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS = 'DELETE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS';
export const DELETE_TOTAL_BUDGET_BUDGET_LINE_FAILURE = 'DELETE_TOTAL_BUDGET_BUDGET_LINE_FAILURE';
export function deleteTotalBudgetBudgetLine(publisherId, organisationId, budgetId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_TOTAL_BUDGET_BUDGET_LINE_REQUEST, DELETE_TOTAL_BUDGET_BUDGET_LINE_SUCCESS, DELETE_TOTAL_BUDGET_BUDGET_LINE_FAILURE],
            endpoint: 'Organisation.deleteTotalBudgetBudgetLine',
            payload: [publisherId, organisationId, budgetId, id],
        }
    }
}
