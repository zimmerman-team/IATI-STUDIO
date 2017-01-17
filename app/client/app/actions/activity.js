
/*
 * Async actions
 */

import { CALL_API } from '../middleware/api'
import { arrayOf } from 'normalizr'
import * as Schemas from '../schemas'
import _ from 'lodash'


/*
 * Get activities (Identification form)
 */
export const GET_ACTIVITIES_REQUEST = 'GET_ACTIVITIES_REQUEST';
export const GET_ACTIVITIES_SUCCESS = 'GET_ACTIVITIES_SUCCESS';
export const GET_ACTIVITIES_FAILURE = 'GET_ACTIVITIES_FAILURE';

export function getActivities(publisherId) {
    return {
        [CALL_API]: {
            types: [ GET_ACTIVITIES_REQUEST, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_FAILURE ],
            endpoint: 'Activity.getAll',
            schema: arrayOf(Schemas.activity),
            payload: [ publisherId ]
        }
    }
}

/*
 * Get activity (Identification form)
 */
export const GET_ACTIVITY_REQUEST = 'GET_ACTIVITY_REQUEST';
export const GET_ACTIVITY_SUCCESS = 'GET_ACTIVITY_SUCCESS';
export const GET_ACTIVITY_FAILURE = 'GET_ACTIVITY_FAILURE';

export function getActivity(publisherId, id) {
    return {
        [CALL_API]: {
            types: [ GET_ACTIVITY_REQUEST, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE ],
            endpoint: 'Activity.get',
            payload: [ publisherId, id ],
            schema: Schemas.activity,
        }
    }
}

/*
 * Create activity (Identification form)
 */
export const CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_FAILURE = 'CREATE_ACTIVITY_FAILURE';
export function createActivity(publisherId, activity) {
    return {
        [CALL_API]: {
            types: [ CREATE_ACTIVITY_REQUEST, CREATE_ACTIVITY_SUCCESS, CREATE_ACTIVITY_FAILURE ],
            endpoint: 'Activity.create',
            payload: [ publisherId, activity],
            schema: Schemas.activity,
        }
    }
}

/*
 * Update activity (Identification form)
 */
export const UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export function updateActivity(publisherId, activity) {
    let filterActivity = _.omitBy(activity, _.isNil);
    return {
        [CALL_API]: {
            types: [ UPDATE_ACTIVITY_REQUEST, UPDATE_ACTIVITY_SUCCESS, UPDATE_ACTIVITY_FAILURE ],
            endpoint: 'Activity.update',
            payload: [ publisherId, JSON.stringify(filterActivity)],
            schema: Schemas.activity,
        }
    }
}

/*
 * Delete activity (Identification form)
 */
export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export function deleteActivity(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_ACTIVITY_REQUEST, DELETE_ACTIVITY_SUCCESS, DELETE_ACTIVITY_FAILURE ],
            endpoint: 'Activity.delete',
            payload: [ publisherId, id],
        }
    }
}

/*
 * Get descriptions (Identification form)
 */
export const GET_DESCRIPTIONS_REQUEST = 'GET_DESCRIPTIONS_REQUEST';
export const GET_DESCRIPTIONS_SUCCESS = 'GET_DESCRIPTIONS_SUCCESS';
export const GET_DESCRIPTIONS_FAILURE = 'GET_DESCRIPTIONS_FAILURE';

export function getDescriptions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_DESCRIPTIONS_REQUEST, GET_DESCRIPTIONS_SUCCESS, GET_DESCRIPTIONS_FAILURE ],
            endpoint: 'Activity.getDescriptions',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.description),
        }
    }
}

/*
 * Create description (Identification form)
 */
export const CREATE_DESCRIPTION_REQUEST = 'CREATE_DESCRIPTION_REQUEST';
export const CREATE_DESCRIPTION_SUCCESS = 'CREATE_DESCRIPTION_SUCCESS';
export const CREATE_DESCRIPTION_FAILURE = 'CREATE_DESCRIPTION_FAILURE';
export function createDescription(publisherId, activityId, description) {
    return {
        [CALL_API]: {
            types: [ CREATE_DESCRIPTION_REQUEST, CREATE_DESCRIPTION_SUCCESS, CREATE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.createDescription',
            payload: [ publisherId, activityId, JSON.stringify(description) ],
            schema: Schemas.description,
        }
    }
}

/*
 * Update description (Identification form)
 */
export const UPDATE_DESCRIPTION_REQUEST = 'UPDATE_DESCRIPTION_REQUEST';
export const UPDATE_DESCRIPTION_SUCCESS = 'UPDATE_DESCRIPTION_SUCCESS';
export const UPDATE_DESCRIPTION_FAILURE = 'UPDATE_DESCRIPTION_FAILURE';
export function updateDescription(publisherId, activityId, id, description) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_DESCRIPTION_REQUEST, UPDATE_DESCRIPTION_SUCCESS, UPDATE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.updateDescription',
            payload: [ publisherId, activityId, id, JSON.stringify(description) ],
            schema: Schemas.description,
        }
    }
}


/*
 * Delete description (Identification form)
 */
export const DELETE_DESCRIPTION_REQUEST = 'DELETE_DESCRIPTION_REQUEST';
export const DELETE_DESCRIPTION_SUCCESS = 'DELETE_DESCRIPTION_SUCCESS';
export const DELETE_DESCRIPTION_FAILURE = 'DELETE_DESCRIPTION_FAILURE';
export function deleteDescription(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_DESCRIPTION_REQUEST, DELETE_DESCRIPTION_SUCCESS, DELETE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.deleteDescription',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Create date (BasicInformation form)
 */
export const CREATE_DATE_REQUEST = 'CREATE_DATE_REQUEST';
export const CREATE_DATE_SUCCESS = 'CREATE_DATE_SUCCESS';
export const CREATE_DATE_FAILURE = 'CREATE_DATE_FAILURE';
export function createDate(publisherId, activityId, date) {
    return {
        [CALL_API]: {
            types: [ CREATE_DATE_REQUEST, CREATE_DATE_SUCCESS, CREATE_DATE_FAILURE ],
            endpoint: 'Activity.createDate',
            payload: [ publisherId, activityId, JSON.stringify(date) ],
            schema: Schemas.date,
        }
    }
}

/*
 * Update Date (BasicInformation form)
 */
export const UPDATE_DATE_REQUEST = 'UPDATE_DATE_REQUEST';
export const UPDATE_DATE_SUCCESS = 'UPDATE_DATE_SUCCESS';
export const UPDATE_DATE_FAILURE = 'UPDATE_DATE_FAILURE';
export function updateDate(publisherId, activityId, id, date) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_DATE_REQUEST, UPDATE_DATE_SUCCESS, UPDATE_DATE_FAILURE ],
            endpoint: 'Activity.updateDate',
            payload: [ publisherId, activityId, id, JSON.stringify(date) ],
            schema: Schemas.date,
        }
    }
}


/*
 * Delete date (BasicInformation form)
 */
export const DELETE_DATE_REQUEST = 'DELETE_DATE_REQUEST';
export const DELETE_DATE_SUCCESS = 'DELETE_DATE_SUCCESS';
export const DELETE_DATE_FAILURE = 'DELETE_DATE_FAILURE';
export function deleteDate(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_DATE_REQUEST, DELETE_DATE_SUCCESS, DELETE_DATE_FAILURE ],
            endpoint: 'Activity.deleteDate',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Get Status (BasicInformation form)
 */
