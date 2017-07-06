"use strict"
/*
 * Functions for changing items and communicating with API
*/

import _ from 'lodash'
import querystring from 'querystring'
import config from '../config/config'
import { oipaGet } from '../config/request'
import { transactionTypeNameToCode } from './mappings'

export const composeOipaQuery = function(visualization, item) {
    /*
    * Composes an OIPA query for #{item}
    * Must be called with a visualization object as thisArg
    */

   // arrays of options must be comma-separated

    let context = _.chain(visualization.context)
    .groupBy('type')
    .mapValues(x => (
        x.map(x => x.value).join(',')
    ))
    .value()

    let currency = {}
    if(visualization.currencyType == 'converted'){
      currency = { 'convert_to': visualization.currency }
      // see ticket #582, activities but no commitments should be filtered out
      currency[visualization.currency.toLowerCase() + '_value_not'] = 0
    } else {
      currency = { 'currency': visualization.currency, 'value_not': 0 }
    }

    let query = Object.assign({
        aggregations: [item.aggregations, 'count', 'activity_count'].join(','),
        group_by: [visualization.base_group, item.type].join(','),
        order_by: [visualization.base_group, item.type].join(','),
        transaction_type: transactionTypeNameToCode[item.aggregations]
    }, context, item.context, currency)

    // identifier query
    query[item.type] = item.id

    let path = querystring.stringify(query)
    
    return _.join([config.aggregation_url, path], '?')
}

export const composeOipaQueries = function(visualization) {
    /*
     * Compose a list of OIPA queries for a given visualization item object
    */

   return _.map(visualization.items, composeOipaQuery, visualization)
}


export const getResult = function(query) {
   /*
    * Perform OIPA query given ${query}
   */

    const req_options = { url: query }

    return oipaGet(req_options)
      .then(body => body.results)

    // oipaGet(req_options, (error, res, body) => {
    //     if (error) return cb(error)

    //     let result = body.results
    //     cb(error, result)
    // })
}

const AGGREGATION_FIELD_MAPPING = {
   'transaction_date_year': 'transaction_date_year',
}

const flatGroupings = [ 'participating_organisation' ]
const codeGroupings = [ 'recipient_country', 'recipient_region', 'sector' ]
const organisationGroupings = [ 'reporting_organisation' ]

const composeResultObject = function(result, item, base_group) {
   /*
    * Called for every object in array returned from group_by OIPA call
   */

    let result_obj = {}

    // TODO: refactor this mess - 2016-05-10

    if (_.some(codeGroupings, x => x === item.type)) {
        result_obj['id'] = result[item.type].code
        result_obj['name'] = result[item.type].name
        result_obj['type'] = item.type
        // result_obj['x'] = result[visualization.base_group]
        result_obj['x'] = result[AGGREGATION_FIELD_MAPPING[base_group]]
        result_obj['y'] = result[item.aggregations]
        result_obj['count'] = result['count']
        result_obj['activity_count'] = result['activity_count']
        result_obj['aggregation'] = item.aggregations
    }
    else if (_.some(organisationGroupings, x => x === item.type)) {
        result_obj['id'] = result[item.type].organisation_identifier
        result_obj['name'] = result[item.type].primary_name
        result_obj['type'] = item.type
        // result_obj['x'] = result[visualization.base_group]
        result_obj['x'] = result[AGGREGATION_FIELD_MAPPING[base_group]]
        result_obj['y'] = result[item.aggregations]
        result_obj['count'] = result['count']
        result_obj['activity_count'] = result['activity_count']
        result_obj['aggregation'] = item.aggregations
    }
    else if (_.some(flatGroupings, x => x === item.type)) {
        // result_obj['id'] = result[item.type]
        // result_obj['name'] = result[item.type]
        result_obj['id'] = result['ref']
        result_obj['name'] = result['ref']
        result_obj['type'] = item.type
        result_obj['x'] = result[AGGREGATION_FIELD_MAPPING[base_group]]
        result_obj['y'] = result[item.aggregations]
        result_obj['count'] = result['count']
        result_obj['activity_count'] = result['activity_count']
        result_obj['aggregation'] = item.aggregations
    }

    return result_obj
}

export const getResultItem = function(visualization, item, cb) {
   /*
    * Composes the item, along with results
   */
 
   let query = composeOipaQuery(visualization, item);

   console.log('---- getResultItem ----', query);

   return getResult(query)
      .then(result => {
         return _.map(result, single => composeResultObject(single, item, visualization.base_group))
      })
      // .then(result => [item, result])
      .then(result => {
         item.result = result
         return item
      })
}

export const getVisualizationResult = function(visualization) {
    /*
     * get resulting data from OIPA for current visualization state
     * Call getResultItem for every item and combine their results
    */

    // list of promises
    let results = _(visualization.items)
        .map(item => {
            return getResultItem(visualization, item)
        })

    return Promise.all(results)
        .then((items) => {
            visualization.items = items
            return visualization

            // return [visualization, result]
        })
}

