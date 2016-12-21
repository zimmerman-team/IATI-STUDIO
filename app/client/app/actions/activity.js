
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
