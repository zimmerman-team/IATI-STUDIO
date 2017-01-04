
/*
 * Async actions
 */

import { CALL_API } from '../middleware/api'
import { arrayOf } from 'normalizr'
import * as Schemas from '../schemas'


/*
 * Get activity (Identification form)
 */
export const GET_ACTIVITY_REQUEST = 'GET_ACTIVITY_REQUEST';
export const GET_ACTIVITY_SUCCESS = 'GET_ACTIVITY_SUCCESS';
export const GET_ACTIVITY_FAILURE = 'GET_ACTIVITY_FAILURE';

export function getActivity(id) {
    return {
        [CALL_API]: {
            types: [ GET_ACTIVITY_REQUEST, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE ],
            endpoint: 'Activity.get',
            payload: [ id ],
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
export function createActivity(activity) {
    return {
        [CALL_API]: {
            types: [ CREATE_ACTIVITY_REQUEST, CREATE_ACTIVITY_SUCCESS, CREATE_ACTIVITY_FAILURE ],
            endpoint: 'Activity.create',
            payload: [activity],
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
export function updateActivity(activity) {
    return {
        [CALL_API]: {
            types: [ UPDATE_ACTIVITY_REQUEST, UPDATE_ACTIVITY_SUCCESS, UPDATE_ACTIVITY_FAILURE ],
            endpoint: 'Activity.update',
            payload: [activity],
            schema: Schemas.activity,
        }
    }
}


/*
 * Get descriptions (Identification form)
 */
export const GET_DESCRIPTIONS_REQUEST = 'GET_DESCRIPTIONS_REQUEST';
export const GET_DESCRIPTIONS_SUCCESS = 'GET_DESCRIPTIONS_SUCCESS';
export const GET_DESCRIPTIONS_FAILURE = 'GET_DESCRIPTIONS_FAILURE';

export function getDescriptions(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_DESCRIPTIONS_REQUEST, GET_DESCRIPTIONS_SUCCESS, GET_DESCRIPTIONS_FAILURE ],
            endpoint: 'Activity.getDescriptions',
            payload: [ activityId ],
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
export function createDescription(activityId, description) {
    return {
        [CALL_API]: {
            types: [ CREATE_DESCRIPTION_REQUEST, CREATE_DESCRIPTION_SUCCESS, CREATE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.createDescription',
            payload: [ activityId, description ],
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
export function updateDescription(activityId, id, description) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_DESCRIPTION_REQUEST, UPDATE_DESCRIPTION_SUCCESS, UPDATE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.updateDescription',
            payload: [ activityId, id, description ],
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
export function deleteDescription(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_DESCRIPTION_REQUEST, DELETE_DESCRIPTION_SUCCESS, DELETE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.deleteDescription',
            payload: [ activityId, id ]
        }
    }
}


/*
 * Get Dates (BasicInformation form)
 */
export const GET_DATES_REQUEST = 'GET_DATES_REQUEST';
export const GET_DATES_SUCCESS = 'GET_DATES_SUCCESS';
export const GET_DATES_FAILURE = 'GET_DATES_FAILURE';

export function getDates(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_DATES_REQUEST, GET_DATES_SUCCESS, GET_DATES_FAILURE ],
            endpoint: 'Activity.getDates',
            payload: [ activityId ],
            schema: arrayOf(Schemas.date),
        }
    }
}

/*
 * Create date (BasicInformation form)
 */
export const CREATE_DATE_REQUEST = 'CREATE_DATE_REQUEST';
export const CREATE_DATE_SUCCESS = 'CREATE_DATE_SUCCESS';
export const CREATE_DATE_FAILURE = 'CREATE_DATE_FAILURE';
export function createDate(activityId, date) {
    return {
        [CALL_API]: {
            types: [ CREATE_DATE_REQUEST, CREATE_DATE_SUCCESS, CREATE_DATE_FAILURE ],
            endpoint: 'Activity.createDate',
            payload: [ activityId, date ],
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
export function updateDate(activityId, id, date) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_DATE_REQUEST, UPDATE_DATE_SUCCESS, UPDATE_DATE_FAILURE ],
            endpoint: 'Activity.updateDate',
            payload: [ activityId, id, date ],
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
export function deleteDate(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_DATE_REQUEST, DELETE_DATE_SUCCESS, DELETE_DATE_FAILURE ],
            endpoint: 'Activity.deleteDate',
            payload: [ activityId, id ]
        }
    }
}


/*
 * Get Status (BasicInformation form)
 */
export const GET_STATUS_REQUEST = 'GET_STATUS_REQUEST';
export const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS';
export const GET_STATUS_FAILURE = 'GET_STATUS_FAILURE';

export function getStatus(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_STATUS_REQUEST, GET_STATUS_SUCCESS, GET_STATUS_FAILURE ],
            endpoint: 'Activity.getStatus',
            payload: [ activityId ],
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
export function createStatus(activityId, status) {
    return {
        [CALL_API]: {
            types: [ CREATE_STATUS_REQUEST, CREATE_STATUS_SUCCESS, CREATE_STATUS_FAILURE ],
            endpoint: 'Activity.createStatus',
            payload: [ activityId, status ],
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
export function updateStatus(activityId, id, status) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_STATUS_REQUEST, UPDATE_STATUS_SUCCESS, UPDATE_STATUS_FAILURE ],
            endpoint: 'Activity.updateStatus',
            payload: [ activityId, id, status ],
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
export function deleteStatus(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_STATUS_REQUEST, DELETE_STATUS_SUCCESS, DELETE_STATUS_FAILURE ],
            endpoint: 'Activity.deleteStatus',
            payload: [ activityId, id ]
        }
    }
}


/*
 * Get Contact (BasicInformation form)
 */
export const GET_CONTACT_REQUEST = 'GET_CONTACT_REQUEST';
export const GET_CONTACT_SUCCESS = 'GET_CONTACT_SUCCESS';
export const GET_CONTACT_FAILURE = 'GET_CONTACT_FAILURE';

export function getContact(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_CONTACT_REQUEST, GET_CONTACT_SUCCESS, GET_CONTACT_FAILURE ],
            endpoint: 'Activity.getContact',
            payload: [ activityId ],
            schema: arrayOf(Schemas.contact),
        }
    }
}

