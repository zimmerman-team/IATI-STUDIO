"use strict"

import CKAN from 'ckan'
import config from '../../config/config'
// import _ from 'lodash'
// import { print, printTrace } from '../../utils/dev'
import Publisher from '../../models/Publisher'


function handleError(res, error) {
    console.error(error);
    return res({
        error: error.name,
        message: error.message,
    })
}


var IatiRegistryMeta = {


    getApiKeyValidation: function(user, apiKey, userId, res) {
        /*
         * Get API Validate API Key Alessandro
        */

        // 1. Send request to IATI Registry API to validate the apiKey
        // we'll use the CKAN Javascript client to communicate
        // with this http://docs.ckan.org/en/latest/api/index.html Registry API
        // by usind this client/docs can be found at https://github.com/okfn/ckan.js

        // create a CKAN client instance,
        // the instance needs the URL of the
        // CKAN server that we want to connect with,
        // and the API key to do POST requests.
        var client = new CKAN.Client(config.iati_registry_url, apiKey)

        // TO DO: create publisher and set id in de id key below.
        client.action('user_show', {id: userId, include_datasets: true}, function(err, result){
          console.log(result)
          // 2. now we got the data back.
          // First thing we'll check is if theres an error in the err object.
          if (result.success === true && result.result.apikey != undefined){
            console.log("creating new publisher")
            // if there's no error we'll set the user as validated and store his/her publisher meta on the database.

            // to do: create a new part of the redux store, that has info on the publisher.
            // info we should store; id, api key, validator status, organisation identifier, current datasets on the IATI Registry.

            // 3. store user info in database, set publisher state in store to validated.
            let publisher = new Publisher({
              author: user,
              apiKey: apiKey, // TODO should we hash this?
              userId: userId,
              validationStatus: true,
              organisationIdentifier: '',// TODO check where to get this from
              datasets: result.result.datasets // TODO check where to get this from
            });

            publisher
                .saveAndPopulate()
                .then(publisher => res(null, publisher))
                .catch(handleError.bind(null, res))

          } else if (result.success === true) {
            // user exists, but entered the wrong API key
            res(null, false)
          } else {
            // user not found

            // TODO check what we want to do on failure we want to send
            // a failed message to the front-end with the correct message.
            res(null, false)
          }
        });
    },

    getApiKeyUnlink: function(user, publisherId, res) {
      // find publisher

      console.log(publisherId)

      // delete publisher
      return Publisher.deleteByUser(publisherId, user)
          .then(publisher => res(null, publisher))
          .catch((error) => {
              console.error(error.stack);
              res(error)
          })
    }


}

module.exports = IatiRegistryMeta
