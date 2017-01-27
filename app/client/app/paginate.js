import union from 'lodash/union'
import isEmpty from 'lodash/isEmpty'

export default function pagination({ types, mapActionToKey }) {

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.')
    }
    if (typeof mapActionToKey !== 'function') {
        // throw new Error('Expected mapActionToKey to be a function.')
        mapActionToKey = () => ""
    }

    const [ requestType, successType, failureType ] = types

    function updatePagination(state = {
        isFetching: false,
        nextPage: undefined,
        pageCount: 1,
        ids: [],
    }, action) {
        switch(action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true,
                }
            case successType: 
                return {
                    ...state,
                    isFetching: false,
                    ids: union(state.ids, action.response.result.results),
                    pageCount: state.pageCount + 1,
                    next: action.response.result.next,
                    previous: action.response.result.previous,
                    count: action.response.result.count,
                }
            case failureType:
                return {
                    ...state,
                    isFetching: false
                }
            default:
                return state
        }
    }

    return function updatePaginationByKey(state = {}, action) {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType:
                const key = mapActionToKey(action)
                if (key && typeof key !== 'string') {
                    throw new Error('Expected key to be a string.')
                }

                if (key) { // merge by an action key
                    return {
                        ...state,
                        [key]: updatePagination(state[key], action)
                    }
                }
                else { // general pagination, not by a key
                    return updatePagination(isEmpty(state) ? undefined : state , action)
                }

            default:
                return state
        }
    }

}







