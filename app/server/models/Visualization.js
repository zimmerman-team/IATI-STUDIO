'use strict'

const _ = require('lodash');
const async = require('async')
const http = require('http');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // use ES6 promises

import { 
    getResultItem,
    getVisualizationResult,
} from '../oipa/visualizations.js'

import { print, printTrace } from '../utils/dev'

const Schema = mongoose.Schema;

// TODO: sub-schema for context - 2016-02-12
const ContextSchema = new Schema({
    type: String,
    value: String,
    name: String,
})

// sub-schema for items
const ItemSchema = new Schema({
    type: String,
    id: String, // e.g. code

    name: String, 

    aggregations: String,

    context: { type: Schema.Types.Mixed },
    result: { type: Schema.Types.Mixed },
    itemProps: {type: Object},

    hidden: { type: Boolean, default: false }
})

export const Item = mongoose.model('Item', ItemSchema)
export const Context = mongoose.model('Context', ContextSchema)

const VisualizationSchema = new Schema({
    name: { type: String, default: "Untitled" },
    description: { type: Schema.Types.Mixed },
    descriptionPlainText: { type: String, default: '' },

    author: { type: Schema.Types.ObjectId, ref: 'User' },

    type: { type: String, default: 'stacked-bar-chart' },
    base_group: { type: String, default: 'transaction_date_year' },
    
    context: [ ContextSchema ],
    items: [ ItemSchema ],

    currency: { type: String, default: 'USD' },
    currencyType: { type: String, default: 'converted' },

    contextOptions: { type: Schema.Types.Mixed },


    // filters relevant to the selected visualization.
    contextFilters: { type: Schema.Types.Mixed },
    itemFilters: { type: Schema.Types.Mixed },

    archived: {type: Boolean, default: false},
    archivedDate: {type: Date, default: null},
    chartProps: {type: Object, default: {
        interpolation: false
    }},

    isDuplicate: {type: Boolean, default: false},

    public: {type: Boolean, default: false},
    hiddenFromFeed: {type: Boolean, default: false},


    // result from OIPA
    result: Schema.Types.Mixed
}, {
    timestamps: { createdAt: 'created', updatedAt: 'last_updated' }
})
VisualizationSchema.index({
   'name': 'text',
   'descriptionPlainText': 'text',
   'currency': 'text',
   'items.name': 'text',
   'context.name': 'text',
})

const notFound = function(viz, id) {
    if (!viz) 
        return Promise.reject(new Error(`Viz with id ${id} not found`))
    else 
        return Promise.resolve(viz)
}

VisualizationSchema.statics.findAndPopulate = function(query, cb) {

    return this
        .find(query)
        .populate('author', '_id firstName lastName avatar username')
}

VisualizationSchema.statics.findOneAndPopulate = function(query) {

    return this
        .findOne(query)
        .populate('author', '_id firstName lastName avatar username')
}

VisualizationSchema.statics.updateAndPopulate = function(query, data) {

    return this
        .findOneAndUpdate(query, {$set: data}, { new: true })
        .populate('author', '_id firstName lastName avatar username')
        .then((viz) => {
            return Promise.resolve(viz)
        })
}

VisualizationSchema.statics.countForUser = function(user, cb) {
    let query = {};
    query.author = user._id;

    return this
        .count(query)
        .exec(cb)
}

VisualizationSchema.statics.findByUser = function(query, user, cb) {
    query = query || {};
    query.author = user._id;

    return this
        .findAndPopulate(query)
        .exec(cb)
}

VisualizationSchema.statics.findOneByUser = function(id, user, cb) {

    let query = {
         _id: id,
         author: user._id
    }

    return this
        .findOneAndPopulate(query)
        .then((viz) => {
          if (!viz)
              return Promise.reject(new Error(`Viz with id ${id} not found`))
          else
              return Promise.resolve(viz)
        })
}

VisualizationSchema.statics.updateByUser = function(id, data, user) {

    let query = {
         _id: id,
         author: user._id
    }

    return this.updateAndPopulate(query, data)
}

VisualizationSchema.statics.deleteByUser = function(id, user) {

    let query = {
         _id: id,
         author: user._id
    }

    return this
        .findOneAndRemove(query)
}

VisualizationSchema.methods.saveAndPopulate = function(query, cb) {

    return this
        .save()
            .then(viz => {
                return viz.populate(
                    'author', 
                    '_id firstName lastName avatar username'
                )
                .execPopulate() // really mongoose....
            })
}

VisualizationSchema.methods.refresh = function() {
    /*
     * get resulting data from OIPA for current visualization state
    */

    return getVisualizationResult(this)
}

VisualizationSchema.methods.addContext = function(context) {
    /*
     * Add a context filter
    */

    this.context.push(context)
    return Promise.resolve(this)
}

VisualizationSchema.methods.removeContext = function(id) {
    /*
     * Add a context filter
    */

    this.context.remove(id)
    return Promise.resolve(this)
}

VisualizationSchema.methods.replaceContext = function(contextId, context) {
    /*
     * replace a context filter
    */

   console.log('called replaceContext');
   console.log(contextId);

    this.context.remove(contextId)
    this.context.push(context)

    return Promise.resolve(this)
}

VisualizationSchema.methods.addItem = function(item) {
    /*
    * get resulting data from OIPA for #{item}
    * // TODO: Shold also add it and handle results accordingly - 2016-02-11
    */

    
    return getResultItem(this, item)
        // .then((item) => this.items.push(item))
        // .then(([viz, results]) => viz.addResults(results))
        .then(item => {
            this.items.push(item)
            return this
        })
}

VisualizationSchema.methods.removeItem = function(id) {
    /*
     * remove Item with id ${id}
     */

    this.items.remove(id)
    return Promise.resolve(this)

    // return this.removeResults(id)
    //     .then(viz => {
    //         viz.items.remove(id)
    //         // viz.items = _(this.items) // TODO: give unique id to each item - 2016-02-12
    //         //     .filter(item => !(item.id == id || item.aggregation == aggregation))
    //         // viz.markModified('items')

    //         return viz
    //     })
}

VisualizationSchema.methods.replaceItem = function(itemId, item) {
    /*
     * Replace the item
    */

    // Item.findOneAndUpdate({_id: itemId}, { $set: data }, { new: true })
    //     .then((viz) => {
    //         return Promise.resolve(viz)
    //     })

    this.items.remove(itemId)
    this.items.push(item)

    return Promise.resolve(this)
}

export const Visualization = mongoose.model('Visualization', VisualizationSchema)

export default Visualization
// export const mongoose.model('Visualization', VisualizationSchema)
