
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
            payload: [ publisherId, activityId, JSON.stringify(transaction) ],
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
            payload: [ publisherId, activityId, id, JSON.stringify(transaction)],
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
            payload: [ publisherId, activityId, JSON.stringify(budget) ],
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
            payload: [ publisherId, activityId, id, JSON.stringify(budget) ],
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
            endpoint: 'Activity.getRegions',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.recipientRegion),
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
            payload: [ publisherId, activityId, JSON.stringify(region) ],
            schema: Schemas.recipientRegion,
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
            payload: [ publisherId, activityId, id, JSON.stringify(region) ],
            schema: Schemas.recipientRegion,
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

/*
 * Get Sector (Classifications form)
 */
export const GET_SECTOR_REQUEST = 'GET_SECTOR_REQUEST';
export const GET_SECTOR_SUCCESS = 'GET_SECTOR_SUCCESS';
export const GET_SECTOR_FAILURE = 'GET_SECTOR_FAILURE';

export function getSectors(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_SECTOR_REQUEST, GET_SECTOR_SUCCESS, GET_SECTOR_FAILURE ],
            endpoint: 'Activity.getSectors',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.sector),
        }
    }
}

/*
 * Create Sector (Classifications form)
 */
export const CREATE_SECTOR_REQUEST = 'CREATE_SECTOR_REQUEST';
export const CREATE_SECTOR_SUCCESS = 'CREATE_SECTOR_SUCCESS';
export const CREATE_SECTOR_FAILURE = 'CREATE_SECTOR_FAILURE';
export function createSector(publisherId, activityId, sector) {
    return {
        [CALL_API]: {
            types: [ CREATE_SECTOR_REQUEST, CREATE_SECTOR_SUCCESS, CREATE_SECTOR_FAILURE ],
            endpoint: 'Activity.createSector',
            payload: [ publisherId, activityId, JSON.stringify(sector) ],
            schema: Schemas.sector,
        }
    }
}

/*
 * Update Sector (Classifications form)
 */
export const UPDATE_SECTOR_REQUEST = 'UPDATE_SECTOR_REQUEST';
export const UPDATE_SECTOR_SUCCESS = 'UPDATE_SECTOR_SUCCESS';
export const UPDATE_SECTOR_FAILURE = 'UPDATE_SECTOR_FAILURE';
export function updateSector(publisherId, activityId, id, sector) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_SECTOR_REQUEST, UPDATE_SECTOR_SUCCESS, UPDATE_SECTOR_FAILURE ],
            endpoint: 'Activity.updateSector',
            payload: [ publisherId, activityId, id, JSON.stringify(sector) ],
            schema: Schemas.sector,
        }
    }
}


/*
 * Delete Sector (Geopolitical form)
 */
export const DELETE_SECTOR_REQUEST = 'DELETE_SECTOR_REQUEST';
export const DELETE_SECTOR_SUCCESS = 'DELETE_SECTOR_SUCCESS';
export const DELETE_SECTOR_FAILURE = 'DELETE_SECTOR_FAILURE';
export function deleteSector(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_SECTOR_REQUEST, DELETE_SECTOR_SUCCESS, DELETE_SECTOR_FAILURE ],
            endpoint: 'Activity.deleteSector',
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
            payload: [ publisherId, activityId, JSON.stringify(policy) ],
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
            payload: [ publisherId, activityId, id, JSON.stringify(policy) ],
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
 * Get CountryBudgetItems
 */
export const GET_COUNTRY_BUDGET_ITEM_REQUEST = 'GET_COUNTRY_BUDGET_ITEM_REQUEST';
export const GET_COUNTRY_BUDGET_ITEM_SUCCESS = 'GET_COUNTRY_BUDGET_ITEM_SUCCESS';
export const GET_COUNTRY_BUDGET_ITEM_FAILURE = 'GET_COUNTRY_BUDGET_ITEM_FAILURE';

export function getCountryBudgetItems(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_COUNTRY_BUDGET_ITEM_REQUEST, GET_COUNTRY_BUDGET_ITEM_SUCCESS, GET_COUNTRY_BUDGET_ITEM_FAILURE ],
            endpoint: 'Activity.getCountryBudgetItem',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.countryBudgetItem),
        }
    }
}

