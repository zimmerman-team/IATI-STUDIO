"use strict"

import { postActivity, getLanguages, postActivityDescriptionForm } from '../../oipa/activity'

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

  getLanguages: function(user, res) {
    return getLanguages()
      .then(languages => res(null, languages))
      .catch((error) => res(error));
  },

};

module.exports = ActivityAPI;