export const GET_STATUS_REQUEST = 'GET_STATUS_REQUEST';
export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const GET_STATUS_FAILURE = 'GET_STATUS_FAILURE';

export function getStatus(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_STATUS_REQUEST, GET_STATUS_SUCCESS, GET_STATUS_FAILURE ],
            endpoint: 'Activity.getStatus',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.status),
        }
    }
}

/*
 * Create status (BasicInformation form)
 */
export const CREATE_STATUS_REQUEST = 'CREATE_STATUS_REQUEST';
export const CREATE_STATUS_SUCCESS = 'CREATE_STATUS_SUCCESS';
export const CREATE_STATUS_FAILURE = 'CREATE_STATUS_FAILURE';
export function createStatus(publisherId, activityId, status) {
    return {
        [CALL_API]: {
            types: [ CREATE_STATUS_REQUEST, CREATE_STATUS_SUCCESS, CREATE_STATUS_FAILURE ],
            endpoint: 'Activity.createStatus',
            payload: [ publisherId, activityId, status ],
            schema: Schemas.status,
        }
    }
}

/*
 * Update Status (BasicInformation form)
 */
export const UPDATE_STATUS_REQUEST = 'UPDATE_STATUS_REQUEST';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';
export function updateStatus(publisherId, activityId, id, status) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_FAILURE ],
            endpoint: 'Activity.updateStatus',
            payload: [ publisherId, activityId, id, status ],
            schema: Schemas.status,
        }
    }
}


/*
 * Delete Status (BasicInformation form)
 */
export const DELETE_STATUS_REQUEST = 'DELETE_STATUS_REQUEST';
export const DELETE_STATUS_SUCCESS = 'DELETE_STATUS_SUCCESS';
export const DELETE_STATUS_FAILURE = 'DELETE_STATUS_FAILURE';
export function deleteStatus(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_STATUS_REQUEST, DELETE_STATUS_SUCCESS, DELETE_STATUS_FAILURE ],
            endpoint: 'Activity.deleteStatus',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Create contact (BasicInformation form)
 */
export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';
export function createContact(publisherId, activityId, contact) {
    return {
        [CALL_API]: {
            types: [ CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_FAILURE ],
            endpoint: 'Activity.createContact',
            payload: [ publisherId, activityId, JSON.stringify(contact) ],
            schema: Schemas.contact,
        }
    }
}

/*
 * Update Contact (BasicInformation form)
 */
export const UPDATE_CONTACT_REQUEST = 'UPDATE_CONTACT_REQUEST';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAILURE = 'UPDATE_CONTACT_FAILURE';
export function updateContact(publisherId, activityId, id, contact) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE ],
            endpoint: 'Activity.updateContact',
            payload: [ publisherId, activityId, id, JSON.stringify(contact) ],
            schema: Schemas.contact,
        }
    }
}


/*
 * Delete Contact (BasicInformation form)
 */
export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';
export function deleteContact(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE ],
            endpoint: 'Activity.deleteContact',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get Transaction (Financial form)
 */
export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST';
export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS';
export const GET_TRANSACTION_FAILURE = 'GET_TRANSACTION_FAILURE';

export function getTransactions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_FAILURE ],
            endpoint: 'Activity.getTransaction',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.transaction),
        }
    }
}

/*
 * Create transaction (Financial form)
 */
export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';
export function createTransaction(publisherId, activityId, transaction) {
    return {
        [CALL_API]: {
            types: [ CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAILURE ],
            endpoint: 'Activity.createTransaction',
            payload: [ publisherId, activityId, transaction ],
            schema: Schemas.transaction,
        }
    }
}

/*
 * Update Transaction (Financial form)
 */
export const UPDATE_TRANSACTION_REQUEST = 'UPDATE_TRANSACTION_REQUEST';
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE';
export function updateTransaction(publisherId, activityId, id, transaction) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_TRANSACTION_REQUEST, UPDATE_TRANSACTION_SUCCESS, UPDATE_TRANSACTION_FAILURE ],
            endpoint: 'Activity.updateTransaction',
            payload: [ publisherId, activityId, id, transaction ],
            schema: Schemas.transaction,
        }
    }
}


/*
 * Delete Transaction (Financial form)
 */
export const DELETE_TRANSACTION_REQUEST = 'DELETE_TRANSACTION_REQUEST';
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';
export function deleteTransaction(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_TRANSACTION_REQUEST, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAILURE ],
            endpoint: 'Activity.deleteLocation',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Get PlannedDisbursement (Financial form)
 */
export const GET_PLANNED_DISBURSEMENT_REQUEST = 'GET_PLANNED_DISBURSEMENT_REQUEST';
export const GET_PLANNED_DISBURSEMENT_SUCCESS = 'GET_PLANNED_DISBURSEMENT_SUCCESS';
export const GET_PLANNED_DISBURSEMENT_FAILURE = 'GET_PLANNED_DISBURSEMENT_FAILURE';

export function getPlannedDisbursements(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_PLANNED_DISBURSEMENT_REQUEST, GET_PLANNED_DISBURSEMENT_SUCCESS, GET_PLANNED_DISBURSEMENT_FAILURE ],
            endpoint: 'Activity.getPlannedDisbursement',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.plannedDisbursement),
        }
    }
}

/*
 * Create plannedDisbursement (Financial form)
 */
export const CREATE_PLANNED_DISBURSEMENT_REQUEST = 'CREATE_PLANNED_DISBURSEMENT_REQUEST';
export const CREATE_PLANNED_DISBURSEMENT_SUCCESS = 'CREATE_PLANNED_DISBURSEMENT_SUCCESS';
export const CREATE_PLANNED_DISBURSEMENT_FAILURE = 'CREATE_PLANNED_DISBURSEMENT_FAILURE';
export function createPlannedDisbursement(publisherId, activityId, plannedDisbursement) {
    return {
        [CALL_API]: {
            types: [ CREATE_PLANNED_DISBURSEMENT_REQUEST, CREATE_PLANNED_DISBURSEMENT_SUCCESS, CREATE_PLANNED_DISBURSEMENT_FAILURE ],
            endpoint: 'Activity.createPlannedDisbursement',
            payload: [ publisherId, activityId, plannedDisbursement ],
            schema: Schemas.plannedDisbursement,
        }
    }
}

/*
 * Update PlannedDisbursement (Financial form)
 */
export const UPDATE_PLANNED_DISBURSEMENT_REQUEST = 'UPDATE_PLANNED_DISBURSEMENT_REQUEST';
export const UPDATE_PLANNED_DISBURSEMENT_SUCCESS = 'UPDATE_PLANNED_DISBURSEMENT_SUCCESS';
export const UPDATE_PLANNED_DISBURSEMENT_FAILURE = 'UPDATE_PLANNED_DISBURSEMENT_FAILURE';
export function updatePlannedDisbursement(publisherId, activityId, id, plannedDisbursement) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_PLANNED_DISBURSEMENT_REQUEST, UPDATE_PLANNED_DISBURSEMENT_SUCCESS, UPDATE_PLANNED_DISBURSEMENT_FAILURE ],
            endpoint: 'Activity.updatePlannedDisbursement',
            payload: [ publisherId, activityId, id, plannedDisbursement ],
            schema: Schemas.plannedDisbursement,
        }
    }
}


/*
 * Delete PlannedDisbursement (Financial form)
 */
