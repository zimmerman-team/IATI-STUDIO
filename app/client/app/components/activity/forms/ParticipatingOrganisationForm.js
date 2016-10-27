import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import {renderLanguageSelect} from '../helpers/FormHelper'

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderIdentifierSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <label>{label}</label>
    <div>
      <Field name={name} component="select">
        <option>Select a identifier</option>
        <option value="1">NL-KVK-102</option>
        <option value="2">NL-KVK-10245</option>
      </Field>
    </div>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const renderOrganisationRoleSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <label>{label}</label>
    <div>
      <Field name={name} component="select">
        <option></option>
        <option value="funding">Funding</option>
      </Field>
    </div>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const renderOrganisationTypeSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <label>{label}</label>
    <div>
      <Field name={name} component="select">
        <option></option>
        <option value="government">Government</option>
      </Field>
    </div>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const renderParticipatingOrganisation = ({fields}) => (
  <div className="field-list">
    <div>
      <h6>Participating organisation </h6>
      <Field component={renderOrganisationRoleSelect} name="role[code]" label="Organisation role"/>
      <Field component={renderIdentifierSelect} name="identifier" label="Identifier"/>
      <Field component={renderOrganisationTypeSelect} name="type[code]" label="Organisation Type"/>
      <div className="columns small-6">
        <Field
          name="activity_id"
          type="text"
          component={renderField}
          label="Activity ID"
        />
      </div>
      <FieldArray name="additionalTitles" component={renderTitles}/>
    </div>
    {fields.map((organisations, index) =>
      <div key={index}>
        <h6>Participating organisation #{index + 1}</h6>
        <Field component={renderOrganisationRoleSelect} name={`${organisations}.role`} label="Organisation role"/>
        <Field component={renderLanguageSelect} name={`${organisations}.identifier`} label="Identifier" />
        <Field component={renderOrganisationTypeSelect} name={`${organisations}.type`} label="Organisation Type"/>
        <div className="columns small-6">
          <Field
            name={`${organisations}.activityId`}
            type="text"
            component={renderField}
            label="Activity ID"
          />
        </div>
        <FieldArray name={`${organisations}.additionalTitles`} component={renderTitles}/>
        <button
          type="button"
          title="Remove Title"
          className="control-button remove float-right"
          onClick={() => fields.pop()}
        >Delete
        </button>
      </div>
    )}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </div>
  </div>
);

const renderTitles = ({fields, meta: {touched, error}}) => (
  <div className="field-list">
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Organisation Name"
        />
      </div>
      <Field component={renderLanguageSelect} name="titleLanguage[code]" label="Language"/>
    </div>
    {fields.map((title, index) =>
      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${title}.name`}
            type="text"
            component={renderField}
            label={`Organisation Name #${index + 1}`}
          />
        </div>
        <Field component={renderLanguageSelect} name={`${title}.language[code]`} label={`Language #${index + 1}`}/>
        <button
          type="button"
          title="Remove Title"
          className="control-button remove float-right"
          onClick={() => fields.pop()}>Delete
        </button>
      </div>
    )}
    {touched && error && <li className="error">{error}</li>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.activityId) {
    errors.activityId = 'Required'
  }
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.role) {
    errors.role = 'Required'
  }
  if (!values.identifier) {
    errors.identifier = 'Required'
  }
  if (!values.type) {
    errors.type = 'Required'
  }
  if (!values.actionid) {
    errors.actionid = 'Required'
  }
  if (!values.titleLanguage) {
    const titleLanguageCodeObj = {};
    titleLanguageCodeObj.code = 'Required';
    errors.titleLanguage = titleLanguageCodeObj
  }

  if (values.renderTitlesData) {
    const titlesArrayErrors = [];

    values.renderTitlesData.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.role) {
        titleErrors.role = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.identifier) {
        titleErrors.identifier = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.type) {
        titleErrors.type = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.activityId) {
        titleErrors.activityId = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
    });

    if (titlesArrayErrors.length) {
      errors.renderTitlesData = titlesArrayErrors
    }
  }

  if (values.additionalTitles) {
    const titlesArrayErrors = [];

    values.additionalTitles.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.name) {
        titleErrors.name = 'Required';
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
  return errors
};

class ParticipatingOrganisationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleSubmit, submitting, previousPage} = this.props;
    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit} name="participatingOrganisation">
          <div className="row">
            <div className="columns small-12">
              <div className="field-list">
                <FieldArray name="renderTitlesData" component={renderParticipatingOrganisation}/>
              </div>
            </div>
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to basic information</button>
              <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to geopolitical information
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
  destroyOnUnmount: false,
  validate

})(ParticipatingOrganisationForm)