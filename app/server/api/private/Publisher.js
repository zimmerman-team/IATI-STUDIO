"use strict"

import DatabaseContainer from '../../utils/DatabaseContainer'
import Publisher from '../../models/Publisher'
import _ from 'lodash'

import config from '../../config/config'
import { print, printTrace } from '../../utils/dev'

import { getXmlFile } from '../../oipa/export'
import { saveXmlFile } from '../../utils/saveFile'


function handleError(res, error) {
    console.error(error);
    return res({
        error: error.name,
        message: error.message,
    })
}

var PublisherAPI = {

    test: function(user, form, res) {
       console.log("got here")
       console.log(form)
    },

    get: function(user, res) {
        Publisher.findOneByUser(user)
            .then(publisher => res(null, publisher))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    create: function(user, data, res) {
        /*
         * Creates a new publisher, and generates the resulting data by querying OIPA
        */
        data.author = user;
        let publisher = new Publisher(data);

        publisher.saveAndPopulate()
            .then(publisher => res(null, publisher))
            .catch(handleError.bind(null, res))
    },

    update: function(user, publisher, res) {
        /*
         * Update a new publisher, without updating results
        */
        return Publisher.updateByUser(publisher._id, publisher, user)
            .then(publisher => res(null, publisher))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    delete: function(user, publisher, res) {
        return Publisher.deleteByUser(publisher._id, user)
          .then(publisher => res(null, publisher))
          .catch((error) => {
              console.error(error.stack);
              res(error)
          })
    },

    generateXmlFile: function(user, publisher, dataset, res) {

      return getXmlFile(dataset.name)
        .then(fileContent => saveXmlFile(dataset.name, fileContent)) // save the file (or better: call a function that saves the file)

    }
}

module.exports = PublisherAPI