/*
 * Create CountryBudgetItem
 */
export const CREATE_COUNTRY_BUDGET_ITEM_REQUEST = 'CREATE_COUNTRY_BUDGET_ITEM_REQUEST';
export const CREATE_COUNTRY_BUDGET_ITEM_SUCCESS = 'CREATE_COUNTRY_BUDGET_ITEM_SUCCESS';
export const CREATE_COUNTRY_BUDGET_ITEM_FAILURE = 'CREATE_COUNTRY_BUDGET_ITEM_FAILURE';
export function createCountryBudgetItem(publisherId, activityId, countryBudgetItem) {
    return {
        [CALL_API]: {
            types: [ CREATE_COUNTRY_BUDGET_ITEM_REQUEST, CREATE_COUNTRY_BUDGET_ITEM_SUCCESS, CREATE_COUNTRY_BUDGET_ITEM_FAILURE ],
            endpoint: 'Activity.createCountryBudgetItem',
            payload: [ publisherId, activityId, JSON.stringify(countryBudgetItem) ],
            schema: Schemas.countryBudgetItem,
        }
    }
}

/*
 * Update CountryBudgetItem
 */
export const UPDATE_COUNTRY_BUDGET_ITEM_REQUEST = 'UPDATE_COUNTRY_BUDGET_ITEM_REQUEST';
export const UPDATE_COUNTRY_BUDGET_ITEM_SUCCESS = 'UPDATE_COUNTRY_BUDGET_ITEM_SUCCESS';
export const UPDATE_COUNTRY_BUDGET_ITEM_FAILURE = 'UPDATE_COUNTRY_BUDGET_ITEM_FAILURE';
export function updateCountryBudgetItem(publisherId, activityId, id, countryBudgetItem) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_COUNTRY_BUDGET_ITEM_REQUEST, UPDATE_COUNTRY_BUDGET_ITEM_SUCCESS, UPDATE_COUNTRY_BUDGET_ITEM_FAILURE ],
            endpoint: 'Activity.updateCountryBudgetItem',
            payload: [ publisherId, activityId, id, JSON.stringify(countryBudgetItem) ],
            schema: Schemas.countryBudgetItem,
        }
    }
}


/*
 * Delete CountryBudgetItem
 */
export const DELETE_COUNTRY_BUDGET_ITEM_REQUEST = 'DELETE_COUNTRY_BUDGET_ITEM_REQUEST';
export const DELETE_COUNTRY_BUDGET_ITEM_SUCCESS = 'DELETE_COUNTRY_BUDGET_ITEM_SUCCESS';
export const DELETE_COUNTRY_BUDGET_ITEM_FAILURE = 'DELETE_COUNTRY_BUDGET_ITEM_FAILURE';
export function deleteCountryBudgetItem(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_COUNTRY_BUDGET_ITEM_REQUEST, DELETE_COUNTRY_BUDGET_ITEM_SUCCESS, DELETE_COUNTRY_BUDGET_ITEM_FAILURE ],
            endpoint: 'Activity.deleteCountryBudgetItem',
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
            payload: [ publisherId, activityId, JSON.stringify(humanitarianScope) ],
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
            payload: [ publisherId, activityId, id, JSON.stringify(humanitarianScope) ],
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

/*
 * Get relations (Relation form)
 */
export const GET_RELATION_REQUEST = 'GET_RELATION_REQUEST';
export const GET_RELATION_SUCCESS = 'GET_RELATION_SUCCESS';
export const GET_RELATION_FAILURE = 'GET_RELATION_FAILURE';

export function getRelation(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_RELATION_REQUEST, GET_RELATION_SUCCESS, GET_RELATION_FAILURE ],
            endpoint: 'Activity.getRelation',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.related_activities),
        }
    }
}


/*
 * Create relation (Relations form)
 */
