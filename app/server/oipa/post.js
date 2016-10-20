"use strict"
/*
 * Functions for posting to the API
*/

import _ from 'lodash'
import querystring from 'querystring'
import rp from 'request-promise'
import config from '../config/config'
import { oipaPost } from '../config/request'


export const postActivity = function(activity) {
    /*
    * Composes the item, along with results
    */
    // const req_options = {
    //     url: config.activities_url,
    //     body: {
    //         activity
    //     },
    // }

    //console.log(req_options)
    // or form: {
    //     some: 'payload' // Will be urlencoded
    // },

     //return oipaPost(req_options)
    //     .then(body => {
    //         console.log(body.results)
    //     })


    const options = {
        method: 'POST',
        uri: 'https://dev-post.oipa.nl/api/activities/',
        body: activity,
        json: true // Automatically stringifies the body to JSON
    };
    //console.log(options)
    rp(options)
      .then(function (parsedBody) {
          console.log(parsedBody)
          // POST succeeded...
      })
      .catch(function (err) {
         console.log(err)
          // POST failed...
      });
}
