"use strict"

import { 
    getActivity,
    postActivity,
    getCodeListItems,
    postActivityDescriptionForm,
    postParticipatingOrganisationForm,
    postDocumentLinkForm,
    postRelationForm,
} from '../../oipa/activity'

import * as oipaMethods from '../../oipa/activity'

var ActivityAPI = {

    get: function(user, id, res) {
        return getActivity(id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    create: function(user, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postActivity(form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    update: function(user, id, form, res) {
        // TODO: update validation status here - 2016-12-16
        return updateActivity(id, form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getDescriptions: function(user, activityId, res) {
        return oipaMethods.getDescriptions(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createDescription: function(user, activityId, data, res) {
        return oipaMethods.createDescription(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateDescription: function(user, activityId, id, data, res) {
        return oipaMethods.updateDescription(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteDescription: function(user, activityId, id, res) {
        return oipaMethods.deleteDescription(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addBasicInformation: function (user, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postActivityDescriptionForm(form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addParticipatingOrganisation: function (user, form, activity, res) {
        // TODO: update validation status here - 2016-12-16
        return postParticipatingOrganisationForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addDocumentLink: function (user, form, activity, res) {
        // TODO: update validation status here - 2016-12-16
        return postDocumentLinkForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addRelations: function (user, form, activity, res) {
        // TODO: update validation status here - 2016-12-16
        return postRelationForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getCodeListItems: function(user, codeListType, res) {
        // TODO: update validation status here - 2016-12-16
        return getCodeListItems(codeListType)
            .then(languages => res(null, languages))
            .catch((error) => res(error));
    },

};

module.exports = ActivityAPI;