export const DELETE_PLANNED_DISBURSEMENT_REQUEST = 'DELETE_PLANNED_DISBURSEMENT_REQUEST';
export const DELETE_PLANNED_DISBURSEMENT_SUCCESS = 'DELETE_PLANNED_DISBURSEMENT_SUCCESS';
export const DELETE_PLANNED_DISBURSEMENT_FAILURE = 'DELETE_PLANNED_DISBURSEMENT_FAILURE';
export function deletePlannedDisbursement(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_PLANNED_DISBURSEMENT_REQUEST, DELETE_PLANNED_DISBURSEMENT_SUCCESS, DELETE_PLANNED_DISBURSEMENT_FAILURE ],
            endpoint: 'Activity.deletePlannedDisbursement',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Get Budget (Financial form)
 */
export const GET_BUDGET_REQUEST = 'GET_BUDGET_REQUEST';
export const GET_BUDGET_SUCCESS = 'GET_BUDGET_SUCCESS';
export const GET_BUDGET_FAILURE = 'GET_BUDGET_FAILURE';

export function getBudgets(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_BUDGET_REQUEST, GET_BUDGET_SUCCESS, GET_BUDGET_FAILURE ],
            endpoint: 'Activity.getBudget',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.budget),
        }
    }
}

/*
 * Create budget (Financial form)
 */
export const CREATE_BUDGET_REQUEST = 'CREATE_BUDGET_REQUEST';
export const CREATE_BUDGET_SUCCESS = 'CREATE_BUDGET_SUCCESS';
export const CREATE_BUDGET_FAILURE = 'CREATE_BUDGET_FAILURE';
export function createBudget(publisherId, activityId, budget) {
    return {
        [CALL_API]: {
            types: [ CREATE_BUDGET_REQUEST, CREATE_BUDGET_SUCCESS, CREATE_BUDGET_FAILURE ],
            endpoint: 'Activity.createBudget',
            payload: [ publisherId, activityId, budget ],
            schema: Schemas.budget,
        }
    }
}

/*
 * Update Budget (Financial form)
 */
export const UPDATE_BUDGET_REQUEST = 'UPDATE_BUDGET_REQUEST';
export const UPDATE_BUDGET_SUCCESS = 'UPDATE_BUDGET_SUCCESS';
export const UPDATE_BUDGET_FAILURE = 'UPDATE_BUDGET_FAILURE';
export function updateBudget(publisherId, activityId, id, budget) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_BUDGET_REQUEST, UPDATE_BUDGET_SUCCESS, UPDATE_BUDGET_FAILURE ],
            endpoint: 'Activity.updateBudget',
            payload: [ publisherId, activityId, id, budget ],
            schema: Schemas.budget,
        }
    }
}


/*
 * Delete Budget (Financial form)
 */
export const DELETE_BUDGET_REQUEST = 'DELETE_BUDGET_REQUEST';
export const DELETE_BUDGET_SUCCESS = 'DELETE_BUDGET_SUCCESS';
export const DELETE_BUDGET_FAILURE = 'DELETE_BUDGET_FAILURE';
export function deleteBudget(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_BUDGET_REQUEST, DELETE_BUDGET_SUCCESS, DELETE_BUDGET_FAILURE ],
            endpoint: 'Activity.deleteBudget',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Get Policy (Financial form)
 */
export const GET_POLICY_REQUEST = 'GET_POLICY_REQUEST';
export const GET_POLICY_SUCCESS = 'GET_POLICY_SUCCESS';
export const GET_POLICY_FAILURE = 'GET_POLICY_FAILURE';

export function getPolicy(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_POLICY_REQUEST, GET_POLICY_SUCCESS, GET_POLICY_FAILURE ],
            endpoint: 'Activity.getPolicy',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.policy),
        }
    }
}

/*
 * Create policy (Financial form)
 */
export const CREATE_POLICY_REQUEST = 'CREATE_POLICY_REQUEST';
export const CREATE_POLICY_SUCCESS = 'CREATE_POLICY_SUCCESS';
export const CREATE_POLICY_FAILURE = 'CREATE_POLICY_FAILURE';
export function createPolicy(publisherId, activityId, policy) {
    return {
        [CALL_API]: {
            types: [ CREATE_POLICY_REQUEST, CREATE_POLICY_SUCCESS, CREATE_POLICY_FAILURE ],
            endpoint: 'Activity.createPolicy',
            payload: [ publisherId, activityId, policy ],
            schema: Schemas.policy,
        }
    }
}

/*
 * Update Policy (Financial form)
 */
export const UPDATE_POLICY_REQUEST = 'UPDATE_POLICY_REQUEST';
export const UPDATE_POLICY_SUCCESS = 'UPDATE_POLICY_SUCCESS';
export const UPDATE_POLICY_FAILURE = 'UPDATE_POLICY_FAILURE';
export function updatePolicy(publisherId, activityId, id, policy) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_POLICY_REQUEST, UPDATE_POLICY_SUCCESS, UPDATE_POLICY_FAILURE ],
            endpoint: 'Activity.updatePolicy',
            payload: [ publisherId, activityId, id, policy ],
            schema: Schemas.policy,
        }
    }
}


/*
 * Delete Policy (Financial form)
 */
export const DELETE_POLICY_REQUEST = 'DELETE_POLICY_REQUEST';
export const DELETE_POLICY_SUCCESS = 'DELETE_POLICY_SUCCESS';
export const DELETE_POLICY_FAILURE = 'DELETE_POLICY_FAILURE';
export function deletePolicy(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_POLICY_REQUEST, DELETE_POLICY_SUCCESS, DELETE_POLICY_FAILURE ],
            endpoint: 'Activity.deletePolicy',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Get recipientCountries (Geopolitical form)
 */
export const GET_RECIPIENT_COUNTRIES_REQUEST = 'GET_RECIPIENT_COUNTRIES_REQUEST';
export const GET_RECIPIENT_COUNTRIES_SUCCESS = 'GET_RECIPIENT_COUNTRIES_SUCCESS';
export const GET_RECIPIENT_COUNTRIES_FAILURE = 'GET_RECIPIENT_COUNTRIES_FAILURE';

export function getRecipientCountries(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_RECIPIENT_COUNTRIES_REQUEST, GET_RECIPIENT_COUNTRIES_SUCCESS, GET_RECIPIENT_COUNTRIES_FAILURE ],
            endpoint: 'Activity.getRecipientCountries',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.recipientCountry),
        }
    }
}

/*
 * Create recipientCountry (Geopolitical form)
 */
export const CREATE_RECIPIENT_COUNTRY_REQUEST = 'CREATE_RECIPIENT_COUNTRY_REQUEST';
export const CREATE_RECIPIENT_COUNTRY_SUCCESS = 'CREATE_RECIPIENT_COUNTRY_SUCCESS';
export const CREATE_RECIPIENT_COUNTRY_FAILURE = 'CREATE_RECIPIENT_COUNTRY_FAILURE';
export function createRecipientCountry(publisherId, activityId, recipientCountry) {
    return {
        [CALL_API]: {
            types: [ CREATE_RECIPIENT_COUNTRY_REQUEST, CREATE_RECIPIENT_COUNTRY_SUCCESS, CREATE_RECIPIENT_COUNTRY_FAILURE ],
            endpoint: 'Activity.createRecipientCountry',
            payload: [ publisherId, activityId, JSON.stringify(recipientCountry) ],
            schema: Schemas.recipientCountry,
        }
    }
}

