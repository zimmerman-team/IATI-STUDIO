/*
 * Visualization reducers
*/

// TODO: Separate this file - 2016-02-15
// TODO: Immutable datastructures for performance - 2016-03-24

import { combineReducers } from 'redux'
import _ from 'lodash'
import activity from './reducers/createActivity'
import sidebar from './reducers/sidebar'


// TODO: just import everything - 2016-03-23
import {
    ADD_VIZ,
    DELETE_VIZ,
    UPDATE_VIZ,
    CHANGE_ORDER,
    CHANGE_CONTEXT,
    REPLACE_CONTEXT,
    GET_CONTEXT_FILTERS,
    GET_ITEM_FILTERS,
    SET_ACTIVE_VIZ,
    UNSET_ACTIVE_VIZ,
    TOGGLE_NAV,
    CHANGE_LEVEL,
    TOGGLE_MAINMENU,
    ITEMS_LOADING,
    CONTEXT_LOADING,
    CHART_LOADING,
    ALL_VIZ_LOADING,
    INVALIDATE_NOTIFICATION,
    MAX_ITEMS_REACHED,
    MAX_VIZ_REACHED,
    RESET_ERROR_MESSAGE,
    CLIENT_ERROR,
    INITIAL_PARAMS,
    EDIT_ACTIVE,
} from './actions/sync'

import * as ActionTypes from './actions/async'

// items array of Id's
// // TODO: Should be handled by normalizr - 2016-02-16
function itemsArray(state, action) {
    switch(action.type) {

        case ActionTypes.ADD_ITEM_SUCCESS:
            return [
                ...state,
                action.response.result
            ]

        case ActionTypes.REMOVE_ITEM_SUCCESS:
            return _.without(state, action.itemId)

        default:
            return state
    }
}


// context array with id's
function contextArray(state, action) {
    // needed to assign to state, because of context object structure
    switch(action.type) {
        case ActionTypes.ADD_CONTEXT_SUCCESS:
        case ActionTypes.REPLACE_CONTEXT_SUCCESS:
            return [
                ...state,
                action.response.result.context
            ]
        case ActionTypes.REMOVE_CONTEXT_SUCCESS:
        case ActionTypes.REPLACE_CONTEXT_SUCCESS:
            return _.without(state, action.contextId)

        default:
            return state
    }
}

function contextFilters(state={}, action) {
    switch(action.type) {
        case ActionTypes.GET_CONTEXT_FILTERS_SUCCESS:
            return action.response
        default:
            return state
    }
    return state
}

function itemFilters(state={}, action) {
    switch(action.type) {
        case ActionTypes.GET_ITEM_FILTERS_SUCCESS:
            return action.response
        default:
            return state
    }
    return state
}

/*
 * The current active visualization being displayed
 * Should be called by react-router so views can react appropriately
*/

const initialVizState = {
    id: null,
    isFetching: true,
    orderBy: "name",
    reverse: false,
}

function activeVisualization(state=initialVizState, action) {
    switch(action.type) {
        case ActionTypes.GET_VIZ_SUCCESS:
            return {
                ...state,
                id: action.response.result,
                isFetching: false,
            }
        case UNSET_ACTIVE_VIZ:
            return _.merge({},  state, {
                isFetching: true,
            })
        case CHANGE_ORDER:
            return _.merge({},  state, {
                orderBy: action.orderBy,
                reverse: action.reverse
            })
        default:
            return state
    }
}

function navState(state={ showNav: true, level: 'cb-main', menuState: false}, action) {
    switch(action.type) {
        case TOGGLE_NAV:
            return Object.assign({}, state, {
                showNav: !state.showNav
            })

        case TOGGLE_MAINMENU:
            return Object.assign({}, state, {
                menuState: action.show
            })

        case CHANGE_LEVEL:
            return Object.assign({}, state, {
                level: action.level
            })

        default:
            return state
    }
}

// keeps track of the number of calls being made for each request
// // TODO: Change to tokens? - 2016-05-11
function requestCount(state={}, action) {
    if (action.type.endsWith('REQUEST') && action.preserveOrder) {
        if (state[action.type]) {
            return Object.assign({}, state, {
                [action.type]: state[action.type] + 1,
            })
        }
        else {
            return Object.assign({}, state, {
                [action.type]: 1,
            })
        }
    }
    return state
}

