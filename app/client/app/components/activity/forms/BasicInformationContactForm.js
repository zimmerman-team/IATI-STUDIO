import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderLanguageSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option></option>
          <option value="en">English</option>
          <option value="fr">French</option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderContactTypeSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option></option>
          <option value="en">Type1</option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderNarrative = ({fields, meta: {touched, error}}) => (
  <div>
    {fields.map((title, index) =>
      <div key={index}>
        <div className="columns small-6">
          <Field
            name={`${title}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${title}.language[code]`} label="Language"/>
      </div>
    )}
    <div className="columns">
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add Title</button>
      <button
        type="button"
        title="Remove Title"
        className="control-button remove float-right"
        onClick={() => fields.pop()}>Delete
      </button>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderContact = ({fields, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="columns small-6">
          <Field
            name={`${description}.date`}
            type="text"
            component={renderField}
            label="Date"
          />
        </div>
        <hr/>
        <h2 className="page-title">Narrative</h2>
        <div className="row">
          <div className="columns small-6">
            <Field
              name={`${description}.narrativeText`}
              type="text"
              component={renderField}
              label="Title"
            />
          </div>
          <Field component={renderLanguageSelect} name={`${description}.narrativeCode`} label="Language"/>
          <FieldArray name={`${description}.additionalNarratives`} component={renderNarrative}/>
        </div>
      </div>
    )}
    <div className="columns">
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
      <button
        type="button"
        title="Remove Title"
        className="control-button remove float-right"
        onClick={() => fields.pop()}>Delete
      </button>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.date) {
    errors.type = 'Required'
  }

  if (!values.narrative) {
    const narrativeTextObj = {};
    narrativeTextObj.text = 'Required';
    errors.narrative = narrativeTextObj
  }


  return errors
};


class BasicInformationContactForm extends React.Component {

  constructor(props) {
    super(props)
  }

  //@todo: Narratives are also common in all the form. Separate it out and create a single component for that.
  render() {
    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Contact info</h2>
            <Tooltip className="inline" tooltip="Contact info text goes here">
              <i className="material-icons">info</i>
            </Tooltip>
            <div className="field-list">
              <Field name="type" component={renderContactTypeSelect} label="Contact type"/>
              <hr/>
              <div>
                <h2 className="page-title">Organisation</h2>
                <div className="field-list">
                  <h2 className="page-title">Narrative</h2>
                  <div className="row">
                    <div className="columns small-6">
                      <Field
                        name="narrative[text]"
                        type="text"
                        component={renderField}
                        label="Title"
                      />
                    </div>
                    <Field component={renderLanguageSelect} name="narrative[code]" label="Language"/>
                    <FieldArray name="additionalNarratives" component={renderNarrative}/>
                  </div>
                </div>
              </div>
            </div>
            <FieldArray name="additionalDate" component={renderContact}/>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
  validate
})(BasicInformationContactForm)
