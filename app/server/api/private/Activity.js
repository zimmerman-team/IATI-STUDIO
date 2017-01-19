"use strict"

import { getActivity, postActivity, updateActivity, getCodeListItems} from '../../oipa/activity'

import * as oipaMethods from '../../oipa/activity'

var ActivityAPI = {

    getValidationStatus: function() {
        // TODO: how will this be determined? - 2016-12-23
        
    },

    getAll: function(user, publisherId, res) {
        return oipaMethods.getActivities(user, publisherId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    get: function(user, publisherId, id, res) {
        return getActivity(user, publisherId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    create: function(user, publisherId, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postActivity(user, publisherId, form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    update: function(user, publisherId, form, res) {
        // TODO: update validation status here - 2016-12-16
        return updateActivity(user, publisherId, form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    delete: function(user, publisherId, id, res) {
        return oipaMethods.deleteActivity(user, publisherId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getDescriptions: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getDescriptions(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createDescription: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        return oipaMethods.postDescription(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateDescription: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateDescription(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteDescription: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteDescription(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createDate: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postDate(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateDate: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateDate(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteDate: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteDate(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },


    getStatus: function(user, publisherId, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getStatus(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createStatus: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postStatus(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateStatus: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateStatus(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteStatus: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteStatus(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getContact: function(user, publisherId, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getContact(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createContact: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postContact(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateContact: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateContact(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteContact: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here
        return oipaMethods.deleteContact(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getDocumentLinks: function(user, publisherId, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getDocumentLinks(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createDocumentLink: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postDocumentLink(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateDocumentLink: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateDocumentLink(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteDocumentLink: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here
        return oipaMethods.deleteDocumentLink(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getPolicy: function(user, publisherId, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getPolicy(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createPolicy: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on successful creation,
        return oipaMethods.postPolicy(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updatePolicy: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updatePolicy(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deletePolicy: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here
        return oipaMethods.deletePolicy(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getHumanitarianScope: function(user, publisherId, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getHumanitarianScope(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createHumanitarianScope: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on successful creation,
        return oipaMethods.postHumanitarianScope(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateHumanitarianScope: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateHumanitarianScope(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteHumanitarianScope: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here
        return oipaMethods.deleteHumanitarianScope(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },


    createBudget: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here
        // on successful creation,
        return oipaMethods.postBudget(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateBudget: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateBudget(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteBudget: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here
        return oipaMethods.deleteBudget(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getParticipatingOrganisations: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getParticipatingOrganisations(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createParticipatingOrganisation: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation, 
        return oipaMethods.postParticipatingOrganisation(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateParticipatingOrganisation: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateParticipatingOrganisation(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteParticipatingOrganisation: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteParticipatingOrganisation(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createRecipientCountry: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        return oipaMethods.postRecipientCountry(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateRecipientCountry: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateRecipientCountry(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteRecipientCountry: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteRecipientCountry(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getRecipientCountries: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getRecipientCountries(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getSectors: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getSectors(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createSector: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation, 
        return oipaMethods.postSector(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateSector: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateSector(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteSector: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteSector(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getRegions: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getRegions(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createRegion: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        return oipaMethods.postRegion(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateRegion: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateRegion(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteRegion: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteRegion(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getLocations: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getLocations(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createLocation: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        return oipaMethods.postLocation(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateLocation: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateLocation(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteLocation: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteLocation(user, publisherId, activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getTransactions: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getTransactions(user, publisherId, activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createTransaction: function(user, publisherId, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation,
        return oipaMethods.postTransaction(user, publisherId, activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateTransaction: function(user, publisherId, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateTransaction(user, publisherId, activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteTransaction: function(user, publisherId, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteTransaction(user, publisherId, activityId, id)
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