/*
 * Update recipientCountry (Geopolitical form)
 */
export const UPDATE_RECIPIENT_COUNTRY_REQUEST = 'UPDATE_RECIPIENT_COUNTRY_REQUEST';
export const UPDATE_RECIPIENT_COUNTRY_SUCCESS = 'UPDATE_RECIPIENT_COUNTRY_SUCCESS';
export const UPDATE_RECIPIENT_COUNTRY_FAILURE = 'UPDATE_RECIPIENT_COUNTRY_FAILURE';
export function updateRecipientCountry(publisherId, activityId, id, recipientCountry) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_RECIPIENT_COUNTRY_REQUEST, UPDATE_RECIPIENT_COUNTRY_SUCCESS, UPDATE_RECIPIENT_COUNTRY_FAILURE ],
            endpoint: 'Activity.updateRecipientCountry',
            payload: [ publisherId, activityId, id, JSON.stringify(recipientCountry) ],
            schema: Schemas.recipientCountry,
        }
    }
}


/*
 * Delete recipientCountry (Geopolitical form)
 */
export const DELETE_RECIPIENT_COUNTRY_REQUEST = 'DELETE_RECIPIENT_COUNTRY_REQUEST';
export const DELETE_RECIPIENT_COUNTRY_SUCCESS = 'DELETE_RECIPIENT_COUNTRY_SUCCESS';
export const DELETE_RECIPIENT_COUNTRY_FAILURE = 'DELETE_RECIPIENT_COUNTRY_FAILURE';
export function deleteRecipientCountry(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_RECIPIENT_COUNTRY_REQUEST, DELETE_RECIPIENT_COUNTRY_SUCCESS, DELETE_RECIPIENT_COUNTRY_FAILURE ],
            endpoint: 'Activity.deleteRecipientCountry',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get Region (Geopolitical form)
 */
export const GET_REGION_REQUEST = 'GET_REGION_REQUEST';
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_REGION_FAILURE = 'GET_REGION_FAILURE';

export function getRegions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_REGION_REQUEST, GET_REGION_SUCCESS, GET_REGION_FAILURE ],
            endpoint: 'Activity.getRegion',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.region),
        }
    }
}

/*
 * Create Region (Geopolitical form)
 */
export const CREATE_REGION_REQUEST = 'CREATE_REGION_REQUEST';
export const CREATE_REGION_SUCCESS = 'CREATE_REGION_SUCCESS';
export const CREATE_REGION_FAILURE = 'CREATE_REGION_FAILURE';
export function createRegion(publisherId, activityId, region) {
    return {
        [CALL_API]: {
            types: [ CREATE_REGION_REQUEST, CREATE_REGION_SUCCESS, CREATE_REGION_FAILURE ],
            endpoint: 'Activity.createRegion',
            payload: [ publisherId, activityId, region ],
            schema: Schemas.region,
        }
    }
}

/*
 * Update Region (Geopolitical form)
 */
export const UPDATE_REGION_REQUEST = 'UPDATE_REGION_REQUEST';
export const UPDATE_REGION_SUCCESS = 'UPDATE_REGION_SUCCESS';
export const UPDATE_REGION_FAILURE = 'UPDATE_REGION_FAILURE';
export function updateRegion(publisherId, activityId, id, region) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_REGION_REQUEST, UPDATE_REGION_SUCCESS, UPDATE_REGION_FAILURE ],
            endpoint: 'Activity.updateRegion',
            payload: [ publisherId, activityId, id, region ],
            schema: Schemas.region,
        }
    }
}


/*
 * Delete Region (Geopolitical form)
 */
export const DELETE_REGION_REQUEST = 'DELETE_REGION_REQUEST';
export const DELETE_REGION_SUCCESS = 'DELETE_REGION_SUCCESS';
export const DELETE_REGION_FAILURE = 'DELETE_REGION_FAILURE';
export function deleteRegion(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_REGION_REQUEST, DELETE_REGION_SUCCESS, DELETE_REGION_FAILURE ],
            endpoint: 'Activity.deleteRegion',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get Location (Geopolitical form)
 */
export const GET_LOCATION_REQUEST = 'GET_LOCATION_REQUEST';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'GET_LOCATION_FAILURE';

export function getLocations(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_FAILURE ],
            endpoint: 'Activity.getLocation',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.location),
        }
    }
}

/*
 * Create Location (Geopolitical form)
 */
export const CREATE_LOCATION_REQUEST = 'CREATE_LOCATION_REQUEST';
export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_FAILURE = 'CREATE_LOCATION_FAILURE';
export function createLocation(publisherId, activityId, location) {
    return {
        [CALL_API]: {
            types: [ CREATE_LOCATION_REQUEST, CREATE_LOCATION_SUCCESS, CREATE_LOCATION_FAILURE ],
            endpoint: 'Activity.createLocation',
            payload: [ publisherId, activityId, location ],
            schema: Schemas.location,
        }
    }
}

/*
 * Update Location (Geopolitical form)
 */
export const UPDATE_LOCATION_REQUEST = 'UPDATE_LOCATION_REQUEST';
export const UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_FAILURE = 'UPDATE_LOCATION_FAILURE';
export function updateLocation(publisherId, activityId, id, location) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_LOCATION_REQUEST, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAILURE ],
            endpoint: 'Activity.updateLocation',
            payload: [ publisherId, activityId, id, location ],
            schema: Schemas.location,
        }
    }
}


/*
 * Delete Location (Geopolitical form)
 */
export const DELETE_LOCATION_REQUEST = 'DELETE_LOCATION_REQUEST';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_FAILURE = 'DELETE_LOCATION_FAILURE';
export function deleteLocation(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_LOCATION_REQUEST, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_FAILURE ],
            endpoint: 'Activity.deleteLocation',
            payload: [ publisherId, activityId, id ]
        }
    }
}


export const GET_CODE_LIST_ITEMS_REQUEST = 'GET_CODE_LIST_ITEMS_REQUEST';
export const GET_CODE_LIST_ITEMS_SUCCESS = 'GET_CODE_LIST_ITEMS_SUCCESS';
export const GET_CODE_LIST_ITEMS_FAILURE = 'GET_CODE_LIST_ITEMS_FAILURE';

/**
 * Get items from code list
 *
 * @param {string} codeListType
 * @returns {{}}
 */
export function getCodeListItems(codeListType) {
    return {
        [CALL_API]: {
            types: [ GET_CODE_LIST_ITEMS_REQUEST, GET_CODE_LIST_ITEMS_SUCCESS, GET_CODE_LIST_ITEMS_FAILURE ],
            endpoint: 'Activity.getCodeListItems',
            payload: [codeListType],
            extra: codeListType
        }
    }
}

/*
 * Add basic information form data of activity
 */

export const ADD_BASIC_INFORMATION_REQUEST = 'ADD_BASIC_INFORMATION_REQUEST';
export const ADD_BASIC_INFORMATION_SUCCESS = 'ADD_BASIC_INFORMATION_SUCCESS';
export const ADD_BASIC_INFORMATION_FAILURE = 'ADD_BASIC_INFORMATION_FAILURE';

