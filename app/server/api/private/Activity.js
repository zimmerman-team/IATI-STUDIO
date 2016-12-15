"use strict"

import { postActivity, getCodeListItems, postActivityDescriptionForm, postParticipatingOrganisationForm,
  postDocumentLinkForm, postRelationForm} from '../../oipa/activity'

var ActivityAPI = {

  addActivity: function(user, form, res) {
    return postActivity(form)
      .then(result => res(null, result))
      .catch(error => res(error));
  },

  addBasicInformation: function (user, form, res) {
    return postActivityDescriptionForm(form)
      .then(result => res(null, result))
      .catch(error => res(error));
  },

  addParticipatingOrganisation: function (user, form, activity, res) {
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
    return postRelationForm(form, activity)
      .then(result => res(null, result))
      .catch(error => res(error));
  },

  getCodeListItems: function(user, codeListType, res) {
    return getCodeListItems(codeListType)
      .then(languages => res(null, languages))
      .catch((error) => res(error));
  },

};

module.exports = ActivityAPI;