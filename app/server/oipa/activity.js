"use strict";
/*
 * Functions for communicating with activity API
 */

import _ from 'lodash'
import path from 'path'
import querystring from 'querystring'
import config from '../config/config'
import { oipaPost, oipaGet, oipaUpdate, oipaDelete } from '../config/request'

/**
 * Get all the languages form codeList.
 *
 * @param codeListName
 * @returns {Promise|Promise.<T>}
 */
export const getCodeListItems = function (codeListName) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: path.join(config.codelists, codeListName, '/?page_size=200'),
    };

    return oipaGet(req_options).then(
        parsedBody => parsedBody
    )
};

export const getActivities = function (user, publisherId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const getActivity = function (user, publisherId, id) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: path.join(config.activities_url(publisherId), id),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
};

export const postActivity = function (user, publisherId, activityData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: prepareActivityData(activityData),
    };

    return oipaPost(req_options)
};

export const updateActivity = function (user, publisherId, activityData) {
    const activityDataJSON = JSON.parse(activityData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.activities_url(publisherId), `${activityDataJSON.id}/`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: prepareActivityData(activityDataJSON),
    };

    return oipaUpdate(req_options)
};

export const deleteActivity = function (user, publisherId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.activities_url(publisherId), id) + '/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getDescriptions = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postDescription = function (user, publisherId, activityId, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: descriptionData,
    };

    return oipaPost(req_options)
};

export const updateDescription = function (user, publisherId, activityId, id, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.descriptionUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: descriptionData,
    };

    return oipaUpdate(req_options)
};

export const deleteDescription = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.descriptionUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getBudgets = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postBudget = function (user, publisherId, activityId, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: descriptionData,
    };

    return oipaPost(req_options)
};

export const updateBudget = function (user, publisherId, activityId, id, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.descriptionUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: descriptionData,
    };

    return oipaUpdate(req_options)
};

export const deleteBudget = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.descriptionUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const getParticipatingOrganisations = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.participatingOrganisationUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postParticipatingOrganisation = function (user, publisherId, activityId, participating_organisationData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.participatingOrganisationUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: participating_organisationData,
    };



    return oipaPost(req_options)
};

export const updateParticipatingOrganisation = function (user, publisherId, activityId, id, participating_organisationData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.participatingOrganisationUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: participating_organisationData,
    };

    return oipaUpdate(req_options)
};

export const deleteParticipatingOrganisation = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.participatingOrganisationUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getDates = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.date_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postDate = function (user, publisherId, activityId, dateData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.date_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dateData,
    };

    return oipaPost(req_options)
};

export const updateDate = function (user, publisherId, activityId, id, dateData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.date_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dateData,
    };

    return oipaUpdate(req_options)
};

export const deleteDate = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.date_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getRecipientCountries = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.recipientCountryUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };
    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const getStatus = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.status_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postRecipientCountry = function (user, publisherId, activityId, recipientCountryData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.recipientCountryUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: recipientCountryData,
    };

    return oipaPost(req_options)
};

export const postStatus = function (user, publisherId, activityId, statusData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.status_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: statusData,
    };

    return oipaPost(req_options)
};

export const updateRecipientCountry = function (user, publisherId, activityId, id, recipientCountryData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.recipientCountryUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: recipientCountryData,
    };

    return oipaPost(req_options)
};

export const updateStatus = function (user, publisherId, activityId, id, statusData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.status_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: statusData,
    };

    return oipaUpdate(req_options)
};

export const deleteRecipientCountry = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.recipientCountryUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const deleteStatus = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.status_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getContact = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.contact_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postContact = function (user, publisherId, activityId, contactData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.contact_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: contactData,
    };

    return oipaPost(req_options)
};

export const updateContact = function (user, publisherId, activityId, id, contactData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.contact_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: contactData,
    };

    return oipaUpdate(req_options)
};

export const deleteContact = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.contact_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getDocumentLinks = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.document_link_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postDocumentLink = function (user, publisherId, activityId, documentLinkData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.document_link_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: documentLinkData,
    };

    return oipaPost(req_options)
};

export const updateDocumentLink = function (user, publisherId, activityId, id, documentLinkData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.document_link_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: documentLinkData,
    };

    return oipaUpdate(req_options)
};

