
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'




import { browserHistory } from 'react-router'

export const INITIAL_PARAMS = 'INITIAL_PARAMS'
export function initialParams() {
    return {
        type: INITIAL_PARAMS,
        params: browserHistory.createLocation(window.location).query

    }
}

/*
 * Visualization Actions
*/

export const SET_ACTIVE_VIZ = 'SET_ACTIVE_VIZ'

export function setActiveViz(id) {
    return {
        type: SET_ACTIVE_VIZ,
        id: id
    }
}

export const CHANGE_ORDER = 'CHANGE_ORDER'
export function changeOrder(order, reverse=false) {
    return {
        type: CHANGE_ORDER,
        orderBy: order,
        reverse: reverse
    }
}

export const UNSET_ACTIVE_VIZ = 'UNSET_ACTIVE_VIZ'

export function unsetActiveViz() {
    return {
        type: UNSET_ACTIVE_VIZ,
    }
}


/*
 * UI State
*/
export const TOGGLE_NAV = 'TOGGLE_NAV'

export function toggleNav(){
    return {
        type: TOGGLE_NAV
    }
}

export const CHANGE_LEVEL = 'CHANGE_LEVEL'

export function changeLevel(level){
    return {
        type: CHANGE_LEVEL,
        level: level,
    }
}

export const TOGGLE_MAINMENU = 'TOGGLE_MAINMENU'

export function toggleMainMenu(bool){
    return {
        type: TOGGLE_MAINMENU,
        show: bool,
    }
}

/*
Notifications
*/

export const INVALIDATE_NOTIFICATION = 'INVALIDATE_NOTIFICATION'

export function invalidateNotification() {
    return {
        type: INVALIDATE_NOTIFICATION,
    }
}


/*
 * Error handling
*/

export const CLIENT_ERROR = 'CLIENT_ERROR'

export function clientError(message) {
    return {
        type: CLIENT_ERROR,
        message: message,
    }
}

export const SERVER_ERROR = 'SERVER_ERROR'

export function serverError(message) {
    return {
        type: SERVER_ERROR,
        message: message,
    }
}

export const MAX_ITEMS_REACHED = 'MAX_ITEMS_REACHED'
export function maxItemsReached() {
    return {
        type: MAX_ITEMS_REACHED,
    }
}

export const MAX_VIZ_REACHED = 'MAX_VIZ_REACHED'
export function maxVisualizationsReached() {
    return {
        type: MAX_VIZ_REACHED,
    }
}


/*
Loading state
*/

export const ITEMS_LOADING = 'ITEMS_LOADING'
export const CONTEXT_LOADING = 'CONTEXT_LOADING'
export const CHART_LOADING = 'CHART_LOADING'
export const ALL_VIZ_LOADING = 'ALL_VIZ_LOADING'

export function setLoadStateItems(bool) {
    return {
        type: ITEMS_LOADING,
        show:bool,
    }
}

export function setLoadStateContext(bool) {
    return {
        type: CONTEXT_LOADING,
        show:bool,
    }
}

export function setLoadStateUpdateChart(bool) {
    return {
        type: CHART_LOADING,
        show:bool,
    }
}

export function setLoadStateAllViz(bool) {
    return {
        type: ALL_VIZ_LOADING,
        show:bool,
    }
}