function saveState(state={ editing: false }, action) {
    switch(action.type) {
        case EDIT_ACTIVE:
            return Object.assign({}, state, {
                editing: action.show,
            })
        default:
            return state
    }
}

function loadState(state={ loadingItems: true, loadingContext: true, loadingChart: false, loadingAllViz: true}, action) {
    switch(action.type) {
        case ActionTypes.GET_VIZ_REQUEST:
        case ActionTypes.REFRESH_VIZ_REQUEST:
        case ActionTypes.ADD_ITEM_REQUEST:
        case ActionTypes.REMOVE_ITEM_REQUEST:
        case ActionTypes.ADD_CONTEXT_REQUEST:
        case ActionTypes.REMOVE_CONTEXT_REQUEST:
        case ActionTypes.REPLACE_CONTEXT_REQUEST:
            return Object.assign({}, state, {
                loadingChart: true
            })

        case ActionTypes.GET_VIZ_SUCCESS:
        case ActionTypes.UPDATE_VIZ_SUCCESS:
        case ActionTypes.REFRESH_VIZ_SUCCESS:
        case ActionTypes.ADD_ITEM_SUCCESS:
        case ActionTypes.REMOVE_ITEM_SUCCESS:
        case ActionTypes.ADD_CONTEXT_SUCCESS:
        case ActionTypes.REMOVE_CONTEXT_SUCCESS:
        case ActionTypes.REPLACE_CONTEXT_SUCCESS:
        case ActionTypes.GET_VIZ_FAILURE:
        case ActionTypes.UPDATE_VIZ_FAILURE:
        case ActionTypes.REFRESH_VIZ_FAILURE:
        case ActionTypes.ADD_ITEM_FAILURE:
        case ActionTypes.REMOVE_ITEM_FAILURE:
        case ActionTypes.ADD_CONTEXT_FAILURE:
        case ActionTypes.REMOVE_CONTEXT_FAILURE:
        case ActionTypes.REPLACE_CONTEXT_FAILURE:
            return Object.assign({}, state, {
                loadingChart: false
            })

        case ActionTypes.GET_CONTEXT_FILTERS_REQUEST:
            return Object.assign({}, state, {
                loadingContext: true,
            })
        case ActionTypes.GET_CONTEXT_FILTERS_SUCCESS:
        case ActionTypes.GET_CONTEXT_FILTERS_FAILURE:
            return Object.assign({}, state, {
                loadingContext: false,
            })

        case ActionTypes.GET_ITEM_FILTERS_REQUEST:
            return Object.assign({}, state, {
                loadingItems: true,
            })
        case ActionTypes.GET_ITEM_FILTERS_SUCCESS:
        case ActionTypes.GET_ITEM_FILTERS_FAILURE:
            return Object.assign({}, state, {
                loadingItems: false,
            })

        // TODO: separate public/private loading states - 2016-05-24
        case ActionTypes.GET_ALL_VIZ_REQUEST:
        case ActionTypes.GET_ALL_PUBLIC_VIZ_REQUEST:
            return Object.assign({}, state, {
                loadingAllViz: true,
            })
        case ActionTypes.GET_ALL_VIZ_SUCCESS:
        case ActionTypes.GET_ALL_VIZ_FAILURE:
        case ActionTypes.GET_ALL_PUBLIC_VIZ_SUCCESS:
        case ActionTypes.GET_ALL_PUBLIC_VIZ_FAILURE:
            return Object.assign({}, state, {
                loadingAllViz: false,
            })

        default:
            return state
    }
}