export const deleteDocumentLink = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.document_link_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};


export const getPolicy = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.policy_markers_url(publisherId, activityId),
        /*headers: {
            'Authorization': 'Token ' + user.oipaToken
        },*/
    };
    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postPolicy = function (user, publisherId, activityId, policyData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.policy_markers_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: policyData,
    };

    return oipaPost(req_options)
};

export const updatePolicy = function (user, publisherId, activityId, id, policyData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.policy_markers_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: policyData,
    };

    return oipaUpdate(req_options)
};

export const deletePolicy = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.policy_markers_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

/**
 * Post basic information description section form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
//@todo: Change it to a promise pass it to promise.all.
export const postActivityDescriptionForm = function (user, publisherId, formData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + 'test32' + '/descriptions/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: prepareActivityData(formData),
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};


/**
 * Post Participating organisations form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postParticipatingOrganisationForm = function (user, publisherId, formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activityID + '/participating_organisations/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: formData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Prepare data (formatting) of identification form
 * for POST.
 *
 * @param data
 * @returns {*}
 */
const prepareActivityData = function (data) {
    // const title = {
    //   text: data.textTitle,
    //   language: data.titleLanguage
    // };

    // const narrativesItems = [];
    // narrativesItems.push(title);

    // if (data.additionalTitles) {
    //   data.additionalTitles.map((title, index) => narrativesItems.push(title));
    // }

  // data.title = {narratives: narrativesItems};
  return data
}

