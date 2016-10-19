import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import {Tooltip } from '../general/Tooltip.react.jsx'
import { toggleMainMenu } from '../../actions/sync'
import { publishActivity }       from '../../actions/async'
import store from '../../app'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const validate = values => {
  const errors = {}

  if (!values.activityIdentifier) {
    errors.activityIdentifier = 'Required'
  }

  return errors
}


class ActivityForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="columns small-6">
              <Field
                name="activityIdentifier"
                type="text"
                component={renderField} label="Activity Identifier"/>
            </div>
            <div className="columns small-6">
              <Field name="iatiIdentifier" type="text" component={renderField} label="IATI Identifier" readonly="true" />
            </div>
            <div className="columns small-6">
              <Field name="hierarchyField" type="number" component={renderField} label="Hierarchy" />
            </div>

            <div className="columns small-12">
              <button className="button" type="submit" disabled={submitting} onClick={handleSubmit}>Submit</button>
              <button className="button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'syncValidation',     // a unique identifier for this form
  validate

})(ActivityForm)


