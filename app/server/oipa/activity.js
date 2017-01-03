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

export const getActivity = function (id) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: path.join(config.activities_url, id)
    };

    return oipaGet(req_options)
};

export const postActivity = function (activityData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url,
        body: prepareActivityData(activityData),
    };

    return oipaPost(req_options)
};

export const updateActivity = function (id, activityData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.activities_url, id),
        body: prepareActivityData(activityData),
    };

    return oipaUpdate(req_options)
};

export const deleteActivity = function (id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.activities_url, id),
    };

    return oipaDelete(req_options)
};

export const getDescriptions = function (activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(activityId),
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postDescription = function (activityId, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(activityId),
        body: descriptionData,
    };

    return oipaPost(req_options)
};

export const updateDescription = function (activityId, id, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.descriptionUrl(activityId), `${id}`),
        body: descriptionData,
    };

    return oipaUpdate(req_options)
};

export const deleteDescription = function (activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.descriptionUrl(activityId), `${id}`),
    };

    return oipaDelete(req_options)
};

export const getParticipatingOrganisations = function (activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.participatingOrganisationUrl(activityId),
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postParticipatingOrganisation = function (activityId, participating_organisationData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.participatingOrganisationUrl(activityId),
        body: participating_organisationData,
    };

    return oipaPost(req_options)
};

export const updateParticipatingOrganisation = function (activityId, id, participating_organisationData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.participatingOrganisationUrl(activityId), `${id}`),
        body: participating_organisationData,
    };

    return oipaUpdate(req_options)
};

export const deleteParticipatingOrganisation = function (activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.participatingOrganisationUrl(activityId), `${id}`),
    };

    return oipaDelete(req_options)
};


export const getDates = function (activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.date_url(activityId),
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postDate = function (activityId, dateData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.date_url(activityId),
        body: dateData,
    };

    return oipaPost(req_options)
};

export const updateDate = function (activityId, id, dateData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.date_url(activityId), `${id}`),
        body: dateData,
    };

    return oipaUpdate(req_options)
};

export const deleteDate = function (activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.date_url(activityId), `${id}`),
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
export const postActivityDescriptionForm = function (formData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + 'test32' + '/descriptions/',
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
export const postParticipatingOrganisationForm = function (formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activityID + '/participating_organisations/',
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
export const postDocumentLinkForm = function (formData, activity) {
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
    url: config.activities_url + processedData.activity + '/document_links/',
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
export const postRelationForm = function (formData, activity) {
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
    url: config.activities_url + formData.activity + '/related_activities/',
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
export const postPerformanceConditionForm = function (formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/conditions/',
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
export const postPerformanceResultForm = function (formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/results/',
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
export const postPerformanceCommentForm = function (formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/comments/',
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
export const postBasicInformationDescriptionForm = function (formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.narratives = [{"code": formData.narratives, "name": formData.narratives}];
    processedData.activity
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + processedData.activity + '/descriptions/',
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
export const postBasicInformationStatusForm = function (formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + processedData.activity + '/activity_status/',
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
export const postBasicInformationDateForm = function (formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.iso_date = new Date(processedData.iso_date).toISOString();
    processedData.type = {"code": formData.type, "name": formData.type};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + processedData.activity + '/activity_dates/',
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
export const postBasicInformationContactForm = function (formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.activity = formData.activity;
    processedData.type = {"code": formData.type, "name": formData.type};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + formData.activity + '/contact_info/',
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
export const postFinancialBudgetsForm = function (formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.status = {"code": formData.status, "name": formData.status};
    processedData.value = {};
    processedData.value.currency = {"code": formData.currency, "name": formData.currency};
    processedData.value.date = formData.valueDate;
    processedData.value.value = formData.value;

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + formData.activity + '/budgets/',
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
export const postFinancialPlannedDisbursementsForm = function (formData, activity) {
    let processedData = Object.assign({}, formData);
    processedData.type = {"code": formData.type, "name": formData.type};
    processedData.value = {"date": formData.valueDate, "currency": {"code": formData.currency, "name": formData.currency},
        "value": formData.amount};

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + formData.activity+ '/planned_disbursements/',
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
export const postFinancialTransactionsForm = function (formData, activity) {
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
        url: config.activities_url + formData.activity + '/transactions/',
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
export const postFinancialCapitalSpendForm = function (formData, activity) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.activities_url + formData.activity + '/capital_spend/',
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
export const postGeopoliticalCountryForm = function (formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.country = {"code": formData.country.code, "name": formData.country.code};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/recipient_countries/',
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
export const postGeopoliticalRegionForm = function (formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.region = {"code": formData.region.code, "name": formData.region.code};
  processedData.vocabulary = {"code": formData.vocabulary.code, "name": formData.vocabulary.code};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/recipient_regions/',
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
export const postGeopoliticalLocationForm = function (formData, activity) {
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
    url: config.activities_url + formData.activity + '/locations/',
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
export const postClassificationSectorForm = function (formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.sector = {"code": formData.sector, "name": formData.sector};
  processedData.vocabulary = {"code": formData.vocabulary, "name": formData.vocabulary};
  processedData.narratives = [{"code": formData.narratives, "name": formData.narratives}];

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/sectors/',
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
export const postClassificationPolicyForm = function (formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.policy_marker = {"code": formData.policy.code, "name": formData.policy.code};
  processedData.vocabulary = {"code": formData.policyMarkerVocabulary.code, "name": formData.policyMarkerVocabulary.code};
  processedData.narratives = [{text: "1"}];
  processedData.significance = {"code": formData.significance.code, "name": formData.significance.code};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/policy_markers/',
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
export const postClassificationSelectForm = function (formData, activity) {
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
    url: config.activities_url + formData.activity + '/',
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
export const postClassificationCountryBudgetForm = function (formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.vocabulary = {"code": formData.vocabulary, "name": formData.vocabulary};
  processedData.activity = formData.activity;

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/country_budget_items/',
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
export const postClassificationHumanitarianForm = function (formData, activity) {
  let processedData = Object.assign({}, formData);
  processedData.activity = formData.activity;
  processedData.vocabulary = {"code": formData.vocabulary, "name": formData.vocabulary};
  processedData.type = {"code": formData.type, "name": formData.type};

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + formData.activity + '/humanitarian_scopes/',
    body: processedData,
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)
};
