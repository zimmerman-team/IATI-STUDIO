
/*
 * Async actions
 */

import { CALL_API } from '../middleware/api'


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
            endpoint: 'Activity.addActivity',
            payload: [activity]
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

export function addDocumentLink(activity) {
    return {
        [CALL_API]: {
            types: [ ADD_DOCUMENT_LINK_REQUEST, ADD_DOCUMENT_LINK_SUCCESS, ADD_DOCUMENT_LINK_FAILURE ],
            endpoint: 'Activity.addDocumentLink',
            payload: [activity]
        }
    }
}


//FORM VALIDATION

export const navigation = [{
  page: 0,
  navHeading: 'Identification',
  subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
    {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
  link: '/publisher/activity/identification',
},
  {
    page: 1,
    navHeading: 'Basic information',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/basic-info',
  },
  {
    page: 2,
    navHeading: 'Participating organisations',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/participating-organisation',
  },
  {
    page: 3,
    navHeading:'Geopolitical information',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/geopolitical-information',
  },
  {
    page: 4,
    navHeading:'Classifications',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/classifications',
  },
  {
    page: 5,
    navHeading: 'Financial',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/financial',
  },
  {
    page: 6,
    navHeading: 'Documents',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/document-link',
  },
  {
    page: 7,
    navHeading: 'Relations',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/relations',
  },
  {
    page: 8,
    navHeading: 'Performance',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/performance',
  }
];

const FIELD_BLANK = 'FIELD_BLANK';
const FIELD_VALID = 'FIELD_VALID';
const FIELD_INVALID = 'FIELD_INVALID';
const NAV_VALIDATION_CLASS = 'fa fa-check valid-nav';
const NAV_INVALIDATION_CLASS = 'fa fa-times invalid-nav';

export function getBasicInformationData(form, page) {

  const activityForms = Object.keys(form);
  let result = [];

  activityForms.map((activityForm, index) => {
    if (activityForm.indexOf(page) > -1) {
      const subHeading = {field: '', status: FIELD_BLANK, navValidationClass: ''};
      const title = activityForm.replace(`${page}-`, "");
      const syncError = form[activityForm].syncErrors;

      subHeading.field = title;
      subHeading.status = (syncError && syncError.type) ? FIELD_INVALID : FIELD_VALID;
      subHeading.navValidationClass = (syncError && syncError.type) ? NAV_INVALIDATION_CLASS : NAV_VALIDATION_CLASS;
      result.push(subHeading);
    }
  });
  return result;
}


export const ACTIVITY_FORM_VALIDATION_REQUEST = 'ACTIVITY_FORM_VALIDATION_REQUEST';
export const ACTIVITY_FORM_VALIDATION_SUCCESS = 'ACTIVITY_FORM_VALIDATION_SUCCESS';
export const ACTIVITY_FORM_VALIDATION_FAILURE = 'ACTIVITY_FORM_VALIDATION_FAILURE';

export function validateForm(formData, validationErrors) {
  return {
    type: ACTIVITY_FORM_VALIDATION_SUCCESS,
    formData: formData,
    validationErrors: validationErrors,
  }
}

export function invalidateForm(formData, validationErrors) {
  return {
    type: ACTIVITY_FORM_VALIDATION_FAILURE,
    formData: formData,
    validationErrors: validationErrors,
  }
}
