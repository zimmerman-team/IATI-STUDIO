/*
 * Create Activity reducers
*/

import { GET_CODE_LIST_ITEMS_SUCCESS,
  CREATE_ACTIVITY_SUCCESS,
  ADD_BASIC_INFORMATION_SUCCESS,
  ADD_DOCUMENT_LINK_REQUEST,
  ADD_DOCUMENT_LINK_SUCCESS,
  ADD_DOCUMENT_LINK_FAILURE} from '../actions/createActivity'

export function createActivity(state = {}, action) {
    switch (action.type) {
        case GET_CODE_LIST_ITEMS_SUCCESS:
            console.log('<<<state before', state)
            const foo = Object.assign({}, state, {
                [action.extra]: action.response
            });
            console.log('<<<state after', state)
            return foo;
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
