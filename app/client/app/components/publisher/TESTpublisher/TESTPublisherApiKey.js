'use strict'

import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import classNames from 'classNames'

const validate = values => {
  const errors = {}
  if (!values.registryApiKey) {
    errors.validationStatus = 'Required'
  } else if (values.registryApiKey.length <= 8){
    errors.validationStatus = 'Required'
  }
  return errors
}

const renderKeyField = ({ input, label, type, meta: { touched, error } }) => (
  <input {...input} placeholder={label} type={type}/>
)

const renderField = ({ input, label, inputClasses, type, meta: { error } }) => (
  <div>
      <input {...input} className={inputClasses} type={type} disabled />
      { error && <span>{error}</span>}
  </div>
)


let PublisherFormIatiRegistryApiKey = React.createClass({
  getInitialState: function () {
    return {
      validKey: false
    }
  },
  handleSubmit: function (e) {
    e.preventDefault()
    this.setState({validKey: true})
  },
  render: function () {

    let vsClassnames = classNames( "input-group-field", {
      inputNotValidated: !this.state.validKey,
      inputValidated: this.state.validKey
    })

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="columns small-12 medium-6">
          <div>
            <h6>IATI Registry API key</h6>
            <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
          </div>
          <div className="input-group">
            <Field className="input-group-field" name="registryApiKey" type="text" component={renderKeyField} label="Enter your API key"/>

            <div className="input-group-button">
              <input type="submit" className="button" value="Validate" />
            </div>
          </div>
        </div>
        <div className="columns small-12 medium-6">
          <div>
            <h6>Current status</h6>
            <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
          </div>
          <div className="input-group">
            <Field inputClasses={vsClassnames} name="validationStatus" type="text" component={renderField} value="NOT VALIDATED" disabled />
          </div>
        </div>
      </form>
    )
  }
})

export default reduxForm({
  form: 'PublisherRegistryValidation',  // a unique identifier for this form
  validate                 // <--- validation function given to redux-form
})(PublisherFormIatiRegistryApiKey)
