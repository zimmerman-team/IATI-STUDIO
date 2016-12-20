"use strict";
/*
 * Functions for communicating with activity API
 */

import _ from 'lodash'
import path from 'path'
import querystring from 'querystring'
import config from '../config/config'
import { oipaPost, oipaGet, oipaDelete } from '../config/request'

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
        parsedBody => parsedBody.results
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
        url: config.description_url(activityId),
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postDescription = function (activityId, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.description_url(activityId),
        body: descriptionData,
    };

    return oipaPost(req_options)
};

export const updateDescription = function (activityId, id, descriptionData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.description_url(activityId), id),
        body: descriptionData,
    };

    return oipaUpdate(req_options)
};

export const deleteDescription = function (activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.description_url(activityId), id),
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
