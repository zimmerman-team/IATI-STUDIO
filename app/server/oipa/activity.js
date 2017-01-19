"use strict";
/*
 * Functions for communicating with activity API
 */

import path from 'path'
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
        body: activityData,
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
        body: activityDataJSON,
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
    const dateJSON = JSON.parse(descriptionData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.descriptionUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dateJSON,
    };

    return oipaPost(req_options)
};

export const updateDescription = function (user, publisherId, activityId, id, descriptionData) {
    const dateJSON = JSON.parse(descriptionData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.descriptionUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dateJSON,
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
    const dataJSON = JSON.parse(participating_organisationData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.participatingOrganisationUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updateParticipatingOrganisation = function (user, publisherId, activityId, id, participating_organisationData) {
    const dataJSON = JSON.parse(participating_organisationData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.participatingOrganisationUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
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


export const postDate = function (user, publisherId, activityId, dateData) {
    const dataJSON = JSON.parse(dateData);

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.date_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updateDate = function (user, publisherId, activityId, id, dateData) {
    const dateJSON = JSON.parse(dateData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.date_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dateJSON,
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

export const postRecipientCountry = function (user, publisherId, activityId, recipientCountryData) {
    const countryDataJSON = JSON.parse(recipientCountryData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.recipientCountryUrl(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: countryDataJSON,
    };

    return oipaPost(req_options)
};

export const updateRecipientCountry = function (user, publisherId, activityId, id, recipientCountryData) {
    const countryDataJSON = JSON.parse(recipientCountryData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.recipientCountryUrl(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: countryDataJSON,
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


export const getRegions = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.recipient_regions_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};


export const postRegion = function (user, publisherId, activityId, regionData) {
    const dataJSON = JSON.parse(regionData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.recipient_regions_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updateRegion = function (user, publisherId, activityId, id, regionData) {
    const dataJSON = JSON.parse(regionData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.recipient_regions_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaUpdate(req_options)
};

export const deleteRegion = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.recipient_regions_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const postLocation = function (user, publisherId, activityId, locationData) {
    const dataJSON = JSON.parse(locationData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.locations_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<postLocation', locationData);

    return oipaPost(req_options)
};

export const updateLocation = function (user, publisherId, activityId, id, locationData) {
    const dataJSON = JSON.parse(locationData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.locations_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<update location', locationData);

    return oipaUpdate(req_options)
};

export const deleteLocation = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.locations_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const getSectors = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.sectors_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};


export const postSector = function (user, publisherId, activityId, sectorData) {
    const dataJSON = JSON.parse(sectorData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.sectors_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updateSector = function (user, publisherId, activityId, id, sectorData) {
    const dataJSON = JSON.parse(sectorData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.sectors_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaUpdate(req_options)
};

export const deleteSector = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.sectors_url(publisherId, activityId), `${id}`),
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
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};


export const postPolicy = function (user, publisherId, activityId, policyData) {
    const dataJSON = JSON.parse(policyData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.policy_markers_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updatePolicy = function (user, publisherId, activityId, id, policyData) {
    const dataJSON = JSON.parse(policyData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.policy_markers_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
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


export const postBudget = function (user, publisherId, activityId, budgetData) {
    const dataJSON = JSON.parse(budgetData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.budgets_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<<post budget', budgetData);

    return oipaPost(req_options)
};

export const updateBudget = function (user, publisherId, activityId, id, budgetData) {
    const dataJSON = JSON.parse(budgetData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.budgets_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<<update budget', budgetData);

    return oipaUpdate(req_options)
};

export const deleteBudget = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.budgets_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const getHumanitarianScope = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.humanitarian_scopes_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};


export const postHumanitarianScope = function (user, publisherId, activityId, humanitarianScopeData) {
    const dataJSON = JSON.parse(humanitarianScopeData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.humanitarian_scopes_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<postHumanitarianScope', humanitarianScopeData);

    return oipaPost(req_options)
};

export const updateHumanitarianScope = function (user, publisherId, activityId, id, humanitarianScopeData) {
    const dataJSON = JSON.parse(humanitarianScopeData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.humanitarian_scopes_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    console.log('<<<updateHumanitarianScope', humanitarianScopeData);
    return oipaUpdate(req_options)
};

export const deleteHumanitarianScope = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.humanitarian_scopes_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const postContact = function (user, publisherId, activityId, contactData) {
    const dataJSON = JSON.parse(contactData);
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.contact_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<contactData1 ', contactData);

    return oipaPost(req_options)
};

export const updateContact = function (user, publisherId, activityId, id, contactData) {
    const dataJSON = JSON.parse(contactData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.contact_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };
    console.log('<<<contactData2 ', contactData);

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
    const dataJSON = JSON.parse(documentLinkData);

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.document_link_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
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


export const getRelation = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.related_activities_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};


export const postRelation = function (user, publisherId, activityId, relationData) {
    const dataJSON = JSON.parse(relationData);
    console.log("asd",dataJSON)
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.related_activities_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updateRelation = function (user, publisherId, activityId, id, relationData) {
    const dataJSON = JSON.parse(relationData);
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.related_activities_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaUpdate(req_options)
};

export const deleteRelation = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.related_activities_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const getPerformanceCondition = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.conditions_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};


export const createPerformanceCondition = function (user, publisherId, activityId, conditionData) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.conditions_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: conditionData,
    };

    return oipaPost(req_options)
};

export const updatePerformanceCondition = function (user, publisherId, activityId, id, conditionData) {
    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.conditions_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: conditionData,
    };

    return oipaUpdate(req_options)
};

export const deletePerformanceCondition = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.conditions_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const getPerformanceResult = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.results_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const createPerformanceResult = function (user, publisherId, activityId, resultData) {
    const dataJSON = JSON.parse(resultData);

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.results_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updatePerformanceResult = function (user, publisherId, activityId, id, resultData) {
    const dataJSON = JSON.parse(resultData);

    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.results_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaUpdate(req_options)
};

export const deletePerformanceResult = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.results_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};

export const getPerformanceComment = function (user, publisherId, activityId) {
    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.comments_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaGet(req_options)
        .then(parsedBody => parsedBody.results)
};

export const createPerformanceComment = function (user, publisherId, activityId, resultData) {
    const dataJSON = JSON.parse(resultData);

    const req_options = {
        baseUrl: config.oipa_post_url,
        url: config.comments_url(publisherId, activityId),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaPost(req_options)
};

export const updatePerformanceComment = function (user, publisherId, activityId, id, resultData) {
    const dataJSON = JSON.parse(resultData);

    const req_options = {
        baseUrl: config.oipa_update_url,
        url: path.join(config.comments_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
        body: dataJSON,
    };

    return oipaUpdate(req_options)
};

export const deletePerformanceComment = function (user, publisherId, activityId, id) {
    const req_options = {
        baseUrl: config.oipa_delete_url,
        url: path.join(config.comments_url(publisherId, activityId), `${id}`),
        headers: {
            'Authorization': 'Token ' + user.oipaToken
        },
    };

    return oipaDelete(req_options)
};
