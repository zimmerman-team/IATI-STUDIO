import * as ActionTypes from '../actions/async'
import _ from 'lodash'
import { createSelector } from 'reselect'

const initialPublisherState = {
  // validationStatus: false,
  // autoPublish: false,
  isFetching: false,
}

function publisher(state=initialPublisherState, action) {
    switch(action.type) {
        case ActionTypes.GET_OIPA_USER_SUCCESS:
        case ActionTypes.VERIFY_API_KEY_SUCCESS:
            return {
                ...state,
                ...action.response.admin_groups[0] && action.response.admin_groups[0].publisher,
            // TODO: change behaviour in OIPA to represent this behaviour - 2017-01-30
            activityDataset: _.find(action.response.admin_groups[0] && action.response.admin_groups[0].publisher && action.response.admin_groups[0].publisher.datasets, (p) => p.id && p.filetype === 'Activity' && p.added_manually ),
            organisationDataset: _.find(action.response.admin_groups[0] && action.response.admin_groups[0].publisher && action.response.admin_groups[0].publisher.datasets, (p) => p.id && p.filetype === 'Organisation' && p.added_manually ),

            }
        case ActionTypes.PUBLISH_ACTIVITIES_REQUEST:
            return {
                ...state,
            isFetching: true,
            }
        case ActionTypes.PUBLISH_ACTIVITIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                activityDataset: action.response
            }
        default:
            return state
    }
}

export const publisherSelector = createSelector(
    /*
     * Select the publisher object from the first admin_group (if the user is in one)
    */
    state => state.publisher,
    (p) => p
)

export default publisher
