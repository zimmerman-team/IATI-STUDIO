/*
 * Create Activity reducers
 */

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
                return _.merge({}, state, action.response.entities)

        case ActionTypes.DELETE_DESCRIPTION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'descriptions': _.omit(state.descriptions, action.id),
            }
        case ActionTypes.DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'activity': {},
            }

        case ActionTypes.ADD_BASIC_INFORMATION_SUCCESS:
            return Object.assign({}, state, {
                activity: action.response
            });
            // case ActionTypes.ADD_DOCUMENT_LINK_REQUEST:
        case ActionTypes.ADD_DOCUMENT_LINK_SUCCESS:
            return Object.assign({}, state, {
                activity: action.response
            });
        // case ActionTypes.ADD_DOCUMENT_LINK_FAILURE:
        default:
            return state
    }
}

export default activity