export function addBasicInformation(publisherId, activity) {
    return {
        [CALL_API]: {
            types: [ ADD_BASIC_INFORMATION_REQUEST, ADD_BASIC_INFORMATION_SUCCESS, ADD_BASIC_INFORMATION_FAILURE ],
            endpoint: 'Activity.addBasicInformation',
            payload: [activity]
        }
    }
}

/*
 * Add basic information's description form data of activity
 */

export const ADD_BASIC_INFORMATION_DESCRIPTION_REQUEST = 'ADD_BASIC_INFORMATION_DESCRIPTION_REQUEST';
export const ADD_BASIC_INFORMATION_DESCRIPTION_SUCCESS = 'ADD_BASIC_INFORMATION_DESCRIPTION_SUCCESS';
export const ADD_BASIC_INFORMATION_DESCRIPTION_FAILURE = 'ADD_BASIC_INFORMATION_DESCRIPTION_FAILURE';

export function addBasicInformationDescription(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;
    formData.activity_id = activityID;
    return {
      [CALL_API]: {
        types: [ ADD_BASIC_INFORMATION_DESCRIPTION_REQUEST, ADD_BASIC_INFORMATION_DESCRIPTION_SUCCESS, ADD_BASIC_INFORMATION_DESCRIPTION_FAILURE ],
        endpoint: 'Activity.addBasicInformationDescription',
        payload: [formData, activity]
      }
    }
}

/*
 * Add basic information's status form data of activity
 */

export const ADD_BASIC_INFORMATION_STATUS_REQUEST = 'ADD_BASIC_INFORMATION_STATUS_REQUEST';
export const ADD_BASIC_INFORMATION_STATUS_SUCCESS = 'ADD_BASIC_INFORMATION_STATUS_SUCCESS';
export const ADD_BASIC_INFORMATION_STATUS_FAILURE = 'ADD_BASIC_INFORMATION_STATUS_FAILURE';

export function addBasicInformationStatus(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;
  return {
    [CALL_API]: {
      types: [ ADD_BASIC_INFORMATION_STATUS_REQUEST, ADD_BASIC_INFORMATION_STATUS_SUCCESS, ADD_BASIC_INFORMATION_STATUS_FAILURE ],
      endpoint: 'Activity.addBasicInformationStatus',
      payload: [activity]
    }
  }
}

/*
 * Add basic information's date form data of activity
 */

export const ADD_BASIC_INFORMATION_DATE_REQUEST = 'ADD_BASIC_INFORMATION_DATE_REQUEST';
export const ADD_BASIC_INFORMATION_DATE_SUCCESS = 'ADD_BASIC_INFORMATION_DATE_SUCCESS';
export const ADD_BASIC_INFORMATION_DATE_FAILURE = 'ADD_BASIC_INFORMATION_DATE_FAILURE';

export function addBasicInformationDate(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;
  return {
    [CALL_API]: {
      types: [ ADD_BASIC_INFORMATION_DATE_REQUEST, ADD_BASIC_INFORMATION_DATE_SUCCESS, ADD_BASIC_INFORMATION_DATE_FAILURE ],
      endpoint: 'Activity.addBasicInformationDate',
      payload: [formData, activity]
    }
  }
}

/*
 * Add basic information's contact form data of activity
 */

export const ADD_BASIC_INFORMATION_CONTACT_REQUEST = 'ADD_BASIC_INFORMATION_CONTACT_REQUEST';
export const ADD_BASIC_INFORMATION_CONTACT_SUCCESS = 'ADD_BASIC_INFORMATION_CONTACT_SUCCESS';
export const ADD_BASIC_INFORMATION_CONTACT_FAILURE = 'ADD_BASIC_INFORMATION_CONTACT_FAILURE';

export function addBasicInformationContact(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;
    formData.activity_id = activityID;
    return {
        [CALL_API]: {
            types: [ ADD_BASIC_INFORMATION_CONTACT_REQUEST, ADD_BASIC_INFORMATION_CONTACT_SUCCESS, ADD_BASIC_INFORMATION_CONTACT_FAILURE ],
            endpoint: 'Activity.addBasicInformationContact',
            payload: [formData, activity]
        }
    }
}

/*
 * Get participating_organisations (Identification form)
 */
export const GET_PARTICIPATING_ORGANISATIONS_REQUEST = 'GET_PARTICIPATING_ORGANISATIONS_REQUEST';
export const GET_PARTICIPATING_ORGANISATIONS_SUCCESS = 'GET_PARTICIPATING_ORGANISATIONS_SUCCESS';
export const GET_PARTICIPATING_ORGANISATIONS_FAILURE = 'GET_PARTICIPATING_ORGANISATIONS_FAILURE';

export function getParticipatingOrganisations(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_PARTICIPATING_ORGANISATIONS_REQUEST, GET_PARTICIPATING_ORGANISATIONS_SUCCESS, GET_PARTICIPATING_ORGANISATIONS_FAILURE ],
            endpoint: 'Activity.getParticipatingOrganisations',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.participatingOrganisation),
        }
    }
}

/*
 * Create participating_organisation (Identification form)
 */
export const CREATE_PARTICIPATING_ORGANISATION_REQUEST = 'CREATE_PARTICIPATING_ORGANISATION_REQUEST';
export const CREATE_PARTICIPATING_ORGANISATION_SUCCESS = 'CREATE_PARTICIPATING_ORGANISATION_SUCCESS';
export const CREATE_PARTICIPATING_ORGANISATION_FAILURE = 'CREATE_PARTICIPATING_ORGANISATION_FAILURE';
export function createParticipatingOrganisation(publisherId, activityId, participating_organisation) {
    return {
        [CALL_API]: {
            types: [ CREATE_PARTICIPATING_ORGANISATION_REQUEST, CREATE_PARTICIPATING_ORGANISATION_SUCCESS, CREATE_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.createParticipatingOrganisation',
            payload: [ publisherId, activityId, JSON.stringify(participating_organisation) ],
            schema: Schemas.participatingOrganisation,
        }
    }
}

/*
 * Update participating_organisation (Identification form)
 */
export const UPDATE_PARTICIPATING_ORGANISATION_REQUEST = 'UPDATE_PARTICIPATING_ORGANISATION_REQUEST';
export const UPDATE_PARTICIPATING_ORGANISATION_SUCCESS = 'UPDATE_PARTICIPATING_ORGANISATION_SUCCESS';
export const UPDATE_PARTICIPATING_ORGANISATION_FAILURE = 'UPDATE_PARTICIPATING_ORGANISATION_FAILURE';
export function updateParticipatingOrganisation(publisherId, activityId, id, participating_organisation) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_PARTICIPATING_ORGANISATION_REQUEST, UPDATE_PARTICIPATING_ORGANISATION_SUCCESS, UPDATE_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.updateParticipatingOrganisation',
            payload: [ publisherId, activityId, id, JSON.stringify(participating_organisation) ],
            schema: Schemas.participatingOrganisation,
        }
    }
}


/*
 * Delete participating_organisation (Identification form)
 */
