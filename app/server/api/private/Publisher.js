"use strict"

import mongoose from 'mongoose'
import DatabaseContainer from '../../utils/DatabaseContainer'
import Publisher from '../../models/Publisher'
import _ from 'lodash'

import config from '../../config/config'
import { print, printTrace } from '../../utils/dev'


function handleError(res, error) {
    console.error(error);
    return res({
        error: error.name,
        message: error.message,
    })
}

var PublisherAPI = {

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
         * Creates a new visualization, and generates the resulting data by querying OIPA
        */
        data.author = user;

        let publisher = new Publisher(data);

        Publisher.saveAndPopulate()
            .then(publisher => res(null, publisher))
            .catch(handleError.bind(null, res))
    },

    update: function(user, publisher, res) {
        /*
         * Update a new publisher, without updating results
        */

        return Publisher.updateByUser(publisher.id, publisher, user)
            .then(publisher => res(null, publisher))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    delete: function() {
        return Publisher.deletePublisher()
            .then(publisher => res(null, publisher))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    }
}

module.exports = PublisherAPI
