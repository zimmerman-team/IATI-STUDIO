import { Schema, arrayOf, normalize } from 'normalizr'
import { wrapPromise } from '../utils/promise.js'
import 'isomorphic-fetch'

export const CALL_PUBLIC_API = Symbol('CALL_PUBLIC_API')

function parsePaginationHeaders(response) {
    const count = response.headers.get('X-Total-Count')
    const lastPage = response.headers.get('X-Last-Page')
    const prevPage = response.headers.get('X-Prev-Page')
    const nextPage = response.headers.get('X-Next-Page')

    return {
        count: parseInt(count),
        lastPage: parseInt(lastPage),
        prevPage: prevPage ? parseInt(prevPage) : null,
        nextPage: nextPage ? parseInt(nextPage) : null,
    }
}

export default store => next => action => {
    const callAPI = action[CALL_PUBLIC_API]
    if (typeof callAPI === "undefined") {
        return next(action)
    }

    let { endpoint } = callAPI
    const { schema, types } = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!schema) {
        throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_PUBLIC_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType, endpoint }))

    return callApi(endpoint, schema).then(
        response => next(actionWith({
            type: successType,
            response,
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || "An error occured"
        }))
    )
}

const API_ROOT = '/api/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    return fetch(fullUrl, { credentials: 'same-origin' })
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json)
            }

            // const camelizedJson = camelizeKeys(json)
            const pagination = parsePaginationHeaders(response)

            return Object.assign({},
                normalize(json, schema),
                pagination,
                // { nextPageUrl }
            )
        })
}

