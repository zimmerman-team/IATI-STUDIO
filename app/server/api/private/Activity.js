"use strict"

import { getActivity, postActivity, updateActivity, getCodeListItems, postActivityDescriptionForm, postParticipatingOrganisationForm, postDocumentLinkForm,
    postRelationForm, postPerformanceConditionForm, postPerformanceResultForm, postPerformanceCommentForm,
    postFinancialBudgetsForm, postFinancialPlannedDisbursementsForm, postFinancialTransactionsForm, postFinancialCapitalSpendForm,
    postBasicInformationDescriptionForm, postBasicInformationStatusForm, postBasicInformationDateForm, postBasicInformationContactForm,
    postGeopoliticalCountryForm, postGeopoliticalRegionForm, postGeopoliticalLocationForm,
    postClassificationSectorForm, postClassificationPolicyForm, postClassificationSelectForm, postClassificationCountryBudgetForm, postClassificationHumanitarianForm,
} from '../../oipa/activity'

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
        // on succesful creation,
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

    addBasicInformation: function (user, publisherId, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postActivityDescriptionForm(user, publisherId, form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addBasicInformationDescription: function (user, publisherId, form, res) {
        return postBasicInformationDescriptionForm(user, publisherId, form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addBasicInformationStatus: function (user, publisherId, form, res) {
        return postBasicInformationStatusForm(user, publisherId, form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addBasicInformationDate: function (user, publisherId, form, res) {
        return postBasicInformationDateForm(user, publisherId, form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addBasicInformationContact: function (user, publisherId, form, res) {
        return postBasicInformationContactForm(user, publisherId, form)
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

    getRecipientCountries: function(user, publisherId, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getRecipientCountries(user, publisherId, activityId)
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

    addDocumentLink: function (user, publisherId, form, activity, res) {
        return postDocumentLinkForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addRelations: function (user, publisherId, form, activity, res) {
        // TODO: update validation status here - 2016-12-16
        return postRelationForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addPerformanceCondition: function (user, publisherId, form, activity, res) {
        return postPerformanceConditionForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addPerformanceResult: function (user, publisherId, form, activity, res) {
        return postPerformanceResultForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addPerformanceComment: function (user, publisherId, form, activity, res) {
        return postPerformanceCommentForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialBudgets: function (user, publisherId, form, activity, res) {
        return postFinancialBudgetsForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialPlannedDisbursements: function (user, publisherId, form, activity, res) {
        return postFinancialPlannedDisbursementsForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialTransactions: function (user, publisherId, form, activity, res) {
        return postFinancialTransactionsForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialCapitalSpend: function (user, publisherId, form, activity, res) {
        return postFinancialCapitalSpendForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addGeopoliticalCountry: function (user, publisherId, form, activity, res) {
        return postGeopoliticalCountryForm(user, publisherId, form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addGeopoliticalRegion: function (user, publisherId, form, activity, res) {
        return postGeopoliticalRegionForm(user, publisherId, form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addGeopoliticalLocation: function (user, publisherId, form, activity, res) {
        return postGeopoliticalLocationForm(user, publisherId, form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationSector: function (user, publisherId, form, activity, res) {
        return postClassificationSectorForm(user, publisherId, form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationPolicy: function (user, publisherId, form, activity, res) {
        return postClassificationPolicyForm(user, publisherId, form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addClassificationSelect: function (user, publisherId, form, activity, res) {
        return postClassificationSelectForm(user, publisherId, form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationCountryBudget: function (user, publisherId, form, activity, res) {
        return postClassificationCountryBudgetForm(user, publisherId, form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationHumanitarian: function (user, publisherId, form, activity, res) {
        return postClassificationHumanitarianForm(user, publisherId, form, activity)
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
