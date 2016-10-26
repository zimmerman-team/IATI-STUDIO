"use strict"

import CKAN from 'ckan'
import config from '../../config/config'
import _ from 'lodash'
import { print, printTrace } from '../../utils/dev'
import moment from 'moment'
import PublisherApi from './Publisher'


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

            client.action('organization_list_for_user', {}, function(err, orgList){

              if(orgList.result.length === 0){
                return res({
                    error: 'no_organisations',
                    message: 'Your IATI Registry user is not coupled to an organisation',
                })
              }

              // store user info in database, set publisher state in store to validated.
              const publisher = {
                apiKey: apiKey,
                userId: userId,
                validationStatus: true,
                ownerOrg: orgList.result[0].id, // TODO : check if the publisher has orgs, if not show message, if multiple show list.
                datasets: result.result.datasets
              };

              PublisherApi.create(user, publisher, res)
            });

          } // Check is if theres an error in the err object.
          else if (result.success === true && result.result.apiKey === undefined) {
            return res({
                error: true,
                message: {
                  type: 'api_key',
                  text: 'API key incorrect',
                }
            })
          }
          else {
            return res({
                error: true,
                message: {
                  type: 'user_id',
                  text: 'User ID incorrect',
                }
            })
          }
        });
    },

    getApiKeyUnlink: function(user, publisher, res) {
      // delete publisher
      return PublisherApi.delete(user, publisher, res)
    },

    publishDataset: function(user, publisher, name, title, filetype, res) {

      const dataset = {
        "resources": [
          {"url": "https://www.iatistudio.com/files/"+name+".xml"}
        ],
        "name": name,
        "filetype": filetype,
        "data_updated": moment().format("YYYY-MM-DD HH:mm"),
        "activity_count": "0",
        "title": title,
        "owner_org": publisher.ownerOrg
      }

      var client = new CKAN.Client(config.iati_registry_url, publisher.apiKey)

      client.action('package_create', dataset, function(err, datasetResponse){
        //print(datasetResponse.error.extras)

        if(datasetResponse.success){
          // created correctly, add to publisher.datasets and save publisher
          let newDataset = datasetResponse.result
          // add dataset to publisher
          publisher.datasets = [...publisher.datasets, newDataset]

          // update publisher
          return PublisherApi.update(user, publisher, res)

        } else {
          // check and send back errors
          return res({
              error: datasetResponse.error.__type,
              message: datasetResponse.error.name[0],
          })
        }
      })

    },

    deleteDataset: function(user, publisher, dataset, res) {

      var client = new CKAN.Client(config.iati_registry_url, publisher.apiKey)
      client.action('package_delete', {id: dataset.id}, function(err, datasetResponse){

        if(datasetResponse.success){
          // remove dataset from publisher
          publisher.datasets = publisher.datasets.filter( (obj) => (obj.id != dataset.id))

          // update publisher
          return PublisherApi.update(user, publisher, res)

        } else {
          // check and send back errors
          console.log(datasetResponse)
        }
      })
    },

    updateDataset: function(user, publisher, dataset, res) {

      var client = new CKAN.Client(config.iati_registry_url, publisher.apiKey)
      client.action('package_show', {id: dataset.id, include_tracking: true}, function(err, currentDataset){

        var extrasObj = _.zipObject(
          _.map(currentDataset.result.extras, "key"),
          _.map(currentDataset.result.extras, "value")
        )

        // TODO: update the XML and stuff, for now it only updates the data_updated key
        let updatedDataset = {
          ...currentDataset.result,
          ...extrasObj,
          data_updated: moment().format("YYYY-MM-DD HH:mm"),
          activity_count: (Number(extrasObj.activity_count)+1),
        }

        delete updatedDataset["extras"]

        client.action('package_update', updatedDataset, function(err, datasetResponse){

          if(datasetResponse.success){

            // update publisher.datasets key
            publisher.datasets = [...publisher.datasets.filter( (obj) => (obj.id != dataset.id)), datasetResponse.result]

            // update publisher
            return PublisherApi.update(user, publisher, res)
          }
          else {
            // check and send back errors
            return res({
                error: datasetResponse.error.__type,
                message: "error on update",
            })
          }
        })
      })

    }
}

module.exports = IatiRegistryMeta
