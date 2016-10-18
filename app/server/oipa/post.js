"use strict"
/*
 * Functions for posting to the API
*/

import _ from 'lodash'
import querystring from 'querystring'
import config from '../config/config'
import { oipaPost } from '../config/request'


export const postActivity = function(activity) {
    /*
    * Composes the item, along with results
    */
    const req_options = { 
        url: config.aggregation_url,
        body: {
            activity: activity
        }, 
    }
    // or form: {
    //     some: 'payload' // Will be urlencoded
    // },

    return oipaPost(req_options)
        .then(body => {
            // 
            return 
        })
}
