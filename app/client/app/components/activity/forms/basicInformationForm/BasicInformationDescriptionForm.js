import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'

const renderDescriptionTypeSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option></option>
          <option value="1">General</option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderDescription = ({fields, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <Field
          name={`${description}.type[code]`}
          component={renderDescriptionTypeSelect}
          label="Type"
        />
        <hr/>
        <FieldArray
          name={`${description}.additionalTitles`}
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName={`${description}.narrativeText`}
          textLabel="Title"
        />
      </div>
    )}
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.type) {
    const descriptionTypeObj = {};
    descriptionTypeObj.code = 'Required';
    errors.type = descriptionTypeObj
  }

  if (!values.textTitle) {
    errors.textTitle = 'Required';
  }

  if (!values.titleLanguage) {
    const typeLanguageObj = {};
    typeLanguageObj.code = 'Required';
    errors.titleLanguage = typeLanguageObj
  }

  if (values.additionalTitles) {
    const narrativeArrayErrors = [];

    values.additionalTitles.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.text) {
        titleErrors.text = 'Required';
        narrativeArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.language) {
        const codeObj = {};
        codeObj.code = 'Required';
        titleErrors.language = codeObj;
        narrativeArrayErrors[titleIndex] = titleErrors
      }
    });

    if (narrativeArrayErrors.length) {
      errors.additionalTitles = narrativeArrayErrors
    }
  }

  return errors
};


class DescriptionForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('DescriptionType');
  }

  render() {
    const {activity} = this.props;

    if (!activity["DescriptionType"]) {
      return <GeneralLoader/>
    }

    return (
      <div>
        <div className="columns small-centered small-12">
          <h2 className="page-title with-tip">Description</h2>
          <Tooltip className="inline" tooltip="Description text goes here">
            <i className="material-icons">info</i>
          </Tooltip>
          <div className="field-list">
            <div className="row">
              <Field
                name="type[code]"
                component={renderSelectField}
                label="Type"
                selectOptions={activity["DescriptionType"]}
                defaultOption="Select type"
              />
              <hr/>
              <FieldArray
                name="additionalTitles"
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="textTitle"
                textLabel="Text"
              />
            </div>
            <FieldArray
              name="additionalDescription"
              component={renderDescription}
              languageOptions={activity["Language"]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
  validate
})(DescriptionForm)