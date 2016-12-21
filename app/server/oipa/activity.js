"use strict";
/*
 * Functions for communicating with activity API
 */

import _ from 'lodash'
import querystring from 'querystring'
import config from '../config/config'
import {oipaPost, oipaGet} from '../config/request'

/**
 * Submit identification form data.
 *
 * @param activityData
 * @returns {Promise|Promise.<T>}
 */
export const postActivity = function (activityData) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url,
    body: prepareActivityData(activityData),
  };

  return oipaPost(req_options)
    .then(parsedBody => parsedBody)

};

/**
 * Get all the languages form codeList.
 *
 * @param codeListName
 * @returns {Promise|Promise.<T>}
 */
export const getCodeListItems = function (codeListName) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.codelists  + codeListName + '/?page_size=200',
  };

  return oipaGet(req_options).then(
    parsedBody => parsedBody
  )
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
  const title = {
    text: data.textTitle,
    language: data.titleLanguage
  };

  const narrativesItems = [];
  narrativesItems.push(title);

  if (data.additionalTitles) {
    data.additionalTitles.map((title, index) => narrativesItems.push(title));
  }

  data.title = {narratives: narrativesItems};
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
    url: config.activities_url + formData.activityIdentifier + '/related_activities/',
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
  const activityID = 666;

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + activityID + '/conditions/',
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
  const activityID = 666;

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + activityID + '/results/',
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
  const activityID = 666;

  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + activityID + '/comments/',
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
        url: config.activities_url + processedData.activityID + '/budgets/',
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
        url: config.activities_url + processedData.activityID + '/planned_disbursements/',
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
        url: config.activities_url + processedData.activityID + '/transactions/',
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
        url: config.activities_url + formData.activityID + '/capital_spend/',
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
  processedData.activity_description = {"code": formData.activity_description.code, "name": formData.activity_description.code};
  processedData.location_class = {"code": formData.location_class.code, "name": formData.location_class.code};
  processedData.exactness = {"code": formData.exactness.code, "name": formData.exactness.code};
  processedData.location_reach = {"code": formData.location_reach.code, "name": formData.location_reach.code};
  processedData.location_id = {"code": formData.location_id.code, "name": formData.location_id.code};
  processedData.feature_designation = {"code": formData.feature_designation.code, "name": formData.feature_designation.code};

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
  processedData.type = {"code": formData.type, "name": formData.type};

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
  processedData.collaboration_type = {"code": formData.collaboration_type, "name": formData.collaboration_type};
  processedData.default_flow_type = {"code": formData.default_flow_type, "name": formData.default_flow_type};
  processedData.default_finance_type = {"code": formData.default_finance_type, "name": formData.default_finance_type};
  processedData.default_aid_type = {"code": formData.default_aid_type, "name": formData.default_aid_type};
  processedData.default_tied_status = {"code": formData.default_tied_status, "name": formData.default_tied_status};

  const req_options_collaboration = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + processedData.activity + '/collaboration_type/',
    body: processedData.collaboration_type,
  };
  const req_options_flow = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + processedData.activity + '/default_flow_type/',
    body: processedData.collaboration_type,
  };
  const req_options_finance = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + processedData.activity + '/default_finance_type/',
    body: processedData.collaboration_type,
  };
  const req_options_aid = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + processedData.activity + '/default_aid_type/',
    body: processedData.collaboration_type,
  };
  const req_options_tied = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + processedData.activity + '/default_tied_status/',
    body: processedData.collaboration_type,
  };

  let parsedBodyList = [];
  parsedBodyList[0] = oipaPost(req_options_collaboration)
    .then(parsedBody => parsedBody);
  parsedBodyList[1] =  oipaPost(req_options_flow)
    .then(parsedBody => parsedBody);
  parsedBodyList[2] =  oipaPost(req_options_finance)
    .then(parsedBody => parsedBody);
  parsedBodyList[3] =  oipaPost(req_options_aid)
    .then(parsedBody => parsedBody);
  parsedBodyList[3] =  oipaPost(req_options_tied)
    .then(parsedBody => parsedBody);

  return parsedBodyList[3]
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
