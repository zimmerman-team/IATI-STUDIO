
"use strict";

/*
 * Functions for communicating with organisation API
 */

import path from 'path'
import config from '../config/config'
import { oipaExport, oipaPost, oipaGet, oipaUpdate, oipaDelete } from '../config/request'
import _ from 'lodash'

const querystring = require('querystring')

const urls = {
    "publishOrganisationsUrl": (pid) => `/api/datasets/${pid}/publish_organisations/`,
    "publishOrganisationsUpdateUrl": (pid, datasetId) => `/api/datasets/${pid}/publish_organisations/${datasetId}`,
    "organisationsUrl": (pid) => `/api/publishers/${pid}/organisations/`,

}

export const publishOrganisations = function (user, publisherId, sourceUrl) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.publishOrganisationsUrl(publisherId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: {
            'source_url': sourceUrl
        }
    };

    return oipaPost(req_options)
};


export const publishOrganisationsUpdate = function (user, publisherId, sourceUrl, datasetId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.publishOrganisationsUpdateUrl(publisherId, datasetId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: {
            'source_url': sourceUrl
        }
    };

    return oipaUpdate(req_options)
};

export const markReadyToPublish = function (user, publisherId, organisationId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: path.join(urls.organisationsUrl(publisherId), organisationId, 'mark_ready_to_publish'),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaPost(req_options)
};

export const getOrganisations = function (user, publisherId, getArgs={}) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.organisationsUrl(publisherId) + '?' + querystring.stringify({
            ...getArgs,
        }),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        // .then(parsedBody => parsedBody.results)
        // .then(parsedBody)
};

export const getOrganisation = function (user, publisherId, id) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: path.join(urls.organisationsUrl(publisherId), id),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
};

export const postOrganisation = function (user, publisherId, organisationData) {
    if (organisationData.conditions) {
        organisationData.conditions.organisation = organisationData.id;
    }

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.organisationsUrl(publisherId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: organisationData,
    };

    return oipaPost(req_options)
};

export const updateOrganisation = function (user, publisherId, id, organisationData) {

    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(urls.organisationsUrl(publisherId), `${id}`) + '/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: organisationData,
    };

    return oipaUpdate(req_options)
};

export const deleteOrganisation = function (user, publisherId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(urls.organisationsUrl(publisherId), `${id}`) + '/',
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

