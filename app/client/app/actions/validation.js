
export const ACTIVITY_FORM_VALIDATION_REQUEST = 'ACTIVITY_FORM_VALIDATION_REQUEST';
export const ACTIVITY_FORM_VALIDATION_SUCCESS = 'ACTIVITY_FORM_VALIDATION_SUCCESS';
export const ACTIVITY_FORM_VALIDATION_FAILURE = 'ACTIVITY_FORM_VALIDATION_FAILURE';

export function validateForm(formData, validationErrors) {
    console.log('<<< action validateForm', formData, validationErrors);
  return {
    type: ACTIVITY_FORM_VALIDATION_SUCCESS,
    formData: formData,
    validationErrors: validationErrors,
  }
}

export function invalidateForm(formData, validationErrors) {
  return {
    type: ACTIVITY_FORM_VALIDATION_FAILURE,
    formData: formData,
    validationErrors: validationErrors,
  }
}
