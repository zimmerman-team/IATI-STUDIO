'use strict'

const _ = require('lodash');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // use ES6 promises

import { print, printTrace } from '../utils/dev'

const Schema = mongoose.Schema;


const PublisherSchema = new Schema({
    apiKey: { type: String, default: '' },
    userId: { type: String, default: '' },
    datasets: [],
    ownerOrg: { type: String, default: '' }, /* we need to know which org this publisher will publish for */
    validationStatus: {type: Boolean, default: false}, /* custom */
    autoPublish: {type: Boolean, default: false}, /* custom */
    author: { type: Schema.Types.ObjectId, ref: 'User' }, /* custom */
},
{
    timestamps: { createdAt: 'created', updatedAt: 'last_updated' }
})



const notFound = function(publisher, id) {
    if (!publisher)
        return Promise.reject(new Error(`Publisher with id ${id} not found`))
    else
        return Promise.resolve(publisher)
}

PublisherSchema.statics.findAndPopulate = function(query, cb) {

    return this
        .find(query)
        .populate('author', '_id firstName lastName avatar username')
}

PublisherSchema.statics.findOneAndPopulate = function(query) {

    return this
        .findOne(query)
        .populate('author', '_id firstName lastName avatar username')
}

PublisherSchema.statics.updateAndPopulate = function(query, data) {

    return this
        .findOneAndUpdate(query, {$set: data}, { new: true })
        .populate('author', '_id firstName lastName avatar username')
        .then((publisher) => {
            return Promise.resolve(publisher)
        })
}

PublisherSchema.statics.findOneByUser = function(user, cb) {

    let query = {
         author: user._id
    }

    return this
        .findOneAndPopulate(query)
        .then((publisher) => {
          if (!publisher)
              return Promise.reject(new Error(`Publisher with id ${id} not found`))
          else
              return Promise.resolve(publisher)
        })
}

PublisherSchema.statics.updateByUser = function(id, data, user) {

    let query = {
         _id: id,
         author: user._id
    }

    return this.updateAndPopulate(query, data)
}

PublisherSchema.statics.deleteByUser = function(id, user) {

    let query = {
         _id: id,
         author: user._id
    }

    return this
        .findOneAndRemove(query)
}

PublisherSchema.methods.saveAndPopulate = function() {

    return this
        .save()
            .then(publisher => {
                return publisher.populate(
                    'author',
                    '_id firstName lastName avatar username'
                )
                .execPopulate() // really mongoose....
            })
}


export const Publisher = mongoose.model('Publisher', PublisherSchema)

export default Publisher
// export const mongoose.model('Visualization', VisualizationSchema)
