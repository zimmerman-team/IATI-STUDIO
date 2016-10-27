import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import DescriptionForm from './BasicInformationDescriptionForm'
import DateForm from './BasicInformationDateForm'
import ContactForm from './BasicInformationContactForm'

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderLanguageSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option>Select a language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);



class BasicInformationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  //@todo: Move IATI activity editor to separate component.
  render() {
    const {handleSubmit, pristine, reset, submitting, previousPage} = this.props;
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
            <DescriptionForm />
          </div>
          <div className="row">
            <div className="columns small-centered small-12">
              <h2 className="page-title with-tip">Status</h2>
              <Tooltip className="inline" tooltip="Status text goes here">
                <i className="material-icons">info</i>
              </Tooltip>
            </div>
            <div className="row">
              <div className="columns small-6">
                <div>
                  <div>
                    <Field name="status" component="select">
                      <option>Select status</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/*<DateForm />*/}
            </div>
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to identification</button>
              <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to participating organisations
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',
  destroyOnUnmount: false,

})(BasicInformationForm)
