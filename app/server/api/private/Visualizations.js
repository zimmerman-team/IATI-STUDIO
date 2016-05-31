"use strict"

import mongoose from 'mongoose'
import DatabaseContainer from '../../utils/DatabaseContainer'
import Visualization from '../../models/Visualization'
import _ from 'lodash'

import config from '../../config/config'
import { print, printTrace } from '../../utils/dev'
import { getItemFilterOptions, getContextFilterOptions } from '../../oipa/meta'

// TODO: Send proper error responses of the form: - 2016-05-10
// {
//    error: 'error-type,
//    message: 'message',
// }
//

function handleError(res, error) {
    console.error(error);
    return res({
        error: error.name,
        message: error.message,
    })
}

var VisualizationAPI = {

    get: function(user, id, res) {
        Visualization.findOneByUser(id, user)
            .then(viz => res(null, viz))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    getAll: function(user, res) {
        Visualization.findByUser({}, user, res)
    },
    
    create: function(user, data, res) {
        /*
         * Creates a new visualization, and generates the resulting data by querying OIPA
        */
        data.author = user;

        let viz = new Visualization(data);

        Visualization.countForUser(user)
            .then(count => {
                if (count > config.visualization.max) {
                    throw new Error(`Maximum number of visualizations reached`)
                }
            })
            .then(() => viz.saveAndPopulate())
            .then((viz) => viz.refresh()) // TODO: integrity flag before refresh - 2016-02-12
            .then(viz => viz.saveAndPopulate())
            // response
            .then(viz => res(null, viz)) // TODO: wrap socket.io to promises server-side - 2016-02-11
            .catch(handleError.bind(null, res))
    },

    update: function(user, vizId, viz, res) {
        /*
         * Update a new visualization, without updating results
        */

        viz.last_updated = Date.now()
            
        return Visualization.updateByUser(vizId, viz, user)
            .then(viz => res(null, viz))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    delete: function(user, vizId, res) {
        /*
         * Permanently delete a visualization
        */

        return Visualization.deleteByUser(vizId, user)
            .then(viz => res(null, viz))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    emptyTrash: function(user, res) {
        /*
         * Delete all archived visualisations
        */
        
        return Visualization.remove({
            author: user._id,
            archived: true
        })
        .then(viz => res(null))
        .catch((error) => {
            console.error(error.stack);
            res(error)
        })
    },

    updateAndRefresh: function(user, vizId, viz, res) {
        /*
         * Update a new visualization, updating results
        */

       // TODO: desc 2016-03-17

        viz.last_updated = Date.now()
        console.log('called updateAndRefresh...');
        
        return Visualization.updateByUser(vizId, viz, user)
            .then((viz) => viz.refresh())
            .then(viz => viz.saveAndPopulate())
            .then(viz => res(null, viz))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    addItem: function(user, vizId, item, res) {
        /*
         * Add a new visualization item
        */

        return Visualization.findOneByUser(vizId, user)
            .then(viz => viz.addItem(item))
            .then(viz => viz.saveAndPopulate())
            // response
            .then((viz) => res(null, viz.items[viz.items.length-1])) // TODO: make this more reliable - 2016-02-12
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    removeItem: function(user, vizId, itemId, res) {
        
        return Visualization.findOneByUser(vizId, user)
            .then(viz => viz.removeItem(itemId))
            .then(viz => {

                if (viz.items.length === 0) {
                    viz.public = false
                }

                return viz.saveAndPopulate()
            })
            //response
            .then((viz) => res(null, viz))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    replaceItem: function(user, vizId, itemId, item, res) {
        console.log('called replaceItem');
        return Visualization.findOneByUser(vizId, user)
            .then((viz) => viz.replaceItem(itemId, item))
            .then(viz => viz.saveAndPopulate())
            .then(viz => res(null, viz.items[viz.items.length - 1]))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    replaceContext: function(user, vizId, contextId, context, res) {
        /*
         * Replace a single context variable
        */

        Visualization.findOneByUser(vizId, user)
            .then((viz) => viz.replaceContext(contextId, context)) // add a context to the object
            .then(viz => viz.saveAndPopulate())
            .then((viz) => viz.refresh()) // update results elements
            .then(viz => viz.saveAndPopulate())
            // response
            .then((viz) => (
                res(null, {
                    context: viz.context[viz.context.length-1], // the context being added
                    items: viz.items, // the items with their changed results
                })
            ))
            .catch((error) => {
                console.error(error.stack)
                res(error)
            })
    },


    addContext: function(user, vizId, context, res) {
        /*
         * Add a single context variable
        */

        console.log('called addContext');

        Visualization.findOneByUser(vizId, user)
            .then((viz) => viz.addContext(context)) // add a context to the object
            .then(viz => viz.saveAndPopulate())
            .then((viz) => viz.refresh()) // update results elements
            .then(viz => viz.saveAndPopulate())
            // response
            .then((viz) => (
                res(null, {
                    context: viz.context[viz.context.length-1], // the context being added
                    items: viz.items, // the items with their changed results
                })
            ))
            // .then(viz => res(null, viz))
            .catch((error) => {
                console.error(error.stack)
                res(error)
            })
    },

    removeContext: function(user, vizId, contextId, res) {
        /*
         * Add a single context variable
        */

        Visualization.findOneByUser(vizId, user)
            .then((viz) => viz.removeContext(contextId)) // add a context to the object
            .then(viz => viz.saveAndPopulate())
            .then(viz => viz.refresh()) // update results elements
            .then(viz => viz.saveAndPopulate())
            .then(viz => (
                res(null, {
                    items: viz.items, // the items with their changed results
                })
            ))
            .then(viz => res(null, viz))
            .catch((error) => {
                console.error(error.stack)
                res(error)
            })
    },

    fork: function(user, vizId, res) {

        Visualization.countForUser(user)
            .then(count => {
                if (count >= config.visualization.max) {
                    throw new Error(`Maximum number of visualizations reached`)
                }
            })
            .then(() => (
                Visualization.findOneAndPopulate({ _id: vizId })
            ))
            .then((viz) => {
                if (!viz.public && !viz.author._id.equals(user._id)) {
                    throw new Error(`visualization with id ${vizId} is not public and not authored by you`)
                }

                viz.items = viz.items.map(item => {
                    item._id = mongoose.Types.ObjectId()
                    return item
                })

                viz.context = viz.context.map(context => {
                    context._id = mongoose.Types.ObjectId()
                    return context
                })

                viz._id = mongoose.Types.ObjectId()
                viz.created = null
                viz.last_updated = null
                viz.name = "copy of " + viz.name
                viz.public = false
                viz.author = user._id
                viz.isNew = true
                viz.isDuplicate = true
                return viz.saveAndPopulate()
            })
            .then(viz => res(null, viz))
            .catch(handleError.bind(null, res))
    },

    /*
     * Admin only
    */

    adminToggleHide: function(user, vizId, res) {
        if (!user.canPlayRoleOf('admin')) {
            return handleError(res, new Error('Unauthorized'))
        }

        return Visualization.findOne({ _id: vizId })
            .then(viz => {
                viz.hiddenFromFeed = !viz.hiddenFromFeed
                return viz.saveAndPopulate()
            })
            .then(viz => res(null, viz))
            .catch(handleError.bind(null, res))

    },
}

module.exports = VisualizationAPI
