
import * as ActionTypes from '../actions/activity'

function codelists(state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_CODE_LIST_ITEMS_SUCCESS:
            return Object.assign({}, state, {
                [action.extra]: action.response
            });
        default:
            return state
    }
}

export default codelists
