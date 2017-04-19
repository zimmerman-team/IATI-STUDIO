
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
    "reportingOrganisationUrl": (pid, oid) => `/api/publishers/${pid}/organisations/${oid}/reporting_organisations/`,
    "totalBudgetUrl": (pid, oid) => `/api/publishers/${pid}/organisations/${oid}/total_budgets/`,

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


export const getReportingOrganisations = function (user, publisherId, organisationId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.reportingOrganisationUrl(publisherId, organisationId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postReportingOrganisation = function (user, publisherId, organisationId, data) {

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.reportingOrganisationUrl(publisherId, organisationId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: data,
    };


    return oipaPost(req_options)
};

export const updateReportingOrganisation = function (user, publisherId, organisationId, id, data) {

    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(urls.reportingOrganisationUrl(publisherId, organisationId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: data,
    };

    return oipaUpdate(req_options)
};

export const deleteReportingOrganisation = function (user, publisherId, organisationId, id) {

    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(urls.reportingOrganisationUrl(publisherId, organisationId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};



export const getTotalBudgets = function (user, publisherId, organisationId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.totalBudgetUrl(publisherId, organisationId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const postTotalBudget = function (user, publisherId, organisationId, data) {

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: urls.totalBudgetUrl(publisherId, organisationId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: data,
    };


    return oipaPost(req_options)
};

export const updateTotalBudget = function (user, publisherId, organisationId, id, data) {

    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(urls.totalBudgetUrl(publisherId, organisationId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: data,
    };

    return oipaUpdate(req_options)
};

export const deleteTotalBudget = function (user, publisherId, organisationId, id) {

    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(urls.totalBudgetUrl(publisherId, organisationId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