export const CREATE_RELATION_REQUEST = 'CREATE_RELATION_REQUEST';
export const CREATE_RELATION_SUCCESS = 'CREATE_RELATION_SUCCESS';
export const CREATE_RELATION_FAILURE = 'CREATE_RELATION_FAILURE';
export function createRelation(publisherId, activityId, relationData) {
    return {
        [CALL_API]: {
            types: [ CREATE_RELATION_REQUEST, CREATE_RELATION_SUCCESS, CREATE_RELATION_FAILURE ],
            endpoint: 'Activity.createRelation',
            payload: [ publisherId, activityId, JSON.stringify(relationData) ],
            schema: Schemas.related_activities,
        }
    }
}

/*
 * Update relations (Relations form)
 */
export const UPDATE_RELATION_REQUEST = 'UPDATE_RELATION_REQUEST';
export const UPDATE_RELATION_SUCCESS = 'UPDATE_RELATION_SUCCESS';
export const UPDATE_RELATION_FAILURE = 'UPDATE_RELATION_FAILURE';
export function updateRelation(publisherId, activityId, id, relationData) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_RELATION_REQUEST, UPDATE_RELATION_SUCCESS, UPDATE_RELATION_FAILURE ],
            endpoint: 'Activity.updateRelation',
            payload: [ publisherId, activityId, id, JSON.stringify(relationData) ],
            schema: Schemas.related_activities,
        }
    }
}


/*
 * Delete relations (Relations form)
 */
export const DELETE_RELATION_REQUEST = 'DELETE_RELATION_REQUEST';
export const DELETE_RELATION_SUCCESS = 'DELETE_RELATION_SUCCESS';
export const DELETE_RELATION_FAILURE = 'DELETE_RELATION_FAILURE';
export function deleteRelation(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_RELATION_REQUEST, DELETE_RELATION_SUCCESS, DELETE_RELATION_FAILURE ],
            endpoint: 'Activity.deleteRelation',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get performance condition (Performance condition form)
 */
export const GET_PERFORMANCE_CONDITION_REQUEST = 'GET_PERFORMANCE_CONDITION_REQUEST';
export const GET_PERFORMANCE_CONDITION_SUCCESS = 'GET_PERFORMANCE_CONDITION_SUCCESS';
export const GET_PERFORMANCE_CONDITION_FAILURE = 'GET_PERFORMANCE_CONDITION_FAILURE';

export function getPerformanceCondition(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_PERFORMANCE_CONDITION_REQUEST, GET_PERFORMANCE_CONDITION_SUCCESS, GET_PERFORMANCE_CONDITION_FAILURE ],
            endpoint: 'Activity.getPerformanceCondition',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.related_activities),
        }
    }
}


/*
 * Create performance condition (Performance condition form)
 */
export const CREATE_PERFORMANCE_CONDITION_REQUEST = 'CREATE_PERFORMANCE_CONDITION_REQUEST';
export const CREATE_PERFORMANCE_CONDITION_SUCCESS = 'CREATE_PERFORMANCE_CONDITION_SUCCESS';
export const CREATE_PERFORMANCE_CONDITION_FAILURE = 'CREATE_PERFORMANCE_CONDITION_FAILURE';
export function createPerformanceCondition(publisherId, activityId, conditionData) {
    return {
        [CALL_API]: {
            types: [ CREATE_PERFORMANCE_CONDITION_REQUEST, CREATE_PERFORMANCE_CONDITION_SUCCESS, CREATE_PERFORMANCE_CONDITION_FAILURE ],
            endpoint: 'Activity.createPerformanceCondition',
            payload: [ publisherId, activityId, JSON.stringify(conditionData) ],
            schema: Schemas.related_activities,
        }
    }
}

/*
 * Update performance condition (Performance condition form)
 */
export const UPDATE_PERFORMANCE_CONDITION_REQUEST = 'UPDATE_PERFORMANCE_CONDITION_REQUEST';
export const UPDATE_PERFORMANCE_CONDITION_SUCCESS = 'UPDATE_PERFORMANCE_CONDITION_SUCCESS';
export const UPDATE_PERFORMANCE_CONDITION_FAILURE = 'UPDATE_PERFORMANCE_CONDITION_FAILURE';
export function updatePerformanceCondition(publisherId, activityId, id, conditionData) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_PERFORMANCE_CONDITION_REQUEST, UPDATE_PERFORMANCE_CONDITION_SUCCESS, UPDATE_PERFORMANCE_CONDITION_FAILURE ],
            endpoint: 'Activity.updatePerformanceCondition',
            payload: [ publisherId, activityId, id, JSON.stringify(conditionData) ],
            schema: Schemas.related_activities,
        }
    }
}


