import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField} from '../helpers/FormHelper'

const renderCountryTypeSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option></option>
          <option value="1">+91</option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderCountry = ({fields, meta: {touched, error}}) => (
  <div>
    {fields.map((title, index) =>
      <div key={index}>
        <Field component={renderCountryTypeSelect} name={`${title}.country[code]`} label="Country Code"/>
        <div className="columns small-6">
          <Field
            name={`${title}.text`}
            type="text"
            component={renderField}
            label="Percentage"
          />
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

const renderDescription = ({fields, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="row">
          <Field
            name={`${description}.country[code]`}
            component={renderCountryTypeSelect}
            label="Country Code"
          />
          <div className="columns small-6">
            <Field
              name={`${description}.percentageText`}
              type="text"
              component={renderField}
              label="Percentage"
            />
          </div>
          <FieldArray name={`${description}.additionalCountry`} component={renderCountry}/>
        </div>
        <div className="row">
          <FieldArray
            name={`${description}.additionalDescription`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textName="text"
            textLabel="Title"
          />
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

  if (!values.country) {
    const typeLanguageObj = {};
    typeLanguageObj.code = 'Required';
    errors.country = typeLanguageObj
  }

  if (values.additionalCountry) {
    const narrativeArrayErrors = [];

    values.additionalCountry.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.country) {
        const codeObj = {};
        codeObj.code = 'Required';
        titleErrors.country = codeObj;
        narrativeArrayErrors[titleIndex] = titleErrors
      }
    });

    if (narrativeArrayErrors.length) {
      errors.additionalCountry = narrativeArrayErrors
    }
  }
  if (values.additionalDescription) {
    const narrativeArrayErrors = [];

    values.additionalDescription.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.country) {
        const codeObj = {};
        codeObj.code = 'Required';
        titleErrors.country = codeObj;
        narrativeArrayErrors[titleIndex] = titleErrors
      }
    });

    if (narrativeArrayErrors.length) {
      errors.additionalDescription = narrativeArrayErrors
    }
  }
  return errors
};


class RecipientCountryForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {activity} = this.props;
    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Recipient Country</h2>
            <Tooltip className="inline" tooltip="Description text goes here">
              <i className="material-icons">info</i>
            </Tooltip>
            <div className="field-list">
              <div className="row">
                <Field
                  name="country[code]"
                  component={renderCountryTypeSelect}
                  label="Country Code"
                />
                <div className="columns small-6">
                  <Field
                    name="percentageText"
                    type="text"
                    component={renderField}
                    label="Percentage"
                  />
                </div>
                <FieldArray name="additionalCountry" component={renderCountry}/>
              </div>
              <div className="row">
                <FieldArray
                  name="additionalTitles"
                  component={renderNarrativeFields}
                  languageOptions={activity["Language"]}
                  textName="textTitle"
                  textLabel="Title"
                />
              </div>
            </div>
            <FieldArray
              name="additionalDescription"
              component={renderDescription}
              languageOptions={activity["Language"]}/>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
  validate
})(RecipientCountryForm)