// TODO: Write general wrapper for fall-through cases using normalizr - 2016-02-17
function visualizations(state={}, action) {

    switch(action.type) {
        case DELETE_VIZ:
            return _.omit(state, action.id)

        case ActionTypes.EMPTY_TRASH_SUCCESS:
            return _.pickBy(state, viz => !viz.archived)

        case ActionTypes.ADD_CONTEXT_SUCCESS:
        case ActionTypes.REMOVE_CONTEXT_SUCCESS:
        case ActionTypes.REPLACE_CONTEXT_SUCCESS:
            return {
                ..._.omit(state, action.vizId),
                [action.vizId]: {
                    ...state[action.vizId],
                    context: contextArray(state[action.vizId].context, action)
                }
            }

        case ActionTypes.ADD_ITEM_SUCCESS:
            return {
                ..._.omit(state, action.vizId),
                [action.vizId]: {
                    ...state[action.vizId],
                    items: itemsArray(state[action.vizId].items, action)
                }
            }
        case ActionTypes.REMOVE_ITEM_SUCCESS:
            return {
                ..._.omit(state, action.vizId),
                [action.vizId]: {
                    ...state[action.vizId],
                    ...action.response.entities.visualizations[action.response.result],
                    items: itemsArray(state[action.vizId].items, action)
                }
            }

        default:
            if (action.response && action.response.entities && action.response.entities.visualizations) {
                return _.merge({}, state, action.response.entities.visualizations)
            }

            return state
    }
}

// items by _id, referenced by viz in viz.items
function items(state={}, action) {
    switch(action.type) {

        // completely replaced...
        case ActionTypes.REFRESH_VIZ_SUCCESS:
            return action.response.entities.items || state

        // updated items, replace them
        case ActionTypes.ADD_CONTEXT_SUCCESS:
        case ActionTypes.REMOVE_CONTEXT_SUCCESS:
        case ActionTypes.REPLACE_CONTEXT_SUCCESS:
            return {
                ...state,
                ...action.response.entities.items,
            }

        case ActionTypes.REMOVE_ITEM_SUCCESS:
            return _.omit(state, action.itemId)

        default:
            if (action.response && action.response.entities && action.response.entities.items) {
                return _.merge({}, state, action.response.entities.items)
            }

            return state
    }
}

// context by _id, referenced by viz in viz.contexts
function context(state={}, action) {
    switch(action.type) {
        case ActionTypes.REMOVE_CONTEXT_SUCCESS:
            return _.omit(state, action.contextId)

        case ActionTypes.REPLACE_CONTEXT_SUCCESS:
                return _.merge(
                    {},
                    _.omit(state, action.contextId),
                    action.response.entities.context,
                )

        default:
            if (action.response && action.response.entities && action.response.entities.context) {
                return _.merge({}, state, action.response.entities.context)
            }

            return state
    }
}

function apiKeyValidationForm(state={}, action) {
    switch(action.type) {
        case ActionTypes.GET_API_KEY_VALIDATION_REQUEST:
            return Object.assign({}, state, {
                fetchingResponse: true,
                message: {},
            })
        case ActionTypes.GET_API_KEY_VALIDATION_ERROR:
            return Object.assign({}, state, {
                fetchingResponse: false,
                message: action,
            })
        case ActionTypes.GET_API_KEY_VALIDATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingResponse: false,
                message: {},
            })
        case ActionTypes.GET_API_KEY_UNLINK_REQUEST:
            return Object.assign({}, state, {
                fetchingResponse: true,
                message: {},
            })
        case ActionTypes.GET_API_KEY_UNLINK_ERROR:
            return Object.assign({}, state, {
                fetchingResponse: false,
                message: action,
            })
        case ActionTypes.GET_API_KEY_UNLINK_SUCCESS:
            return Object.assign({}, state, {
                fetchingResponse: false,
                message: {},
            })
        default:
            return state
    }
}

const initialPublisherState = {
  validationStatus: false,
  datasets: [],
  autoPublish: false
}

function publisher(state=initialPublisherState, action) {
    switch(action.type) {
        case ActionTypes.GET_PUBLISHER_SUCCESS:
            return {
              ...state,
              ...action.response.entities.publisher[action.response.result]
            }
        case ActionTypes.GET_API_KEY_VALIDATION_SUCCESS:
            return {
              ...state,
              ...action.response
            }
        case ActionTypes.GET_API_KEY_UNLINK_SUCCESS:
            return {
              ...initialPublisherState
            }
        case ActionTypes.UPDATE_PUBLISHER_SUCCESS:
            return {
              ...state,
              ...action.response
            }
        case ActionTypes.PUBLISH_DATASET_SUCCESS:
            return {
              ...state,
              ...action.response
            }
        case ActionTypes.DELETE_DATASET_SUCCESS:
            return {
              ...state,
              ...action.response
            }
        case ActionTypes.UPDATE_DATASET_SUCCESS:
            return {
              ...state,
              ...action.response
            }
        default:
            return state
    }
}

