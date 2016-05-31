"use strict"

const assert = require('assert')
const _ = require('lodash')
const mongoose = require("mongoose");

const Visualization = require('../models/Visualization')
const User = require('../models/User')
const VizAPI = require('../api/Visualizations.js')
const config = require('../config/config')

let dummyVisualization = function() {
    /*
     * Store items per aggregation type
    */
    return new Visualization({
        type: 'bar',
        base_group: 'transaction_date_year',

        context: {
            reporting_organisations: ['GB-1', 'arie123']
        },

        // context: [
        //     { id: 'GB-1', type: 'reporting_organisations' }
        // ],

        // items: {
        //     'sector': [
        //         { id: '11110', context: {}, aggregations: 'disbursement', }
        //         { id: '11120', context: {}, aggregations: 'disbursement', }
        //     ],
        //     'recipient_country': [
        //         { id: 'AF', context: { hierarchy: '1' }, aggregations: 'disbursement' },
        //         { id: 'AF', context: { hierarchy: '1' }, aggregations: 'disbursement' },
        //     ]
        // }
        items: [ // TODO: Flatten this per type? - 2016-01-26
            // { type: 'sector', context: { hierarchy: '1' } },
            { type: 'sector', id: '11110', context: { hierarchy: '2' }, aggregation: 'disbursement' },
            { type: 'recipient_country', id: 'AF', context: { hierarchy: '1' }, aggregation: 'commitment' },
        ]
    })
}

let dummyUser = function() {
    return new User({
        username: 'test',
        password: 'test'
    })
}

describe('Visualization Model', function() {
    describe('getResult', function() {
        it('should compose a list of OIPA queries given a Visualization object', function() {
            
        })

        it('should return a flat result given a Visualization object', function(done) {
            let visualization = dummyVisualization();

            visualization.getResult().then((result) => {
                assert(_.isArray(result))
            }).then(done, done)
        })
    })
})
 
describe('VisualizationAPI', function() {

    // before((done) => mongoose.connect(config.test_database.url, done))

    // after((done) => {
    //     mongoose.connection.db.dropDatabase(() => {
    //         mongoose.connection.close();
    //         done()
    //     })
    // })

    describe('Create visualization', function() {
        it('should create a new visualization', function(done) {
            let visualization = dummyVisualization();
            let user = dummyUser();

            VizAPI.create(user, visualization, (err, viz) => {
                assert.ifError(err)
                assert(_.isArray(viz.result))
                done()
            })
        })

        it('should add a new item', function(done) {

            let visualization = dummyVisualization();

            let user = dummyUser();
            user.save()

             visualization.result = [ 
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 1998,
                y: 85323962.41 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 1999,
                y: 68111921.99 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2000,
                y: 62847624.78 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2001,
                y: 57963185.43 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2002,
                y: 60258041.87 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2003,
                y: 168203250.63 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2004,
                y: 103523765.87 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2005,
                y: 128257353.41 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2006,
                y: 130679573.02 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2007,
                y: 158302651.58 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2008,
                y: 72568613.68 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2009,
                y: 107444262.99 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2010,
                y: 554499345.56 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2011,
                y: 888926259.77 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2012,
                y: 805118119.44 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2013,
                y: 835060345.45 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2014,
                y: 616455932.04 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2015,
                y: 187208085.42 },
              { id: '11110',
                name: 'Education policy and administrative management',
                type: 'sector',
                x: 2016,
                y: 0 },
            ]

            visualization.author = user._id
            visualization.save()

            const data = {
                viz: visualization._id,
                item: { 
                    type: 'recipient_country',
                    id: 'AF',
                    context: { hierarchy: '1' },
                    aggregations: 'disbursement' 
                }
            }

            VizAPI.addItem(user, data, (err, viz) => {
                assert.ifError(err)
                assert(_.isArray(viz.result))
            }).then(done, done)
        })
    })
})
