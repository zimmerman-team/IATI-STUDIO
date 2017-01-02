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

    addParticipatingOrganisation: function (user, form, activity, res) {
        // TODO: update validation status here - 2016-12-16
        return postParticipatingOrganisationForm(form, activity)
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