// TODO: separate this - 2016-03-31
function notificationCenter(state=[], action) {

    if (action.type.endsWith('FAILURE')) {
        return [
            ...state,
            { id: _.uniqueId(), type: 'error', text: action.error }
        ]
    }

    switch(action.type) {
        case INVALIDATE_NOTIFICATION:
            return [
                ...state.slice(1)
            ]
        case CLIENT_ERROR:
            return [
                ...state,
                { id: _.uniqueId(), type: 'error', text: action.message }
            ]
        case ActionTypes.UPDATE_VIZ_SUCCESS:
            if (action.updateType == 'restore') {
                return [
                    ...state,
                    { id: _.uniqueId(), type: 'info', text: "Chart restored to library"}
                ]
            }
            else if (action.updateType == 'archive') {
                return [
                    ...state,
                    { id: _.uniqueId(), type: 'info', text: "Chart moved to trash"}
                ]
            }
            else if (action.updateType == 'publish') {
                return [
                    ...state,
                    { id: _.uniqueId(), type: 'info', text: "Chart successfully published"}
                ]
            }
            else if (action.updateType == 'unpublish') {
                return [
                    ...state,
                    { id: _.uniqueId(), type: 'info', text: "Chart successfully unpublished"}
                ]
            }
            else if (action.updateType == 'save') {
                return [
                    ...state,
                    { id: _.uniqueId(), type: 'info', text: "Chart successfully saved"}
                ]
            }
            else {
                return [
                    ...state
                ]
            }
        case ActionTypes.CREATE_VIZ_SUCCESS:
            return [
                ...state,
                { id: _.uniqueId(), type: 'info', text: "New chart created"}
            ]

        case ActionTypes.FORK_VIZ_SUCCESS:
            return [
                ...state,
                { id: _.uniqueId(), type: 'info', text: "Duplicated the chart"}
            ]

        case ActionTypes.UPDATE_USER_PROFILE_SUCCESS:
            return [
                ...state,
                { id: _.uniqueId(), type: 'info', text: "Profile succesfully saved"}
            ]

        case MAX_ITEMS_REACHED:
            return [
                ...state,
                { id: _.uniqueId(), type: 'error', text: "The maximum number of 20 data items is reached."}
            ]

        default:
            return state
    }
}

import paginate from './paginate'
import { LOCATION_CHANGE } from 'react-router-redux'

// TODO: initial state from query params - 2016-05-19
function publicVisualizationPagination(state = {
    isFetching: false,
    filters: {
        orderBy: '-last_updated',
        search: '',
        type: '',
    },
    pageCount: 1,
    pageSize: 6,
    count: null,
    lastPage: null,
    prevPage: null,
    nextPage: null,
    ids: [],
}, action) {
    switch(action.type) {
        case INITIAL_PARAMS:
            return _.merge({},  state, {
                filters: _.pick(
                    action.params,
                    Object.keys(state.filters),
                ),
                pageCount: parseInt(action.params.pageCount) || state.pageCount,
            })
        case ActionTypes.GET_ALL_PUBLIC_VIZ_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case ActionTypes.GET_ALL_PUBLIC_VIZ_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                // ids: _.union(state.ids, action.response.result),
                ids: action.response.result,
                // pageCount: state.pageCount + 1
                filters: action.params,
                pageCount: action.page,
                count: action.response.count,
                lastPage: action.response.lastPage,
                prevPage: action.response.prevPage,
                nextPage: action.response.nextPage,
            })
        case ActionTypes.GET_ALL_PUBLIC_VIZ_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}

