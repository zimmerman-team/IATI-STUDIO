"use strict"

import { getActivity, postActivity, getCodeListItems, postActivityDescriptionForm, postParticipatingOrganisationForm, postDocumentLinkForm,
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
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getDescriptions(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createDescription: function(user, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation, 
        return oipaMethods.postDescription(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateDescription: function(user, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateDescription(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteDescription: function(user, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteDescription(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getDates: function(user, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getDates(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createDate: function(user, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postDate(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateDate: function(user, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateDate(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteDate: function(user, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteDate(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },


    getStatus: function(user, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getStatus(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createStatus: function(user, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postStatus(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateStatus: function(user, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateStatus(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteStatus: function(user, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteStatus(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getContact: function(user, activityId, res) {
        // TODO: update validation status here
        return oipaMethods.getContact(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createContact: function(user, activityId, data, res) {
        // TODO: update validation status here
        // on succesful creation,
        return oipaMethods.postContact(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateContact: function(user, activityId, id, data, res) {
        // TODO: update validation status here
        return oipaMethods.updateContact(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteContact: function(user, activityId, id, res) {
        // TODO: update validation status here
        return oipaMethods.deleteContact(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addBasicInformation: function (user, form, res) {
        // TODO: update validation status here - 2016-12-16
        return postActivityDescriptionForm(form)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addBasicInformationDescription: function (user, form, res) {
        return postBasicInformationDescriptionForm(form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addBasicInformationStatus: function (user, form, res) {
        return postBasicInformationStatusForm(form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addBasicInformationDate: function (user, form, res) {
        return postBasicInformationDateForm(form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addBasicInformationContact: function (user, form, res) {
        return postBasicInformationContactForm(form)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    getParticipatingOrganisations: function(user, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getParticipatingOrganisations(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createParticipatingOrganisation: function(user, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation, 
        return oipaMethods.postParticipatingOrganisation(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateParticipatingOrganisation: function(user, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateParticipatingOrganisation(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteParticipatingOrganisation: function(user, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteParticipatingOrganisation(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    getRecipientCountries: function(user, activityId, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.getRecipientCountries(activityId)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    createRecipientCountry: function(user, activityId, data, res) {
        // TODO: update validation status here - 2016-12-16
        // on succesful creation, 
        return oipaMethods.postRecipientCountry(activityId, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    updateRecipientCountry: function(user, activityId, id, data, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.updateRecipientCountry(activityId, id, data)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    deleteRecipientCountry: function(user, activityId, id, res) {
        // TODO: update validation status here - 2016-12-16
        return oipaMethods.deleteRecipientCountry(activityId, id)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addDocumentLink: function (user, form, activity, res) {
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

    addPerformanceCondition: function (user, form, activity, res) {
        return postPerformanceConditionForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addPerformanceResult: function (user, form, activity, res) {
        return postPerformanceResultForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addPerformanceComment: function (user, form, activity, res) {
        return postPerformanceCommentForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialBudgets: function (user, form, activity, res) {
        return postFinancialBudgetsForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialPlannedDisbursements: function (user, form, activity, res) {
        return postFinancialPlannedDisbursementsForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialTransactions: function (user, form, activity, res) {
        return postFinancialTransactionsForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addFinancialCapitalSpend: function (user, form, activity, res) {
        return postFinancialCapitalSpendForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addGeopoliticalCountry: function (user, form, activity, res) {
        return postGeopoliticalCountryForm(form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addGeopoliticalRegion: function (user, form, activity, res) {
        return postGeopoliticalRegionForm(form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addGeopoliticalLocation: function (user, form, activity, res) {
        return postGeopoliticalLocationForm(form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationSector: function (user, form, activity, res) {
        return postClassificationSectorForm(form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationPolicy: function (user, form, activity, res) {
        return postClassificationPolicyForm(form, activity)
            .then(result => res(null, result))
            .catch(error => res(error));
    },

    addClassificationSelect: function (user, form, activity, res) {
        return postClassificationSelectForm(form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationCountryBudget: function (user, form, activity, res) {
        return postClassificationCountryBudgetForm(form, activity)
          .then(result => res(null, result))
          .catch(error => res(error));
    },

    addClassificationHumanitarian: function (user, form, activity, res) {
        return postClassificationHumanitarianForm(form, activity)
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
