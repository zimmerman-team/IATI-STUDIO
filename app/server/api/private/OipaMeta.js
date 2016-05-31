"use strict"

import _ from 'lodash'

import config from '../../config/config'
import { oipaGet } from '../../config/request'

import { getItemFilterOptions, getContextFilterOptions } from '../../oipa/meta'

import { print, printTrace } from '../../utils/dev'

import Visualization from '../../models/Visualization'

var OipaMetaAPI = {
    getContextFilters: function(user, res) {
        console.log('called getContextFilters');
        getItemFilterOptions(config.visualization.contextFilters)
            .then(results => res(null, results))
            .catch(printTrace)
            .catch((error) => res(error))
    },

    getFilteredContextFilters: function(user, vizId, res) {
        /*
         * Get filtered context filters for viz with id ${vizId}
        */

        console.log('called getFilteredContextFilters');

        Visualization.findOneByUser(vizId, user)
            .then(viz => (
                getContextFilterOptions(
                    config.visualization.contextFilters,
                    viz.items,
                    viz.currencyType,
                    viz.currency
                )
            ))
            .then(results => res(null, results))
            .catch(printTrace)
            .catch((error) => res(error))
    },

    getItemFilters: function(user, res) {
        /*
         * Get all item filters
        */

        console.log('called getItemFilters');

        getItemFilterOptions(config.visualization.itemFilters)
            .then(results => res(null, results))
            .catch(printTrace)
            .catch((error) => res(error))
    },

    getFilteredItemFilters: function(user, vizId, res) {
        /*
         * Get item filters, filtered by context
        */

        console.log('called getFilteredItemFilters');

        Visualization.findOneByUser(vizId, user)
            .then(viz => (
                getItemFilterOptions(config.visualization.itemFilters, viz.context, viz.currencyType, viz.currency)
            ))
            .then(results => res(null, results))
            .catch(printTrace)
            .catch((error) => res(error))
    }
}

module.exports = OipaMetaAPI



