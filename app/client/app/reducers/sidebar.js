/*
 * Create Sidebar reducers
*/

import { FIELD_BLANK,
  FIELD_VALID,
  FIELD_INVALID,
  NAV_VALIDATION_CLASS,
  NAV_INVALIDATION_CLASS,
  sidebarNav,
  SIDEBAR_NAVIGATION_REQUEST,
  SIDEBAR_NAVIGATION_SUCCESS,
  SIDEBAR_NAVIGATION_FAILURE,
} from '../actions/sidebar'

function sidebar(state = sidebarNav, action) {
    switch (action.type) {
        case SIDEBAR_NAVIGATION_REQUEST:
          return state;
        case SIDEBAR_NAVIGATION_SUCCESS:
            let newNav =  sidebarNav.navigation;
            newNav[action.page] = action.navigation;
            return Object.assign({}, state, {
              page: action.page,
              navigation: newNav,
            });
        case SIDEBAR_NAVIGATION_FAILURE:
          return state;
        default:
            return state
    }
}

export default sidebar
