/*
 * Create Activity reducers
*/

import { ACTIVITY_FORM_VALIDATION_REQUEST,
  ACTIVITY_FORM_VALIDATION_SUCCESS,
  ACTIVITY_FORM_VALIDATION_FAILURE } from '../actions/validation'


function validation(state = {}, action) {
    switch (action.type) {
        case ACTIVITY_FORM_VALIDATION_REQUEST:
            return Object.assign({}, state, {
              formData: action.formData,
              validationErrors: action.validationErrors
            });
        case ACTIVITY_FORM_VALIDATION_SUCCESS:
            return Object.assign({}, state, {
              formData: action.formData,
              validationErrors: action.validationErrors
            });
        case ACTIVITY_FORM_VALIDATION_FAILURE:
            return Object.assign({}, state, {
              formData: action.formData,
              validationErrors: action.validationErrors
            });
        default:
            return state
    }
}

export default validation
