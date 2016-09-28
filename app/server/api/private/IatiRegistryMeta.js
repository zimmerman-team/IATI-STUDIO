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
        var client = new CKAN.Client(config.iati_registry_url, apiKey)
        client.action('user_show', {id: userId, include_datasets: true}, function(err, result){

          // if there's no error we'll set the user as validated and store his/her publisher meta on the database.
          if (result.success === true && result.result.apikey !== undefined){

            // store user info in database, set publisher state in store to validated.
            let publisher = new Publisher({
              author: user,
              apiKey: apiKey,
              userId: userId,
              validationStatus: true,
              organisationIdentifier: '',// TODO check where to get this from
              datasets: result.result.datasets
            });

            publisher
                .saveAndPopulate()
                .then(publisher => res(null, publisher))
                .catch(handleError.bind(null, res))

          } // Check is if theres an error in the err object.
          else if (result.success === true && result.result.apiKey === undefined) {
            return res({
                error: 'API key incorrect',
                message: 'API key incorrect',
            })
          }
          else {
            return res({
                error: 'UserID incorrect',
                message: 'UserID incorrect',
            })
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
    },

    publishDataset: function(user, publisher, dataset, res) {
      var client = new CKAN.Client(config.iati_registry_url, publisher.apiKey)

      client.action('organization_list_for_user', {}, function(err, orgList){

        dataset.owner_org = orgList.result[0].id;

        console.log('dataset')
        console.log(dataset)
        client.action('package_create', dataset, function(err, datasetResponse){

          if(datasetResponse.success){
            // created correctly, add to publisher.datasets and save publisher
            const newDataset = datasetResponse.result

          } else {
            // check and send back errors
            console.log(datasetResponse)
          }
        })
      })

    }
}

module.exports = IatiRegistryMeta