/*
 * Create contact (BasicInformation form)
 */
export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';
export function createContact(activityId, contact) {
    return {
        [CALL_API]: {
            types: [ CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_FAILURE ],
            endpoint: 'Activity.createContact',
            payload: [ activityId, contact ],
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
export function updateContact(activityId, id, contact) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE ],
            endpoint: 'Activity.updateContact',
            payload: [ activityId, id, contact ],
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
export function deleteContact(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE ],
            endpoint: 'Activity.deleteContact',
            payload: [ activityId, id ]
        }
    }
}

/*
 * Get Transaction (Financial form)
 */
export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST';
export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS';
export const GET_TRANSACTION_FAILURE = 'GET_TRANSACTION_FAILURE';

export function getTransactions(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_FAILURE ],
            endpoint: 'Activity.getTransaction',
            payload: [ activityId ],
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
export function createTransaction(activityId, transaction) {
    return {
        [CALL_API]: {
            types: [ CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAILURE ],
            endpoint: 'Activity.createTransaction',
            payload: [ activityId, transaction ],
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
export function updateTransaction(activityId, id, transaction) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_TRANSACTION_REQUEST, UPDATE_TRANSACTION_SUCCESS, UPDATE_TRANSACTION_FAILURE ],
            endpoint: 'Activity.updateTransaction',
            payload: [ activityId, id, transaction ],
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
export function deleteTransaction(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_TRANSACTION_REQUEST, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAILURE ],
            endpoint: 'Activity.deleteTransaction',
            payload: [ activityId, id ]
        }
    }
}


/*
 * Get Budget (Financial form)
 */
export const GET_BUDGET_REQUEST = 'GET_BUDGET_REQUEST';
export const GET_BUDGET_SUCCESS = 'GET_BUDGET_SUCCESS';
export const GET_BUDGET_FAILURE = 'GET_BUDGET_FAILURE';

