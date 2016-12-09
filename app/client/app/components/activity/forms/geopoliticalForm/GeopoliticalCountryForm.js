import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderCountry = ({fields, countryCodeOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((title, index) =>
      <div key={index}>
        <Field
          component={renderSelectField}
          name={`${title}.country[code]`}
          label="Country code"
          selectOptions={countryCodeOptions}
          defaultOption="Select one of the following options"
        />
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

  componentWillMount() {
    this.props.getCodeListItems('Country');
  }

  render() {
    const {activity} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Recipient Country</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <div className="row">
            {
              !activity["Country"] ?
                <GeneralLoader/> :
                <Field
                  component={renderSelectField}
                  name="country[code]"
                  label="Country code"
                  selectOptions={activity["Country"]}
                  defaultOption="Select one of the following options"
                />
            }
            <div className="columns small-6">
              <Field
                name="percentageText"
                type="text"
                component={renderField}
                label="Percentage"
              />
            </div>
            <FieldArray
              name="additionalCountry"
              component={renderCountry}
              countryCodeOptions={activity["Country"]}
            />
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
    )
  }
}

export default reduxForm({
  form: 'GeopoliticalRecipientCountryForm',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(RecipientCountryForm)
