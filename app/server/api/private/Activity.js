"use strict"

import { postActivity, getCodeListItems, postActivityDescriptionForm, postParticipatingOrganisationForm, postDocumentLinkForm, postRelationForm} from '../../oipa/activity'

var ActivityAPI = {

    addActivity: function(user, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postActivity(form)
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
