"use strict"

import { postActivity, getLanguages } from '../../oipa/activity'

var ActivityAPI = {

  addActivity: function(user, form, res) {
    return postActivity(form);
  },

  getLanguages: function(user, res) {
    return getLanguages()
      .then(languages => res(null, languages))
      .catch((error) => res(error));
  },

};

module.exports = ActivityAPI;