
'use strict'

const _ = require('lodash');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // use ES6 promises

const Schema = mongoose.Schema;


formItemValidationSchema = new Schema({
    /*
     * validation status can be valid, invalid or unspecified
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
    activity: formItemValidationSchema, // general activity

    /*
     * Basic information
     */
    title: formItemValidationSchema,
    description: formItemValidationSchema,
    status: formItemValidationSchema,
    date: formItemValidationSchema,
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

