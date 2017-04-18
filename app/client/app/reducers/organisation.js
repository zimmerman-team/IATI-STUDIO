
/*
 * Create Organisation reducers
 */

import _ from 'lodash'
import { createSelector } from 'reselect'
import * as ActionTypes from '../actions/organisation'
import { GET_OIPA_USER_REQUEST, GET_OIPA_USER_FAILURE, GET_OIPA_USER_SUCCESS } from '../actions/async'

const initialState = {
    isFetching: false,
    organisation: {}
};

function organisation(state = initialState, action) {
    switch (action.type) {
        case GET_OIPA_USER_SUCCESS:
            // get it from the user object
            // TODO: there is an assumption here that every user belongs to just one admin group - 2017-04-18
            return {
                organisation: action.response.admin_groups[0] && action.response.admin_groups[0].publisher && action.response.admin_groups[0].publisher.organisation,
                isFetching: false
            }

        case ActionTypes.GET_ORGANISATION_SUCCESS:
        case ActionTypes.UPDATE_ORGANISATION_SUCCESS:
            return {
                organisation: action.response,
                isFetching: false
            }

        case ActionTypes.MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS:
            return {
                ...state,
                organisation: {
                    ...state.organisation,
                    'published_state': {
                        ...state.organisation.published_state,
                        'ready_to_publish': action.response
                    }
                }
            }

        case ActionTypes.DELETE_ORGANISATION_SUCCESS:
            return { isFetching: false }

        case ActionTypes.CREATE_ORGANISATION_SUCCESS:
            return action.response

        case GET_OIPA_USER_REQUEST:
        case ActionTypes.GET_ORGANISATION_REQUEST:
        case ActionTypes.CREATE_ORGANISATION_REQUEST:
        case ActionTypes.UPDATE_ORGANISATION_REQUEST:
        case ActionTypes.DELETE_ORGANISATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        default:
            return state
    }
}

// export const activitiesSelector = createSelector(
//     state => state.entities.activities,
//     (activities) => _.map(activities, x => x) // to array
// )

// export const descriptionsSelector = createSelector(
//     state => state.organisation.descriptions,
//     (descriptions) => _.map(descriptions, x => x) // to array
// )

export default organisation