/**
 * Post document link form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postDocumentLinkForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);

  const ISO_DATE = new Date(formData.document_date).toISOString();
  processedData.type = { code: formData.type, name: formData.type };
  processedData.format = { code: formData.format, name: formData.format };
  processedData.activity = formData.activity;
  processedData.categories = [];
  processedData.document_date = {"iso_date": ISO_DATE};
  processedData.title = {"narratives": []};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + processedData.activity + '/document_links/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: prepareActivityData(processedData),
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post relations form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postRelationForm = function (user, publisherId, formData, activity) {
  const processedData = {
    activity: formData.activityIdentifier,
    ref: formData.activityIdentifier,
    type: {
      code: formData.relatedActivityType,
      name: formData.relatedActivityType
    }
  };

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/related_activities/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post performance conditions form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postPerformanceConditionForm = function (user, publisherId, formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/conditions/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: formData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post performance conditions form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postPerformanceResultForm = function (user, publisherId, formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/results/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: formData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post performance conditions form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postPerformanceCommentForm = function (user, publisherId, formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/comments/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: formData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post basic info description form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postBasicInformationDescriptionForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.narratives = [{"code": formData.narratives, "name": formData.narratives}];
    //processedData.activity;
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + processedData.activity + '/descriptions/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post basic info status form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postBasicInformationStatusForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + processedData.activity + '/activity_status/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post basic info date form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postBasicInformationDateForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.iso_date = new Date(processedData.iso_date).toISOString();
    processedData.type = {"code": formData.type, "name": formData.type};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + processedData.activity + '/activity_dates/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post basic info contact form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postBasicInformationContactForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.activity = formData.activity;
    processedData.type = {"code": formData.type, "name": formData.type};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + formData.activity + '/contact_info/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post financial budget form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postFinancialBudgetsForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.status = {"code": formData.status, "name": formData.status};
    processedData.value = {};
    processedData.value.currency = {"code": formData.currency, "name": formData.currency};
    processedData.value.date = formData.valueDate;
    processedData.value.value = formData.value;

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + formData.activity + '/budgets/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post financial planned disbursements form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postFinancialPlannedDisbursementsForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.value = {"date": formData.valueDate, "currency": {"code": formData.currency, "name": formData.currency},
        "value": formData.amount};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + formData.activity+ '/planned_disbursements/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post financial transaction form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postFinancialTransactionsForm = function (user, publisherId, formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.transaction_type = {"code": formData.transaction_type, "name": formData.transaction_type};
    processedData.currency = {"code": formData.currency, "name": formData.currency};
    processedData.aid_type = {"code": formData.aid_type, "name": formData.aid_type};
    processedData.finance_type = {"code": formData.finance_type, "name": formData.finance_type};
    processedData.flow_type = {"code": formData.flow_type, "name": formData.flow_type};
    processedData.tied_status = {"code": formData.tied_status, "name": formData.tied_status};
    processedData.disbursement_channel = {"code": formData.disbursement_channel, "name": formData.disbursement_channel};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + formData.activity + '/transactions/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: processedData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post financial capital spend form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postFinancialCapitalSpendForm = function (user, publisherId, formData, activity) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url(publisherId) + formData.activity + '/capital_spend/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: formData,
    };

    return oipaPost(req_options)
        .then(parsedBody => parsedBody)
};

/**
 * Post Geopolitical Country form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postGeopoliticalCountryForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.country = {"code": formData.country.code, "name": formData.country.code};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/recipient_countries/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Geopolitical Regions form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postGeopoliticalRegionForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.region = {"code": formData.region.code, "name": formData.region.code};
  processedData.vocabulary = {"code": formData.vocabulary.code, "name": formData.vocabulary.code};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/recipient_regions/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Geopolitical Location form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postGeopoliticalLocationForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.type = {"code": formData.type, "name": formData.type};
  processedData.activity_description = {"narratives": [{"text": formData.activity_description}]};
  processedData.location_class = {"code": formData.location_class, "name": formData.location_class};
  processedData.exactness = {"code": formData.exactness, "name": formData.exactness};
  processedData.location_reach = {"code": formData.location_reach, "name": formData.location_reach};
  processedData.location_id = {"code": formData.location_code, "name": formData.location_code,
      "vocabulary": {"code": formData.location_vocabulary, "name": formData.location_vocabulary}};
  processedData.feature_designation = {"code": formData.feature_designation, "name": formData.feature_designation};
  processedData.vocabulary = {"pos": formData.vocabulary, "srsName": formData.vocabulary};
  processedData.point = {"srsName": formData.point_name, "pos": {"latitude": formData.latitude, "longitude": formData.longitude}};
  processedData.description = {"narratives": []};
  processedData.activity_description = {"narratives": []};
  processedData.name = {"narratives": []};
  processedData.narratives = [{"code": formData.narratives, "name": formData.narratives}];

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/locations/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Classification Sector form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postClassificationSectorForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.sector = {"code": formData.sector, "name": formData.sector};
  processedData.vocabulary = {"code": formData.vocabulary, "name": formData.vocabulary};
  processedData.narratives = [{"code": formData.narratives, "name": formData.narratives}];

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/sectors/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Classification Policy form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postClassificationPolicyForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.policy_marker = {"code": formData.policy.code, "name": formData.policy.code};
  processedData.vocabulary = {"code": formData.policyMarkerVocabulary.code, "name": formData.policyMarkerVocabulary.code};
  processedData.narratives = [{text: "1"}];
  processedData.significance = {"code": formData.significance.code, "name": formData.significance.code};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/policy_markers/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Classification Selection forms.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postClassificationSelectForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.iati_identifier = formData.activity;
  processedData.collaboration_type = {"code": formData.collaboration_type, "name": formData.collaboration_type};
  processedData.default_flow_type = {"code": formData.default_flow_type, "name": formData.default_flow_type};
  processedData.default_finance_type = {"code": formData.default_finance_type, "name": formData.default_finance_type};
  processedData.default_aid_type = {"code": formData.default_aid_type, "name": formData.default_aid_type};
  processedData.default_tied_status = {"code": formData.default_tied_status, "name": formData.default_tied_status};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaUpdate(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Classification Country Budget form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postClassificationCountryBudgetForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.vocabulary = {"code": formData.vocabulary, "name": formData.vocabulary};
  processedData.activity = formData.activity;

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/country_budget_items/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};

/**
 * Post Classification Humanitarian form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
export const postClassificationHumanitarianForm = function (user, publisherId, formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.vocabulary = {"code": formData.vocabulary, "name": formData.vocabulary};
  processedData.type = {"code": formData.type, "name": formData.type};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url(publisherId) + formData.activity + '/humanitarian_scopes/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};
