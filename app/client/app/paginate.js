
export default function pagination({ types, mapActionToKey }) {

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.')
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.')
    }
    if (typeof mapActionToKey !== 'function') {
        throw new Error('Expected mapActionToKey to be a function.')
    }

    const [ requestType, successType, failureType ] = types

    function updatePagination(state = {
        isFetching: false,
        nextPage: undefined,
        pageCount: 0,
        ids: [],
    }, action) {
        switch(action.type) {
            case requestType:
                return merge({}, state, {
                    isFetching: true,
                })
            case successType: 
                return merge({}, state, {
                    isFetching: false,
                    ids: _.union(state.ids, action.response.result),
                    pageCount: state.pageCount + 1
                })
            case failureType:
                return merge({}, state, {
                    isFetching: false
                })
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
                    return merge({}, state, {
                        [key]: updatePagination(state[key], action)
                    })
                }
                else { // general pagination, not by a key
                    return updatePagination(state, action)
                }

            default:
                return state
        }
    }

}







