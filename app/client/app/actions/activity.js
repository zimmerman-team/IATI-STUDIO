
/*
 * Async actions
 */

import { CALL_API } from '../middleware/api'


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
            payload: [activity]
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
            payload: [activity]
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
            payload: [ activityId, description ]
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
        [CALL_API]: {
            types: [ UPDATE_DESCRIPTION_REQUEST, UPDATE_DESCRIPTION_SUCCESS, UPDATE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.updateDescription',
            payload: [ activityId, id, description ]
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
        [CALL_API]: {
            types: [ DELETE_DESCRIPTION_REQUEST, DELETE_DESCRIPTION_SUCCESS, DELETE_DESCRIPTION_FAILURE ],
            endpoint: 'Activity.deleteDescription',
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
  return {
    [CALL_API]: {
      types: [ ADD_RELATIONS_REQUEST, ADD_RELATIONS_SUCCESS, ADD_RELATIONS_FAILURE ],
      endpoint: 'Activity.addRelations',
      payload: [formData, activity]
    }
  }
}