export const DELETE_PARTICIPATING_ORGANISATION_REQUEST = 'DELETE_PARTICIPATING_ORGANISATION_REQUEST';
export const DELETE_PARTICIPATING_ORGANISATION_SUCCESS = 'DELETE_PARTICIPATING_ORGANISATION_SUCCESS';
export const DELETE_PARTICIPATING_ORGANISATION_FAILURE = 'DELETE_PARTICIPATING_ORGANISATION_FAILURE';
export function deleteParticipatingOrganisation(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_PARTICIPATING_ORGANISATION_REQUEST, DELETE_PARTICIPATING_ORGANISATION_SUCCESS, DELETE_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.deleteParticipatingOrganisation',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get DocumentLink
 */
export const GET_DOCUMENT_LINK_REQUEST = 'GET_DOCUMENT_LINK_REQUEST';
export const GET_DOCUMENT_LINK_SUCCESS = 'GET_DOCUMENT_LINK_SUCCESS';
export const GET_DOCUMENT_LINK_FAILURE = 'GET_DOCUMENT_LINK_FAILURE';

export function getDocumentLinks(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_DOCUMENT_LINK_REQUEST, GET_DOCUMENT_LINK_SUCCESS, GET_DOCUMENT_LINK_FAILURE ],
            endpoint: 'Activity.getDocumentLinks',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.documentLink),
        }
    }
}

/*
 * Create DocumentLink
 */
export const CREATE_DOCUMENT_LINK_REQUEST = 'CREATE_DOCUMENT_LINK_REQUEST';
export const CREATE_DOCUMENT_LINK_SUCCESS = 'CREATE_DOCUMENT_LINK_SUCCESS';
export const CREATE_DOCUMENT_LINK_FAILURE = 'CREATE_DOCUMENT_LINK_FAILURE';
export function createDocumentLink(publisherId, activityId, documentLink) {
    return {
        [CALL_API]: {
            types: [ CREATE_DOCUMENT_LINK_REQUEST, CREATE_DOCUMENT_LINK_SUCCESS, CREATE_DOCUMENT_LINK_FAILURE ],
            endpoint: 'Activity.createDocumentLink',
            payload: [ publisherId, activityId, documentLink ],
            schema: Schemas.documentLink,
        }
    }
}

/*
 * Update DocumentLink
 */
export const UPDATE_DOCUMENT_LINK_REQUEST = 'UPDATE_DOCUMENT_LINK_REQUEST';
export const UPDATE_DOCUMENT_LINK_SUCCESS = 'UPDATE_DOCUMENT_LINK_SUCCESS';
export const UPDATE_DOCUMENT_LINK_FAILURE = 'UPDATE_DOCUMENT_LINK_FAILURE';
export function updateDocumentLink(publisherId, activityId, id, documentLink) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_DOCUMENT_LINK_REQUEST, UPDATE_DOCUMENT_LINK_SUCCESS, UPDATE_DOCUMENT_LINK_FAILURE ],
            endpoint: 'Activity.updateDocumentLink',
            payload: [ publisherId, activityId, id, documentLink ],
            schema: Schemas.documentLink,
        }
    }
}


/*
 * Delete DocumentLink
 */
export const DELETE_DOCUMENT_LINK_REQUEST = 'DELETE_DOCUMENT_LINK_REQUEST';
export const DELETE_DOCUMENT_LINK_SUCCESS = 'DELETE_DOCUMENT_LINK_SUCCESS';
export const DELETE_DOCUMENT_LINK_FAILURE = 'DELETE_DOCUMENT_LINK_FAILURE';
export function deleteDocumentLink(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_DOCUMENT_LINK_REQUEST, DELETE_DOCUMENT_LINK_SUCCESS, DELETE_DOCUMENT_LINK_FAILURE ],
            endpoint: 'Activity.deleteDocumentLink',
            payload: [ publisherId, activityId, id ]
        }
    }
}


/*
 * Get HumanitariansScope
 */
export const GET_HUMANITARIAN_SCOPE_REQUEST = 'GET_HUMANITARIAN_SCOPE_REQUEST';
export const GET_HUMANITARIAN_SCOPE_SUCCESS = 'GET_HUMANITARIAN_SCOPE_SUCCESS';
export const GET_HUMANITARIAN_SCOPE_FAILURE = 'GET_HUMANITARIAN_SCOPE_FAILURE';

export function getHumanitarianScopes(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_HUMANITARIAN_SCOPE_REQUEST, GET_HUMANITARIAN_SCOPE_SUCCESS, GET_HUMANITARIAN_SCOPE_FAILURE ],
            endpoint: 'Activity.getHumanitarianScope',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.humanitarianScope),
        }
    }
}

/*
 * Create HumanitarianScope
 */
export const CREATE_HUMANITARIAN_SCOPE_REQUEST = 'CREATE_HUMANITARIAN_SCOPE_REQUEST';
export const CREATE_HUMANITARIAN_SCOPE_SUCCESS = 'CREATE_HUMANITARIAN_SCOPE_SUCCESS';
export const CREATE_HUMANITARIAN_SCOPE_FAILURE = 'CREATE_HUMANITARIAN_SCOPE_FAILURE';
export function createHumanitarianScope(publisherId, activityId, humanitarianScope) {
    return {
        [CALL_API]: {
            types: [ CREATE_HUMANITARIAN_SCOPE_REQUEST, CREATE_HUMANITARIAN_SCOPE_SUCCESS, CREATE_HUMANITARIAN_SCOPE_FAILURE ],
            endpoint: 'Activity.createHumanitarianScope',
            payload: [ publisherId, activityId, humanitarianScope ],
            schema: Schemas.humanitarianScope,
        }
    }
}

/*
 * Update HumanitarianScope
 */
export const UPDATE_HUMANITARIAN_SCOPE_REQUEST = 'UPDATE_HUMANITARIAN_SCOPE_REQUEST';
export const UPDATE_HUMANITARIAN_SCOPE_SUCCESS = 'UPDATE_HUMANITARIAN_SCOPE_SUCCESS';
export const UPDATE_HUMANITARIAN_SCOPE_FAILURE = 'UPDATE_HUMANITARIAN_SCOPE_FAILURE';
export function updateHumanitarianScope(publisherId, activityId, id, humanitarianScope) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_HUMANITARIAN_SCOPE_REQUEST, UPDATE_HUMANITARIAN_SCOPE_SUCCESS, UPDATE_HUMANITARIAN_SCOPE_FAILURE ],
            endpoint: 'Activity.updateHumanitarianScope',
            payload: [ publisherId, activityId, id, humanitarianScope ],
            schema: Schemas.humanitarianScope,
        }
    }
}


/*
 * Delete HumanitarianScope
 */
export const DELETE_HUMANITARIAN_SCOPE_REQUEST = 'DELETE_HUMANITARIAN_SCOPE_REQUEST';
export const DELETE_HUMANITARIAN_SCOPE_SUCCESS = 'DELETE_HUMANITARIAN_SCOPE_SUCCESS';
export const DELETE_HUMANITARIAN_SCOPE_FAILURE = 'DELETE_HUMANITARIAN_SCOPE_FAILURE';
export function deleteHumanitarianScope(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_HUMANITARIAN_SCOPE_REQUEST, DELETE_HUMANITARIAN_SCOPE_SUCCESS, DELETE_HUMANITARIAN_SCOPE_FAILURE ],
            endpoint: 'Activity.deleteHumanitarianScope',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/**
 * Add participating organisation form data of activity
 *
 * @param formData
 * @param activity
 * @returns {{}}
 */

export const ADD_PARTICIPATING_ORGANISATION_REQUEST = 'ADD_PARTICIPATING_ORGANISATION_REQUEST';
export const ADD_PARTICIPATING_ORGANISATION_SUCCESS = 'ADD_PARTICIPATING_ORGANISATION_SUCCESS';
export const ADD_PARTICIPATING_ORGANISATION_FAILURE = 'ADD_PARTICIPATING_ORGANISATION_FAILURE';

