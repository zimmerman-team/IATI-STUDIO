
import {CALL_API} from '../middleware/api'
import {arrayOf} from 'normalizr'
import * as Schemas from '../schemas'
import _ from 'lodash'

/*
 * MarkReadyToPublish organisation
 */
export const MARK_READY_TO_PUBLISH_ORGANISATION_REQUEST = 'MARK_READY_TO_PUBLISH_ORGANISATION_REQUEST';
export const MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS = 'MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS';
export const MARK_READY_TO_PUBLISH_ORGANISATION_FAILURE = 'MARK_READY_TO_PUBLISH_ORGANISATION_FAILURE';
export function markReadyToPublishOrganisation(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [MARK_READY_TO_PUBLISH_ORGANISATION_REQUEST, MARK_READY_TO_PUBLISH_ORGANISATION_SUCCESS, MARK_READY_TO_PUBLISH_ORGANISATION_FAILURE],
            endpoint: 'Organisation.markReadyToPublish',
            payload: [publisherId, id],
        }
    }
}

/*
 * Get organisation (Identification form)
 */
export const GET_ORGANISATION_REQUEST = 'GET_ORGANISATION_REQUEST';
export const GET_ORGANISATION_SUCCESS = 'GET_ORGANISATION_SUCCESS';
export const GET_ORGANISATION_FAILURE = 'GET_ORGANISATION_FAILURE';

export function getOrganisation(publisherId, id) {
    return {
        [CALL_API]: {
            types: [GET_ORGANISATION_REQUEST, GET_ORGANISATION_SUCCESS, GET_ORGANISATION_FAILURE],
            endpoint: 'Organisation.get',
            payload: [publisherId, id],
            schema: Schemas.organisation,
        }
    }
}

/*
 * Create organisation (Identification form)
 */
export const CREATE_ORGANISATION_REQUEST = 'CREATE_ORGANISATION_REQUEST';
export const CREATE_ORGANISATION_SUCCESS = 'CREATE_ORGANISATION_SUCCESS';
export const CREATE_ORGANISATION_FAILURE = 'CREATE_ORGANISATION_FAILURE';
export function createOrganisation(publisherId, organisation) {
    return {
        [CALL_API]: {
            types: [CREATE_ORGANISATION_REQUEST, CREATE_ORGANISATION_SUCCESS, CREATE_ORGANISATION_FAILURE],
            endpoint: 'Organisation.create',
            payload: [publisherId, organisation],
            schema: Schemas.organisation,
        }
    }
}

/*
 * Update organisation (Identification form)
 */
export const UPDATE_ORGANISATION_REQUEST = 'UPDATE_ORGANISATION_REQUEST';
export const UPDATE_ORGANISATION_SUCCESS = 'UPDATE_ORGANISATION_SUCCESS';
export const UPDATE_ORGANISATION_FAILURE = 'UPDATE_ORGANISATION_FAILURE';
export function updateOrganisation(publisherId, organisationId, data) {

    console.log(data);

    return {
        [CALL_API]: {
            types: [UPDATE_ORGANISATION_REQUEST, UPDATE_ORGANISATION_SUCCESS, UPDATE_ORGANISATION_FAILURE],
            endpoint: 'Organisation.update',
            payload: [publisherId, organisationId, data ],
            schema: Schemas.organisation,
        }
    }
}

/*
 * Delete organisation (Identification form)
 */
export const DELETE_ORGANISATION_REQUEST = 'DELETE_ORGANISATION_REQUEST';
export const DELETE_ORGANISATION_SUCCESS = 'DELETE_ORGANISATION_SUCCESS';
export const DELETE_ORGANISATION_FAILURE = 'DELETE_ORGANISATION_FAILURE';
export function deleteOrganisation(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_ORGANISATION_REQUEST, DELETE_ORGANISATION_SUCCESS, DELETE_ORGANISATION_FAILURE],
            endpoint: 'Organisation.delete',
            payload: [publisherId, id],
        }
    }
}

