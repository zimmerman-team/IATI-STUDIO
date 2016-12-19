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
    url: config.codelists + '/' + codeListName + '/?page_size=200',
  };

  return oipaGet(req_options).then(
    parsedBody => parsedBody.results
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
 * Post participating organisation form.
 *
 * @param formData
 * @returns {Promise|Promise.<T>}
 */
//@todo: Change it to a promise pass it to promise.all.
export const postParticipatingOrganisationForm = function (formData, activity) {
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + 'test32' + '/participating_organisations/',
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
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url + 'test32' + '/document_link/',
    body: prepareActivityData(formData),
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
