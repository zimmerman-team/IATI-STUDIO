
/*
 * Create Organisation reducers
 */

import _ from 'lodash'
import { createSelector } from 'reselect'
import * as ActionTypes from '../actions/organisation'
import { GET_OIPA_USER_REQUEST, GET_OIPA_USER_FAILURE, GET_OIPA_USER_SUCCESS } from '../actions/async'

const initialState = {
    isFetching: false,
    organisation: {},
    total_budgets: [],
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

        case ActionTypes.GET_TOTAL_BUDGETS_SUCCESS:
            return _.assign({}, state, action.response.entities, {isFetching: false});

        case ActionTypes.CREATE_TOTAL_BUDGET_SUCCESS:
        case ActionTypes.UPDATE_TOTAL_BUDGET_SUCCESS:
            return _.merge({}, state, action.response.entities, {isFetching: false});

        case ActionTypes.GET_ORGANISATION_SUCCESS:
        case ActionTypes.CREATE_ORGANISATION_SUCCESS:
        case ActionTypes.UPDATE_ORGANISATION_SUCCESS:
            return {
                ...state,
                organisation: action.response,
                isFetching: false
            }

        case ActionTypes.GET_REPORTING_ORGANISATION_REQUEST:
        case ActionTypes.CREATE_REPORTING_ORGANISATION_SUCCESS:
        case ActionTypes.UPDATE_REPORTING_ORGANISATION_SUCCESS:
            return {
                ...state,
                organisation: {
                    ...state.organisation,
                    reporting_organisation: action.response,
                },
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
                },
                isFetching: false
            }

        case ActionTypes.DELETE_ORGANISATION_SUCCESS:
            return { isFetching: false }

        case ActionTypes.DELETE_REPORTING_ORGANISATION_SUCCESS:
            return {
                ...state,
                organisation: {
                    ...state.organisation,
                    reporting_organisation: null,
                },
                isFetching: false
            }

        case ActionTypes.DELETE_TOTAL_BUDGET_SUCCESS:
            return {
                ...state,
                'total_budgets': _.omit(state.total_budgets, action.id),
                isFetching: false
            }

        case GET_OIPA_USER_REQUEST:
        case ActionTypes.GET_ORGANISATION_REQUEST:
        case ActionTypes.CREATE_ORGANISATION_REQUEST:
        case ActionTypes.UPDATE_ORGANISATION_REQUEST:
        case ActionTypes.DELETE_ORGANISATION_REQUEST:
        case ActionTypes.GET_REPORTING_ORGANISATION_REQUEST:
        case ActionTypes.CREATE_REPORTING_ORGANISATION_REQUEST:
        case ActionTypes.UPDATE_REPORTING_ORGANISATION_REQUEST:
        case ActionTypes.DELETE_REPORTING_ORGANISATION_REQUEST:
        case ActionTypes.GET_TOTAL_BUDGETS_REQUEST:
        case ActionTypes.CREATE_TOTAL_BUDGET_REQUEST:
        case ActionTypes.UPDATE_TOTAL_BUDGET_REQUEST:
        case ActionTypes.DELETE_TOTAL_BUDGET_REQUEST:
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

export const totalBudgetSelector = createSelector(
    state => state.organisation.total_budgets,
    (total_budgets) => _.map(total_budgets, x => x) // to array
)

export default organisation