/*
 * Delete performance condition (Performance condition form)
 */
export const DELETE_PERFORMANCE_CONDITION_REQUEST = 'DELETE_PERFORMANCE_CONDITION_REQUEST';
export const DELETE_PERFORMANCE_CONDITION_SUCCESS = 'DELETE_PERFORMANCE_CONDITION_SUCCESS';
export const DELETE_PERFORMANCE_CONDITION_FAILURE = 'DELETE_PERFORMANCE_CONDITION_FAILURE';
export function deletePerformanceCondition(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_PERFORMANCE_CONDITION_REQUEST, DELETE_PERFORMANCE_CONDITION_SUCCESS, DELETE_PERFORMANCE_CONDITION_FAILURE ],
            endpoint: 'Activity.deletePerformanceCondition',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get performance result (Performance result form)
 */
export const GET_PERFORMANCE_RESULT_REQUEST = 'GET_PERFORMANCE_RESULT_REQUEST';
export const GET_PERFORMANCE_RESULT_SUCCESS = 'GET_PERFORMANCE_RESULT_SUCCESS';
export const GET_PERFORMANCE_RESULT_FAILURE = 'GET_PERFORMANCE_RESULT_FAILURE';

export function getPerformanceResult(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_PERFORMANCE_RESULT_REQUEST, GET_PERFORMANCE_RESULT_SUCCESS, GET_PERFORMANCE_RESULT_FAILURE ],
            endpoint: 'Activity.getPerformanceCondition',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.related_activities),
        }
    }
}


/*
 * Create performance result (Performance result form)
 */
export const CREATE_PERFORMANCE_RESULT_REQUEST = 'CREATE_PERFORMANCE_RESULT_REQUEST';
export const CREATE_PERFORMANCE_RESULT_SUCCESS = 'CREATE_PERFORMANCE_RESULT_SUCCESS';
export const CREATE_PERFORMANCE_RESULT_FAILURE = 'CREATE_PERFORMANCE_RESULT_FAILURE';
export function createPerformanceResult(publisherId, activityId, conditionData) {
    return {
        [CALL_API]: {
            types: [ CREATE_PERFORMANCE_RESULT_REQUEST, CREATE_PERFORMANCE_RESULT_SUCCESS, CREATE_PERFORMANCE_RESULT_FAILURE ],
            endpoint: 'Activity.createPerformanceCondition',
            payload: [ publisherId, activityId, JSON.stringify(conditionData) ],
            schema: Schemas.related_activities,
        }
    }
}

/*
 * Update performance result (Performance result form)
 */
export const UPDATE_PERFORMANCE_RESULT_REQUEST = 'UPDATE_PERFORMANCE_RESULT_REQUEST';
export const UPDATE_PERFORMANCE_RESULT_SUCCESS = 'UPDATE_PERFORMANCE_RESULT_SUCCESS';
export const UPDATE_PERFORMANCE_RESULT_FAILURE = 'UPDATE_PERFORMANCE_RESULT_FAILURE';
export function updatePerformanceResult(publisherId, activityId, id, conditionData) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_PERFORMANCE_RESULT_REQUEST, UPDATE_PERFORMANCE_RESULT_SUCCESS, UPDATE_PERFORMANCE_RESULT_FAILURE ],
            endpoint: 'Activity.updatePerformanceCondition',
            payload: [ publisherId, activityId, id, JSON.stringify(conditionData) ],
            schema: Schemas.related_activities,
        }
    }
}


/*
 * Delete performance result (Performance result form)
 */