export function getBudgets(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_BUDGET_REQUEST, GET_BUDGET_SUCCESS, GET_BUDGET_FAILURE ],
            endpoint: 'Activity.getBudget',
            payload: [ activityId ],
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
export function createBudget(activityId, budget) {
    return {
        [CALL_API]: {
            types: [ CREATE_BUDGET_REQUEST, CREATE_BUDGET_SUCCESS, CREATE_BUDGET_FAILURE ],
            endpoint: 'Activity.createBudget',
            payload: [ activityId, budget ],
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
export function updateBudget(activityId, id, budget) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_BUDGET_REQUEST, UPDATE_BUDGET_SUCCESS, UPDATE_BUDGET_FAILURE ],
            endpoint: 'Activity.updateBudget',
            payload: [ activityId, id, budget ],
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
export function deleteBudget(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_BUDGET_REQUEST, DELETE_BUDGET_SUCCESS, DELETE_BUDGET_FAILURE ],
            endpoint: 'Activity.deleteBudget',
            payload: [ activityId, id ]
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

export function addBasicInformation(activity) {
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

export function addBasicInformationDescription(formData, activity) {
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

export function addBasicInformationStatus(formData, activity) {
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

export function addBasicInformationDate(formData, activity) {
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

export function addBasicInformationContact(formData, activity) {
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

export function getParticipatingOrganisations(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_PARTICIPATING_ORGANISATIONS_REQUEST, GET_PARTICIPATING_ORGANISATIONS_SUCCESS, GET_PARTICIPATING_ORGANISATIONS_FAILURE ],
            endpoint: 'Activity.getParticipatingOrganisations',
            payload: [ activityId ],
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
export function createParticipatingOrganisation(activityId, participating_organisation) {
    return {
        [CALL_API]: {
            types: [ CREATE_PARTICIPATING_ORGANISATION_REQUEST, CREATE_PARTICIPATING_ORGANISATION_SUCCESS, CREATE_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.createParticipatingOrganisation',
            payload: [ activityId, participating_organisation ],
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
export function updateParticipatingOrganisation(activityId, id, participating_organisation) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_PARTICIPATING_ORGANISATION_REQUEST, UPDATE_PARTICIPATING_ORGANISATION_SUCCESS, UPDATE_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.updateParticipatingOrganisation',
            payload: [ activityId, id, participating_organisation ],
            schema: Schemas.participating_organisation,
        }
    }
}


/*
 * Delete participating_organisation (Identification form)
 */
export const DELETE_PARTICIPATING_ORGANISATION_REQUEST = 'DELETE_PARTICIPATING_ORGANISATION_REQUEST';
export const DELETE_PARTICIPATING_ORGANISATION_SUCCESS = 'DELETE_PARTICIPATING_ORGANISATION_SUCCESS';
export const DELETE_PARTICIPATING_ORGANISATION_FAILURE = 'DELETE_PARTICIPATING_ORGANISATION_FAILURE';
export function deleteParticipatingOrganisation(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_PARTICIPATING_ORGANISATION_REQUEST, DELETE_PARTICIPATING_ORGANISATION_SUCCESS, DELETE_PARTICIPATING_ORGANISATION_FAILURE ],
            endpoint: 'Activity.deleteParticipatingOrganisation',
            payload: [ activityId, id ]
        }
    }
}

/*
 * Get recipientCountries (Identification form)
 */
export const GET_RECIPIENT_COUNTRIES_REQUEST = 'GET_RECIPIENT_COUNTRIES_REQUEST';
export const GET_RECIPIENT_COUNTRIES_SUCCESS = 'GET_RECIPIENT_COUNTRIES_SUCCESS';
export const GET_RECIPIENT_COUNTRIES_FAILURE = 'GET_RECIPIENT_COUNTRIES_FAILURE';

export function getRecipientCountries(activityId) {
    return {
        [CALL_API]: {
            types: [ GET_RECIPIENT_COUNTRIES_REQUEST, GET_RECIPIENT_COUNTRIES_SUCCESS, GET_RECIPIENT_COUNTRIES_FAILURE ],
            endpoint: 'Activity.getRecipientCountries',
            payload: [ activityId ],
            schema: arrayOf(Schemas.recipientCountry),
        }
    }
}

/*
 * Create recipientCountry (Identification form)
 */
export const CREATE_RECIPIENT_COUNTRY_REQUEST = 'CREATE_RECIPIENT_COUNTRY_REQUEST';
export const CREATE_RECIPIENT_COUNTRY_SUCCESS = 'CREATE_RECIPIENT_COUNTRY_SUCCESS';
export const CREATE_RECIPIENT_COUNTRY_FAILURE = 'CREATE_RECIPIENT_COUNTRY_FAILURE';
export function createRecipientCountry(activityId, recipientCountry) {
    return {
        [CALL_API]: {
            types: [ CREATE_RECIPIENT_COUNTRY_REQUEST, CREATE_RECIPIENT_COUNTRY_SUCCESS, CREATE_RECIPIENT_COUNTRY_FAILURE ],
            endpoint: 'Activity.createRecipientCountry',
            payload: [ activityId, recipientCountry ],
            schema: Schemas.recipientCountry,
        }
    }
}

/*
 * Update recipientCountry (Identification form)
 */
export const UPDATE_RECIPIENT_COUNTRY_REQUEST = 'UPDATE_RECIPIENT_COUNTRY_REQUEST';
export const UPDATE_RECIPIENT_COUNTRY_SUCCESS = 'UPDATE_RECIPIENT_COUNTRY_SUCCESS';
export const UPDATE_RECIPIENT_COUNTRY_FAILURE = 'UPDATE_RECIPIENT_COUNTRY_FAILURE';
export function updateRecipientCountry(activityId, id, recipientCountry) {
    return {
        id,
        [CALL_API]: {
            types: [ UPDATE_RECIPIENT_COUNTRY_REQUEST, UPDATE_RECIPIENT_COUNTRY_SUCCESS, UPDATE_RECIPIENT_COUNTRY_FAILURE ],
            endpoint: 'Activity.updateRecipientCountry',
            payload: [ activityId, id, recipientCountry ],
            schema: Schemas.recipientCountry,
        }
    }
}


/*
 * Delete recipientCountry (Identification form)
 */
export const DELETE_RECIPIENT_COUNTRY_REQUEST = 'DELETE_RECIPIENT_COUNTRY_REQUEST';
export const DELETE_RECIPIENT_COUNTRY_SUCCESS = 'DELETE_RECIPIENT_COUNTRY_SUCCESS';
export const DELETE_RECIPIENT_COUNTRY_FAILURE = 'DELETE_RECIPIENT_COUNTRY_FAILURE';
export function deleteRecipientCountry(activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [ DELETE_RECIPIENT_COUNTRY_REQUEST, DELETE_RECIPIENT_COUNTRY_SUCCESS, DELETE_RECIPIENT_COUNTRY_FAILURE ],
            endpoint: 'Activity.deleteRecipientCountry',
            payload: [ activityId, id ]
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

export function addParticipatingOrganisation(formData, activity) {
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

export function addDocumentLink(formData, activity) {
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

export function addRelations(formData, activity) {
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

export function addPerformanceCondition(formData, activity) {
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

export function addPerformanceResult(formData, activity) {
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

export function addPerformanceComment(formData, activity) {
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

export function addFinancialBudgets(formData, activity) {
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

export function addFinancialPlannedDisbursements(formData, activity) {
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

export function addFinancialTransactions(formData, activity) {
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

export function addFinancialCapitalSpend(formData, activity) {
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

export function addGeopoliticalCountry(formData, activity) {
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

export function addGeopoliticalRegion(formData, activity) {
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

export function addGeopoliticalLocation(formData, activity) {
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

export function addClassificationSector(formData, activity) {
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

export function addClassificationPolicy(formData, activity) {
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

export function addClassificationSelect(formData, activity) {
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

export function addClassificationCountryBudget(formData, activity) {
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

export function addClassificationHumanitarian(formData, activity) {
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