export function addParticipatingOrganisation(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;
    return {
        [CALL_API]: {
            types: [ ADD_PARTICIPATING_ORGANISATION_REQUEST, ADD_PARTICIPATING_ORGANISATION_SUCCESS, ADD_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.addParticipatingOrganisation',
            payload: [formData, activity]
        }
    }
}


/*
 * Add Document Link information form data of activity
 */
export const ADD_DOCUMENT_LINK_REQUEST = 'ADD_DOCUMENT_LINK_REQUEST';
export const ADD_DOCUMENT_LINK_SUCCESS = 'ADD_DOCUMENT_LINK_SUCCESS';
export const ADD_DOCUMENT_LINK_FAILURE = 'ADD_DOCUMENT_LINK_FAILURE';

export function addDocumentLink(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;
    formData.activity_id = activityID;
    return {
        [CALL_API]: {
            types: [ ADD_DOCUMENT_LINK_REQUEST, ADD_DOCUMENT_LINK_SUCCESS, ADD_DOCUMENT_LINK_FAILURE ],
            endpoint: 'Activity.addDocumentLink',
            payload: [formData, activity]
        }
    }
}

/*
 * Add relation information form data of activity
 */
export const ADD_RELATIONS_REQUEST = 'ADD_RELATIONS_REQUEST';
export const ADD_RELATIONS_SUCCESS = 'ADD_RELATIONS_SUCCESS';
export const ADD_RELATIONS_FAILURE = 'ADD_RELATIONS_FAILURE';

export function addRelations(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_RELATIONS_REQUEST, ADD_RELATIONS_SUCCESS, ADD_RELATIONS_FAILURE ],
      endpoint: 'Activity.addRelations',
      payload: [formData, activity]
    }
  }
}

/*
 * Add performance condition information form data of activity
 */
export const ADD_PERFORMANCE_CONDITION_REQUEST = 'ADD_PERFORMANCE_CONDITION_REQUEST';
export const ADD_PERFORMANCE_CONDITION_SUCCESS = 'ADD_PERFORMANCE_CONDITION_SUCCESS';
export const PERFORMANCE_CONDITION_FAILURE = 'PERFORMANCE_CONDITION_FAILURE';

export function addPerformanceCondition(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;

    return {
        [CALL_API]: {
            types: [ ADD_PERFORMANCE_CONDITION_REQUEST, ADD_PERFORMANCE_CONDITION_SUCCESS, PERFORMANCE_CONDITION_FAILURE ],
            endpoint: 'Activity.addPerformanceCondition',
            payload: [formData, activity]
        }
    }
}

/*
 * Add performance result information form data of activity
 */
export const ADD_PERFORMANCE_RESULT_REQUEST = 'ADD_PERFORMANCE_RESULT_REQUEST';
export const ADD_PERFORMANCE_RESULT_SUCCESS = 'ADD_PERFORMANCE_RESULT_SUCCESS';
export const PERFORMANCE_RESULT_FAILURE = 'PERFORMANCE_RESULT_FAILURE';

export function addPerformanceResult(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;

    return {
        [CALL_API]: {
          types: [ ADD_PERFORMANCE_RESULT_REQUEST, ADD_PERFORMANCE_RESULT_SUCCESS, PERFORMANCE_RESULT_FAILURE ],
          endpoint: 'Activity.addPerformanceResult',
          payload: [formData, activity]
        }
    }
}

/*
 * Add performance comment information form data of activity
 */
export const ADD_PERFORMANCE_COMMENT_REQUEST = 'ADD_PERFORMANCE_COMMENT_REQUEST';
export const ADD_PERFORMANCE_COMMENT_SUCCESS = 'ADD_PERFORMANCE_COMMENT_SUCCESS';
export const PERFORMANCE_COMMENT_FAILURE = 'PERFORMANCE_COMMENT_FAILURE';

export function addPerformanceComment(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;

    return {
        [CALL_API]: {
          types: [ ADD_PERFORMANCE_COMMENT_REQUEST, ADD_PERFORMANCE_COMMENT_SUCCESS, PERFORMANCE_COMMENT_FAILURE ],
          endpoint: 'Activity.addPerformanceComment',
          payload: [formData, activity]
        }
    }
}

/*
 * Add financial budgets information form data of activity
 */

export const ADD_FINANCIAL_BUDGET_REQUEST = 'ADD_FINANCIAL_BUDGET_REQUEST';
export const ADD_FINANCIAL_BUDGET_SUCCESS = 'ADD_FINANCIAL_BUDGET_SUCCESS';
export const FINANCIAL_BUDGET_FAILURE = 'FINANCIAL_BUDGET_FAILURE';

export function addFinancialBudgets(publisherId, formData, activity) {
  const activityID = 666;
    formData.activity = activityID;

    return {
        [CALL_API]: {
          types: [ ADD_FINANCIAL_BUDGET_REQUEST, ADD_FINANCIAL_BUDGET_SUCCESS, FINANCIAL_BUDGET_FAILURE ],
          endpoint: 'Activity.addFinancialBudgets',
          payload: [formData, activity]
        }
    }
}


/*
 * Add financial planned disbursements information form data of activity
 */
export const ADD_FINANCIAL_PLANNED_DISBURSEMENTS_REQUEST = 'ADD_FINANCIAL_PLANNED_DISBURSEMENTS_REQUEST';
export const ADD_FINANCIAL_PLANNED_DISBURSEMENTS_SUCCESS = 'ADD_FINANCIAL_PLANNED_DISBURSEMENTS_SUCCESS';
export const FINANCIAL_PLANNED_DISBURSEMENTS_FAILURE = 'FINANCIAL_PLANNED_DISBURSEMENTS_FAILURE';

export function addFinancialPlannedDisbursements(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;

    return {
        [CALL_API]: {
          types: [ ADD_FINANCIAL_PLANNED_DISBURSEMENTS_REQUEST, ADD_FINANCIAL_PLANNED_DISBURSEMENTS_SUCCESS, FINANCIAL_PLANNED_DISBURSEMENTS_FAILURE ],
          endpoint: 'Activity.addFinancialPlannedDisbursements',
          payload: [formData, activity]
        }
    }
}


/*
 * Add financial transactions information form data of activity
 */
export const ADD_FINANCIAL_TRANSACTIONS_REQUEST = 'ADD_FINANCIAL_TRANSACTIONS_REQUEST';
export const ADD_FINANCIAL_TRANSACTIONS_SUCCESS = 'ADD_FINANCIAL_TRANSACTIONS_SUCCESS';
export const FINANCIAL_TRANSACTIONS_FAILURE = 'FINANCIAL_TRANSACTIONS_FAILURE';

export function addFinancialTransactions(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;
    formData.activity_id = activityID;

    return {
        [CALL_API]: {
          types: [ ADD_FINANCIAL_TRANSACTIONS_REQUEST, ADD_FINANCIAL_TRANSACTIONS_SUCCESS, FINANCIAL_TRANSACTIONS_FAILURE ],
          endpoint: 'Activity.addFinancialTransactions',
          payload: [formData, activity]
        }
    }
}

/*
 * Add financial capital spend information form data of activity
 */
