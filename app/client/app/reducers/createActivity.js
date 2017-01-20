/*
 * Create Activity reducers
 */

import _ from 'lodash'
import { createSelector } from 'reselect'
import * as ActionTypes from '../actions/activity'

const initialState = { }

function activity(state = initialState, action) {
    // if (action.type.startsWith('REQUEST')) {
    //     return { ...state, submitting: true, }
    // }

    switch (action.type) {
        // case ActionTypes.GET_CODE_LIST_ITEMS_SUCCESS:
        //     return Object.assign({}, state, {
        //         [action.extra]: action.response
        //     });
        case ActionTypes.GET_ACTIVITY_SUCCESS:
        case ActionTypes.CREATE_ACTIVITY_SUCCESS:
        case ActionTypes.GET_DESCRIPTIONS_SUCCESS:
        case ActionTypes.CREATE_DESCRIPTION_SUCCESS:
        case ActionTypes.UPDATE_DESCRIPTION_SUCCESS:
        case ActionTypes.CREATE_DATE_SUCCESS:
        case ActionTypes.UPDATE_DATE_SUCCESS:
        case ActionTypes.GET_STATUS_SUCCESS:
        case ActionTypes.CREATE_STATUS_SUCCESS:
        case ActionTypes.UPDATE_STATUS_SUCCESS:
        case ActionTypes.CREATE_CONTACT_SUCCESS:
        case ActionTypes.UPDATE_CONTACT_SUCCESS:
        case ActionTypes.GET_DOCUMENT_LINK_SUCCESS:
        case ActionTypes.CREATE_DOCUMENT_LINK_SUCCESS:
        case ActionTypes.UPDATE_DOCUMENT_LINK_SUCCESS:
        case ActionTypes.GET_PARTICIPATING_ORGANISATIONS_SUCCESS:
        case ActionTypes.CREATE_PARTICIPATING_ORGANISATION_SUCCESS:
        case ActionTypes.UPDATE_PARTICIPATING_ORGANISATION_SUCCESS:
        case ActionTypes.GET_RECIPIENT_COUNTRIES_SUCCESS:
        case ActionTypes.CREATE_RECIPIENT_COUNTRY_SUCCESS:
        case ActionTypes.UPDATE_RECIPIENT_COUNTRY_SUCCESS:
        case ActionTypes.GET_REGION_SUCCESS:
        case ActionTypes.CREATE_REGION_SUCCESS:
        case ActionTypes.UPDATE_REGION_SUCCESS:
        case ActionTypes.GET_SECTOR_SUCCESS:
        case ActionTypes.CREATE_SECTOR_SUCCESS:
        case ActionTypes.UPDATE_SECTOR_SUCCESS:
        case ActionTypes.GET_POLICY_SUCCESS:
        case ActionTypes.CREATE_POLICY_SUCCESS:
        case ActionTypes.UPDATE_POLICY_SUCCESS:
        case ActionTypes.GET_HUMANITARIAN_SCOPE_SUCCESS:
        case ActionTypes.CREATE_HUMANITARIAN_SCOPE_SUCCESS:
        case ActionTypes.UPDATE_HUMANITARIAN_SCOPE_SUCCESS:
        case ActionTypes.GET_TRANSACTION_SUCCESS:
        case ActionTypes.CREATE_TRANSACTION_SUCCESS:
        case ActionTypes.UPDATE_TRANSACTION_SUCCESS:
        case ActionTypes.CREATE_BUDGET_SUCCESS:
        case ActionTypes.UPDATE_BUDGET_SUCCESS:
        case ActionTypes.UPDATE_ACTIVITY_SUCCESS:
                return _.merge({}, state, (action.response.entities))


        case ActionTypes.DELETE_DESCRIPTION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'descriptions': _.omit(state.descriptions, action.id),
            }
        case ActionTypes.DELETE_PARTICIPATING_ORGANISATION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'participatingOrganisations': _.omit(state.participatingOrganisations, action.id),
            }
        case ActionTypes.DELETE_RECIPIENT_COUNTRY_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'recipientCountries': _.omit(state.recipientCountries, action.id),
            }
        case ActionTypes.DELETE_REGION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'recipient_region': _.omit(state.recipient_region, action.id),
            }
        case ActionTypes.DELETE_SECTOR_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'sector': _.omit(state.sector, action.id),
            }
        case ActionTypes.DELETE_POLICY_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'policy': _.omit(state.policy, action.id),
            }
        case ActionTypes.DELETE_HUMANITARIAN_SCOPE_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'humanitarian_scope': _.omit(state.humanitarian_scope, action.id),
            }
        case ActionTypes.DELETE_BUDGET_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'budgets': _.omit(state.budgets, action.id),
            }
        case ActionTypes.DELETE_TRANSACTION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'transactions': _.omit(state.transaction, action.id),
            }
        case ActionTypes.DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'activity': {},
            }

        // case ActionTypes.ADD_DOCUMENT_LINK_FAILURE:
        default:
            return state
    }
}

export const activitiesSelector = createSelector(
    state => state.entities.activities,
    (activities) => _.map(activities, x => x) // to array
)

export const publisherSelector = createSelector(
    /*
     * Select the publisher object from the first admin_group (if the user is in one)
    */
    state => state.user.oipaUser && state.user.oipaUser.admin_groups[0] && state.user.oipaUser.admin_groups[0].publisher,
    (p) => p
)

export const descriptionsSelector = createSelector(
    state => state.activity.descriptions,
    (descriptions) => _.map(descriptions, x => x) // to array
)

export const datesSelector = createSelector(
    state => state.activity.dates,
    (dates) => _.map(dates, x => x) // to array
)

export const statusSelector = createSelector(
    state => state.activity.activity_status,
    (activity_status) => _.map(activity_status, x => x) // to array
)

export const countryBudgetItemSelector = createSelector(
    state => state.activity.country_budget_items,
    (country_budget_items) => _.map(country_budget_items, x => x) // to array
)

export const transactionsSelector = createSelector(
    state => state.activity.transactions,
    (transactions) => _.map(transactions, x => x) // to array
)

export const plannedDisbursementsSelector = createSelector(
    state => state.activity.plannedDisbursements,
    (plannedDisbursements) => _.map(plannedDisbursements, x => x) // to array
)

export const documentLinksSelector = createSelector(
    state => state.activity.documentLink,
    (documentLink) => _.map(documentLink, x => x) // to array
)

export const policySelector = createSelector(
    state => state.activity.policy,
    (policy) => _.map(policy, x => x) // to array
)

export const regionsSelector = createSelector(
    state => state.activity.recipient_region,
    (recipient_region) => _.map(recipient_region, x => x) // to array
)

export const sectorsSelector = createSelector(
    state => state.activity.sector,
    (sector) => _.map(sector, x => x) // to array
)

export const humanitarianScopesSelector = createSelector(
    state => state.activity.humanitarian_scope,
    (humanitarian_scope) => _.map(humanitarian_scope, x => x) // to array
)

export const participatingOrganisationsSelector = createSelector(
    state => state.activity.participatingOrganisations,
    (participatingOrganisations) => _.map(participatingOrganisations, x => x) // to array
)

export const recipientCountriesSelector = createSelector(
    state => state.activity.recipientCountries,
    (recipient_countries) => _.map(recipient_countries, x => x) // to array
)

export const conditionsSelector = createSelector(
    state => state.activity.conditions,
    (conditions) => _.map(conditions, x => x) // to array
)

export const resultsSelector = createSelector(
    state => state.activity.results,
    (results) => _.map(results, x => x) // to array
)

export default activity
