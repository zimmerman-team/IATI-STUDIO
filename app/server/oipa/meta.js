
"use strict"
/*
 * Functions for communicating with API
*/

import { _ } from 'lodash'
import querystring from 'querystring'
import config from '../config/config'
import { oipaGet } from '../config/request'
import { transactionTypeNameToCode } from './mappings'

const flatGroupings = [ 'participating_organisation' ]
const codeGroupings = [ 'recipient_country', 'recipient_region', 'sector' ]
const organisationGroupings = [ 'reporting_organisation' ]

const composeResultObject = function(result, groupBy, filtered=false) {
   /*
    * Called for every object in array returned from group_by OIPA call
   */

    if (_.some(flatGroupings, x => x === groupBy)) {
        return {
            id: result[groupBy],
            name: result[groupBy],
            count: result['count'],
            filtered: filtered, // is this a filtered call or not?
        }
    }
    else if (_.some(organisationGroupings, x => x === groupBy)) {
        // TO DO: fix OIPA ticket #209 to not return null reporting orgs
        if(result[groupBy] == null){ 
            return {
                id: 'a',
                name: 'null',
                count: result['count'],
                filtered: filtered, // is this a filtered call or not?
                object: {},
            }
        }
        
        if(result[groupBy]['primary_name'] == ''){ 
            result[groupBy]['primary_name'] = result[groupBy]['organisation_identifier'];
        }
        return {
            id: result[groupBy]['organisation_identifier'],
            name: result[groupBy]['primary_name'],
            count: result['count'],
            filtered: filtered, // is this a filtered call or not?
            object: result[groupBy],
        }
    }
    else {
        return {
            id: result[groupBy]['code'],
            name: result[groupBy]['name'],
            count: result['count'],
            filtered: filtered, // is this a filtered call or not?
            object: result[groupBy],
        }
    }
}

const getItemFilterOption = function(groupBy, context, currencyType, currency){
    /*
     * Get filter options for the given #{groupBy}
    */

    let context_query = _.chain(context)
        .groupBy('type')
        .mapValues(x => (
            x.map(x => x.value).join(',')
        ))
        .value()

    console.log("---- getItemFilterOption.context_query -----", context_query);

    // TODO: add transaction_type filter when passing items - 2016-05-17

    let query_obj = Object.assign({
        aggregations: "count",
        group_by: groupBy,
        order_by: groupBy,
    }, context_query)

    if(currencyType != undefined && currencyType == 'source'){
        query_obj.currency = currency;
    }

    let path = querystring.stringify(query_obj)
    let query = _.join([config.aggregation_url, path], '?')

    const req_options = { url: query }

    console.log("---- getItemFilterOption.query -----", query);

    return oipaGet(req_options)
        .then(body => {
            return _.map(body.results, result => {
                return composeResultObject(result, groupBy, !!context)
            })
        })
}

export const getItemFilterOptions = function(group_by_list, context, currencyType, currency) {
    /*
     * call getFilterOptions for every group_by in ${group_by_list}
    */

    let contextOptions = _.map(group_by_list, groupBy => (
        getItemFilterOption(groupBy, context, currencyType, currency)
    ))

    return Promise.all(contextOptions)
        .then((contextOptions) => _.zipObject(group_by_list, contextOptions))
}

const getContextFilterOption = function(groupBy, items, currencyType, currency){
    /*
     * Get filter options for the given #{groupBy}
    */

    let itemQuery = _.chain(items)
        .filter(x => !x.hidden)
        .groupBy('type')
        .mapValues(x => (
            _.uniq(x.map(x => x.id)).join(',') // TODO: rename id to value - 2016-05-18
        ))
        .value()

    let transactionTypesQuery = {
        transaction_type:
            _.chain(items)
            .map(x => x.aggregations)
            .uniq()
            .map(x => transactionTypeNameToCode[x])
            .value()
            .join(',')
    }

    let query_obj = Object.assign({
        aggregations: "count",
        group_by: groupBy,
        order_by: groupBy,
    }, itemQuery, transactionTypesQuery)

    if(currencyType != undefined && currencyType == 'source'){
        query_obj.currency = currency;
    }

    let path = querystring.stringify(query_obj)
    let query = _.join([config.aggregation_url, path], '?')

    const req_options = { url: query }

    console.log('---- getContextFilterOption ----', query);

    return oipaGet(req_options)
        .then(body => {
            return _.map(body.results, result => {
                return composeResultObject(result, groupBy, !!items)
            })
        })
}

export const getContextFilterOptions = function(group_by_list, items, currencyType, currency) {
    /*
     * call getFilterOptions for every group_by in ${group_by_list}
    */

    let contextOptions = _.map(group_by_list, group_by => (
        getContextFilterOption(group_by, items, currencyType, currency)
    ))

    return Promise.all(contextOptions)
        .then((contextOptions) => _.zipObject(group_by_list, contextOptions))
}