export const ADD_FINANCIAL_CAPITAL_SPEND_REQUEST = 'ADD_FINANCIAL_CAPITAL_SPEND_REQUEST';
export const ADD_FINANCIAL_CAPITAL_SPEND_SUCCESS = 'ADD_FINANCIAL_CAPITAL_SPEND_SUCCESS';
export const FINANCIAL_CAPITAL_SPEND_FAILURE = 'FINANCIAL_CAPITAL_SPEND_FAILURE';

export function addFinancialCapitalSpend(publisherId, formData, activity) {
    const activityID = 666;
    formData.activity = activityID;
    formData.activity_id = activityID;

    return {
        [CALL_API]: {
          types: [ ADD_FINANCIAL_CAPITAL_SPEND_REQUEST, ADD_FINANCIAL_CAPITAL_SPEND_SUCCESS, FINANCIAL_CAPITAL_SPEND_FAILURE ],
          endpoint: 'Activity.addFinancialCapitalSpend',
          payload: [formData, activity]
        }
    }
}


/*
 * Add financial capital spend information form data of activity
 */
export const ADD_GEOPOLITICAL_COUNTRY_REQUEST = 'ADD_GEOPOLITICAL_COUNTRY_REQUEST';
export const ADD_GEOPOLITICAL_COUNTRY_SUCCESS = 'ADD_GEOPOLITICAL_COUNTRY_SUCCESS';
export const ADD_GEOPOLITICAL_COUNTRY_FAILURE = 'ADD_GEOPOLITICAL_COUNTRY_FAILURE';

export function addGeopoliticalCountry(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_GEOPOLITICAL_COUNTRY_REQUEST, ADD_GEOPOLITICAL_COUNTRY_SUCCESS, ADD_GEOPOLITICAL_COUNTRY_FAILURE ],
      endpoint: 'Activity.addGeopoliticalCountry',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Geopolitical Region information form data of activity
 */
export const ADD_GEOPOLITICAL_REGION_REQUEST = 'ADD_GEOPOLITICAL_REGION_REQUEST';
export const ADD_GEOPOLITICAL_REGION_SUCCESS = 'ADD_GEOPOLITICAL_REGION_SUCCESS';
export const ADD_GEOPOLITICAL_REGION_FAILURE = 'ADD_GEOPOLITICAL_REGION_FAILURE';

export function addGeopoliticalRegion(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_GEOPOLITICAL_REGION_REQUEST, ADD_GEOPOLITICAL_REGION_SUCCESS, ADD_GEOPOLITICAL_REGION_FAILURE ],
      endpoint: 'Activity.addGeopoliticalRegion',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Geopolitical Location information form data of activity
 */
export const ADD_GEOPOLITICAL_LOCATION_REQUEST = 'ADD_GEOPOLITICAL_LOCATION_REQUEST';
export const ADD_GEOPOLITICAL_LOCATION_SUCCESS = 'ADD_GEOPOLITICAL_LOCATION_SUCCESS';
export const ADD_GEOPOLITICAL_LOCATION_FAILURE = 'ADD_GEOPOLITICAL_LOCATION_FAILURE';

export function addGeopoliticalLocation(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_GEOPOLITICAL_LOCATION_REQUEST, ADD_GEOPOLITICAL_LOCATION_SUCCESS, ADD_GEOPOLITICAL_LOCATION_FAILURE ],
      endpoint: 'Activity.addGeopoliticalLocation',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Classification Sector forms data of activity
 */
export const ADD_CLASSIFICATION_SECTOR_REQUEST = 'ADD_CLASSIFICATION_SECTOR_REQUEST';
export const ADD_CLASSIFICATION_SECTOR_SUCCESS = 'ADD_CLASSIFICATION_SECTOR_SUCCESS';
export const ADD_CLASSIFICATION_SECTOR_FAILURE = 'ADD_CLASSIFICATION_SECTOR_FAILURE';

export function addClassificationSector(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_CLASSIFICATION_SECTOR_REQUEST, ADD_CLASSIFICATION_SECTOR_SUCCESS, ADD_CLASSIFICATION_SECTOR_FAILURE ],
      endpoint: 'Activity.addClassificationSector',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Classification Policy forms data of activity
 */
export const ADD_CLASSIFICATION_POLICY_REQUEST = 'ADD_CLASSIFICATION_POLICY_REQUEST';
export const ADD_CLASSIFICATION_POLICY_SUCCESS = 'ADD_CLASSIFICATION_POLICY_SUCCESS';
export const ADD_CLASSIFICATION_POLICY_FAILURE = 'ADD_CLASSIFICATION_POLICY_FAILURE';

export function addClassificationPolicy(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_CLASSIFICATION_POLICY_REQUEST, ADD_CLASSIFICATION_POLICY_SUCCESS, ADD_CLASSIFICATION_POLICY_FAILURE ],
      endpoint: 'Activity.addClassificationPolicy',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Classification selection forms data of activity
 */
export const ADD_CLASSIFICATION_SELECT_REQUEST = 'ADD_CLASSIFICATION_SELECT_REQUEST';
export const ADD_CLASSIFICATION_SELECT_SUCCESS = 'ADD_CLASSIFICATION_SELECT_SUCCESS';
export const ADD_CLASSIFICATION_SELECT_FAILURE = 'ADD_CLASSIFICATION_SELECT_FAILURE';

export function addClassificationSelect(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_CLASSIFICATION_SELECT_REQUEST, ADD_CLASSIFICATION_SELECT_SUCCESS, ADD_CLASSIFICATION_SELECT_FAILURE ],
      endpoint: 'Activity.addClassificationSelect',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Classification Country forms data of activity
 */
export const ADD_CLASSIFICATION_COUNTRY_REQUEST = 'ADD_CLASSIFICATION_COUNTRY_REQUEST';
export const ADD_CLASSIFICATION_COUNTRY_SUCCESS = 'ADD_CLASSIFICATION_COUNTRY_SUCCESS';
export const ADD_CLASSIFICATION_COUNTRY_FAILURE = 'ADD_CLASSIFICATION_COUNTRY_FAILURE';

export function addClassificationCountryBudget(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_CLASSIFICATION_COUNTRY_REQUEST, ADD_CLASSIFICATION_COUNTRY_SUCCESS, ADD_CLASSIFICATION_COUNTRY_FAILURE ],
      endpoint: 'Activity.addClassificationCountryBudget',
      payload: [formData, activity]
    }
  }
}

/*
 * Add Classification Humanitarian forms data of activity
 */
export const ADD_CLASSIFICATION_HUMANITARIAN_REQUEST = 'ADD_CLASSIFICATION_HUMANITARIAN_REQUEST';
export const ADD_CLASSIFICATION_HUMANITARIAN_SUCCESS = 'ADD_CLASSIFICATION_HUMANITARIAN_SUCCESS';
export const ADD_CLASSIFICATION_HUMANITARIAN_FAILURE = 'ADD_CLASSIFICATION_HUMANITARIAN_FAILURE';

export function addClassificationHumanitarian(publisherId, formData, activity) {
  const activityID = 666;
  formData.activity = activityID;
  formData.activity_id = activityID;

  return {
    [CALL_API]: {
      types: [ ADD_CLASSIFICATION_HUMANITARIAN_REQUEST, ADD_CLASSIFICATION_HUMANITARIAN_SUCCESS, ADD_CLASSIFICATION_HUMANITARIAN_FAILURE ],
      endpoint: 'Activity.addClassificationHumanitarian',
      payload: [formData, activity]
    }
  }
}
