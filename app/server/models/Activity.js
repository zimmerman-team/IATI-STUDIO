
'use strict'

const _ = require('lodash');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // use ES6 promises

const Schema = mongoose.Schema;


formItemValidationRequiredSchema = new Schema({
    /*
     * validation status can be valid, invalid or unspecified
     * this is for required elements
    */
    status: {
        type: String,
        enum: [ 'valid', 'invalid', 'unspecified' ]
        default: 'invalid'
    },
})

formItemValidationSchema = new Schema({
    /*
     * validation status can be valid, invalid or unspecified
     * this is for optional elements
    */
    status: {
        type: String,
        enum: [ 'valid', 'invalid', 'unspecified' ]
        default: 'unspecified'
    },
})

const formValidationSchema = new Schema({
    /*
     * identification
     */
    activity: formItemValidationRequiredSchema, // general activity

    /*
     * Basic information
     */
    title: formItemValidationRequiredSchema,
    description: formItemValidationRequiredSchema,
    status: formItemValidationRequiredSchema,
    date: formItemValidationRequiredSchema,
    contact: formItemValidationSchema,

    /*
     * participating organisations
     */

    /*
     * Geopolitical information
     */

    /*
     * Classifications
     */

    /*
     * Financial
    */

    /*
     * Documents
    */

    /*
     * Relations
    */

    /*
     * Performance
    */


    splashScreen: {type: Boolean, default: false},
    joyride: {type: Boolean, default: true},
});

const ActivitySchema = new Schema({
    iatiId: { type: String },
    formValidation: {type: Object, default: {}},
},
{
        timestamps: { createdAt: 'created', updatedAt: 'last_updated' }
    })

export const Activity = mongoose.model('Activity', ActivitySchema)
export default Activity