export const DELETE_PERFORMANCE_RESULT_REQUEST = 'DELETE_PERFORMANCE_RESULT_REQUEST';
export const DELETE_PERFORMANCE_RESULT_SUCCESS = 'DELETE_PERFORMANCE_RESULT_SUCCESS';
export const DELETE_PERFORMANCE_RESULT_FAILURE = 'DELETE_PERFORMANCE_RESULT_FAILURE';
export function deletePerformanceResult(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_PERFORMANCE_RESULT_REQUEST, DELETE_PERFORMANCE_RESULT_SUCCESS, DELETE_PERFORMANCE_RESULT_FAILURE ],
            endpoint: 'Activity.deletePerformanceCondition',
            payload: [ publisherId, activityId, id ]
        }
    }
}

/*
 * Get performance comment (Performance comment form)
 */
export const GET_PERFORMANCE_COMMENT_REQUEST = 'GET_PERFORMANCE_COMMENT_REQUEST';
export const GET_PERFORMANCE_COMMENT_SUCCESS = 'GET_PERFORMANCE_COMMENT_SUCCESS';
export const GET_PERFORMANCE_COMMENT_FAILURE = 'GET_PERFORMANCE_COMMENT_FAILURE';

export function getPerformanceComment(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [ GET_PERFORMANCE_COMMENT_REQUEST, GET_PERFORMANCE_COMMENT_SUCCESS, GET_PERFORMANCE_COMMENT_FAILURE ],
            endpoint: 'Activity.getPerformanceComment',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.related_activities),
        }
    }
}


/*
 * Create performance comment (Performance comment form)
 */
export const CREATE_PERFORMANCE_COMMENT_REQUEST = 'CREATE_PERFORMANCE_COMMENT_REQUEST';
export const CREATE_PERFORMANCE_COMMENT_SUCCESS = 'CREATE_PERFORMANCE_COMMENT_SUCCESS';
export const CREATE_PERFORMANCE_COMMENT_FAILURE = 'CREATE_PERFORMANCE_COMMENT_FAILURE';
export function createPerformanceComment(publisherId, activityId, commentData) {
    return {
        [CALL_API]: {
            types: [ CREATE_PERFORMANCE_COMMENT_REQUEST, CREATE_PERFORMANCE_COMMENT_SUCCESS, CREATE_PERFORMANCE_COMMENT_FAILURE ],
            endpoint: 'Activity.createPerformanceComment',
            payload: [ publisherId, activityId, JSON.stringify(commentData) ],
            schema: Schemas.related_activities,
        }
    }
}

/*
 * Update performance comment (Performance comment form)
 */
export const UPDATE_PERFORMANCE_COMMENT_REQUEST = 'UPDATE_PERFORMANCE_COMMENT_REQUEST';
export const UPDATE_PERFORMANCE_COMMENT_SUCCESS = 'UPDATE_PERFORMANCE_COMMENT_SUCCESS';
export const UPDATE_PERFORMANCE_COMMENT_FAILURE = 'UPDATE_PERFORMANCE_COMMENT_FAILURE';
export function updatePerformanceComment(publisherId, activityId, id, commentData) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_PERFORMANCE_COMMENT_REQUEST, UPDATE_PERFORMANCE_COMMENT_SUCCESS, UPDATE_PERFORMANCE_COMMENT_FAILURE ],
            endpoint: 'Activity.updatePerformanceComment',
            payload: [ publisherId, activityId, id, JSON.stringify(commentData) ],
            schema: Schemas.related_activities,
        }
    }
}


/*
 * Delete performance comment (Performance comment form)
 */
export const DELETE_PERFORMANCE_COMMENT_REQUEST = 'DELETE_PERFORMANCE_COMMENT_REQUEST';
export const DELETE_PERFORMANCE_COMMENT_SUCCESS = 'DELETE_PERFORMANCE_COMMENT_SUCCESS';
export const DELETE_PERFORMANCE_COMMENT_FAILURE = 'DELETE_PERFORMANCE_COMMENT_FAILURE';
export function deletePerformanceComment(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_PERFORMANCE_COMMENT_REQUEST, DELETE_PERFORMANCE_COMMENT_SUCCESS, DELETE_PERFORMANCE_COMMENT_FAILURE ],
            endpoint: 'Activity.deletePerformanceComment',
            payload: [ publisherId, activityId, id ]
        }
    }
}