"use strict"

import DatabaseContainer from '../../utils/DatabaseContainer'
import mongoose from 'mongoose'
import _ from 'lodash'

import config from '../../config/config'
import { print, printTrace } from '../../utils/dev'

const User = mongoose.model('User')

var UserApi = {

    updateUI: function(user, uiState, res) {
	    return User
	        .findOneAndUpdate({_id: user._id}, {$set: { uiState: uiState }}, { new: true })
            .then(acc => res(null, acc))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    },

    updateProfile: function(user, newProfile, res) {
	    return User
	        .findOneAndUpdate({_id: user._id}, {$set: { firstName: newProfile.firstName, lastName: newProfile.lastName, email: newProfile.email }}, { new: true })
            .then(acc => res(null, acc))
            .catch((error) => {
                console.error(error.stack);
                res(error)
            })
    }
}

module.exports = UserApi
