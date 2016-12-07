/*
 * Create Activity reducers
*/

import { GET_CODE_LIST_ITEMS_SUCCESS,
  CREATE_ACTIVITY_SUCCESS,
  ADD_BASIC_INFORMATION_SUCCESS,
  ADD_DOCUMENT_LINK_REQUEST,
  ADD_DOCUMENT_LINK_SUCCESS,
  ADD_DOCUMENT_LINK_FAILURE } from '../actions/activity'

function activity(state = {}, action) {
    switch (action.type) {
        case GET_CODE_LIST_ITEMS_SUCCESS:
            return Object.assign({}, state, {
                [action.extra]: action.response
            });
        case CREATE_ACTIVITY_SUCCESS:
            return Object.assign({}, state, {
                activity: action.response
            });
        case ADD_BASIC_INFORMATION_SUCCESS:
            return Object.assign({}, state, {
                activity: action.response
            });
        default:
            return state
    }
}

export default activity
