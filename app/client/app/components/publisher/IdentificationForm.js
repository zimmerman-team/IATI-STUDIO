import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../general/Tooltip.react.jsx'

const renderField = ({input, label, type, readOnly, onChange, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} readOnly={readOnly}/>
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

const renderTitles = ({fields, meta: {touched, error}}) => (
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

const validate = values => {
  const errors = {};

  if (!values.activityIdentifier) {
    errors.activityIdentifier = 'Required'
  }

  if (!values.textTitle) {
    errors.textTitle = 'At least one title must be entered'
  }

  if (!values.titleLanguage) {
    const titleLanguageCodeObj = {};
    titleLanguageCodeObj.code = 'Required';
    errors.titleLanguage = titleLanguageCodeObj
  }

  if (!values.iati_identifier) {
    errors.iati_identifier = 'Required'
  }

  if (values.additionalTitles) {
    const titlesArrayErrors = [];

    values.additionalTitles.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.text) {
        titleErrors.text = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.language) {
        const codeObj = {};
        codeObj.code = 'Required';
        titleErrors.language = codeObj;
        titlesArrayErrors[titleIndex] = titleErrors
      }
    });

    if (titlesArrayErrors.length) {
      errors.additionalTitles = titlesArrayErrors
    }
  }

  // if (/[^\/\&\|\?]+/g.test(values.iati_identifier)) {
  //   errors.iati_identifier = 'Invalid data entered'
  // }

  if (!values.hierarchy) {
    errors.hierarchy = 'Required'
  }

  return errors
};


class IdentificationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  // handleChange(e) {
  //   //change IATI Identifier value
  //   //console.log("here");
  //   //this.props.dispatch(change('identification', 'iati_identifier', 'Bob'));
  //   //this.props.publishActivity(data);
  // }


  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit} name="identification">
          <div className="row">
            <div className="columns">
              <div className="field-list">
                <div className="columns small-6">
                  <Field
                    name="textTitle"
                    type="text"
                    component={renderField}
                    label="Title"
                  />
                </div>
                <Field component={renderLanguageSelect} name="titleLanguage[code]" label="Language"/>
                <FieldArray name="additionalTitles" component={renderTitles}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns small-6">
              <Field
                name="activityIdentifier"
                type="text"
                id="activityIdentifier"
                component={renderField}
                label="Activity Identifier"
                //onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="columns small-6">
              <Field
                name="iati_identifier"
                type="text"
                id="iati_identifier"
                component={renderField}
                label="IATI Identifier"
                //readOnly="true"
              />
            </div>
            <div className="columns small-6">
              <Field
                name="hierarchy"
                type="number"
                id="hierarchy"
                component={renderField}
                label="Hierarchy"
              />
            </div>
            <div className="columns small-12">
              <button className="button" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to basic information
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'syncValidation',
  initialValues: {
    hierarchy: 1,
    xml_source_ref: 'dummy',
    default_lang: 'en'
  },
  validate

})(IdentificationForm)


