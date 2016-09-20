'use strict'

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { PublisherButton }        from '../general/List.react.jsx'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const ActivitiesDefaults = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Activity ID"/>

      <div>
        <PublisherButton type="submit" disabled={submitting} value='Submit' />
        <PublisherButton type="button" disabled={pristine || submitting} onClick={reset} value='Clear' />
      </div>

    </form>
  )
}

export default reduxForm({
  form: 'activityDefaults',  // a unique identifier for this form
  validate                 // <--- validation function given to redux-form
})(ActivitiesDefaults)
