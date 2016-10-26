"use strict"
/*
 * Functions for communicating with activity API
 */

import _ from 'lodash'
import querystring from 'querystring'
import config from '../config/config'
import {oipaPost} from '../config/request'


export const postActivity = function (activity) {
  /*
   * Composes the item, along with results
   */
  const req_options = {
    baseUrl: config.oipa_post_url,
    url: config.activities_url,
    body: activity,
  };

  return oipaPost(req_options)
    .then(function (parsedBody) {
      console.log(parsedBody)
    }).catch(function (err) {
      console.log(err);
    })

};