const pagination = combineReducers({
    publicVisualizationPagination,
    // publicVisualizations: paginate({ // keep track of pages
    //     // mapActionToKey: action => action.page,
    //     initialPage: 1, // TODO: get this from query params - 2016-05-19
    //     types: [
    //         ActionTypes.GET_ALL_VIZ_REQUEST,
    //         ActionTypes.GET_ALL_VIZ_SUCCESS,
    //         ActionTypes.GET_ALL_VIZ_FAILURE,
    //     ],
    // })
})


const entities = combineReducers({
    visualizations,
    items,
    context,
    itemFilters
})

// error handling, for displaying to user
function errorMessage(state = null, action) {
    const { type, error } = action

    if (type === RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }
    return state
}

function user(state={}, action) {
    switch(action.type) {
        case ActionTypes.UPDATE_USER_UI_SUCCESS:
            return action.response
        case ActionTypes.UPDATE_USER_PROFILE_SUCCESS:
            return action.response
        default:
            return state
    }
}

import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'


const rootReducer = combineReducers({
    entities,
    activeVisualization,
    contextFilters,
    itemFilters,
    navState,
    saveState,
    loadState,
    requestCount,
    notificationCenter,
    routing,
    errorMessage,
    user,
    pagination,
    publisher,
    activity,
    sidebar,
    apiKeyValidationForm,
    form: formReducer
})

export default rootReducer





/*
 * SELECTORS
 * See https://github.com/reactjs/reselect
*/

import { createSelector } from 'reselect'

function getVisualizationById(visualizations, _id) {
    return visualizations[_id]
}

function getItemsByVizId(visualization, items) {
    let vizItems = _.pick(items, visualization.items)
    return _.map(vizItems, x => x) // to array
}

function getContextByVizId(visualization, context) {
    let vizContext = _.pick(context, visualization.context)
    return _.map(vizContext, x => x) // to array
}

export const idSelector = (state, props) => (
    (props.params && props.params.id) || props.id
)
export const activeVisualizationSelector = (state, props) => (
    state.entities.visualizations[(props.params && props.params.id) || props.id]
)

export const userSelector = state => state.user
export const visualizationsSelector = state => state.entities.visualizations
export const itemsSelector = state => state.entities.items
export const contextSelector = state => state.entities.context
export const contextFilterSelector = state => state.contextFilters
export const itemFilterSelector = state => state.itemFilters

// auth states
export const isLoggedIn = state => state.user && !_.isEmpty(state.user)
export const isAdmin = state => state.user && state.user.roles && state.user.roles.admin


/*
 * Only get visualizations owned by current user, which are not trashed
*/
export const myVisualizationsSelector = createSelector(
    visualizationsSelector,
    userSelector,
    (visualizations, user) => _.filter(visualizations, (viz) => (
        (viz.author._id === user._id) && !viz.archived
    ))
)


/*
 * Only get visualizations owned by current user, which are trashed
*/
export const trashedVisualizationsSelector = createSelector(
    visualizationsSelector,
    userSelector,
    (visualizations, user) => _.filter(visualizations, (viz) => (
        (viz.author._id === user._id) && viz.archived
    ))
)

/*
 * Only visualizations with public=true
*/
// export const publicVisualizationsSelector = createSelector(
//     visualizationsSelector,
//     (visualizations) => _.filter(visualizations, (viz) => (
//         viz.public
//     ))
// )

export const publicVisualizationPaginationSelector = state => state.pagination.publicVisualizationPagination

/*
 * Only visualizations with public=true and paginated by page
*/
export const publicVisualizationsSelector = createSelector(
    visualizationsSelector,
    publicVisualizationPaginationSelector,
    (visualizations, publicVisualizationPagination) => {
        return publicVisualizationPagination.ids.map(id => visualizations[id])
    })

export const visualizationItemSelector = createSelector(
    activeVisualizationSelector,
    itemsSelector,
    (activeVisualization, items) => {
        if (!activeVisualization) {
            return null
        }

        return getItemsByVizId(
            activeVisualization,
            items
        )
    }
)

export const visualizationContextSelector = createSelector(
    activeVisualizationSelector,
    contextSelector,
    (activeVisualization, context) => {
        if (!activeVisualization) {
            return null
        }

        return getContextByVizId(
            activeVisualization,
            context
        )
    }
)
