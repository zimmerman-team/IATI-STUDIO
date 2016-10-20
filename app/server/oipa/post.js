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
    //console.log(activity)

    /*
    * Composes the item, along with results
    */
    const req_options = { 
        url: config.activities_url,
        body: {
            activity: activity
        }, 
    }

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
        body: {
            activity: activity
        },
        json: true // Automatically stringifies the body to JSON
    };

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
