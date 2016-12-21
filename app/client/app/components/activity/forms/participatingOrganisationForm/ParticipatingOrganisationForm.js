import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import { Link } from 'react-router';
import { getCodeListItems, addParticipatingOrganisation } from '../../../../actions/activity'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'

const renderParticipatingOrganisation = ({fields, roleOptions, typeOptions, languageOptions}) => (
  <div>
    <div className="field-list clearfix">
      <Field
        component={renderSelectField}
        name="role[code]"
        label="Organisation role"
        selectOptions={roleOptions}
        defaultOption="Select an organisation role"
      />
      <div className="columns small-6">
        <Field
          name="identifier"
          type="text"
          component={renderField}
          label="Identifier"
        />
      </div>
      <Field
        component={renderSelectField}
        name="type[code]"
        label="Organisation Type"
        selectOptions={typeOptions}
        defaultOption="Select an organisation type"
      />
      <div className="columns small-6">
        <Field
          name="activity_id"
          type="text"
          component={renderField}
          label="Activity ID"
        />
      </div>
      <FieldArray
        name="additionalTitles"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="name"
        textLabel="Organisation Name"
      />
      {fields.map((organisations, index) =>
        <div key={index}>
          <hr/>
          <h6 className="columns">Participating organisation</h6>
          <Field
            component={renderSelectField}
            name={`${organisations}.role`}
            label="Organisation role"
            selectOptions={roleOptions}
            defaultOption="Select an organisation role"
          />
          <div className="columns small-6">
            <Field
              component={renderField}
              name={`${organisations}.identifier`}
              label="Identifier"
              type="text"
            />
          </div>
          <Field
            component={renderSelectField}
            name={`${organisations}.type`}
            label="Organisation Type"
            selectOptions={typeOptions}
            defaultOption="Select an organisation type"
          />
          <div className="columns small-6">
            <Field
              name={`${organisations}.activityId`}
              type="text"
              component={renderField}
              label="Activity ID"
            />
          </div>
          <FieldArray
            name={`${organisations}.additionalTitles`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textName="name"
            textLabel="Organisation Name"
          />
          <button
            type="button"
            title="Remove Title"
            className="control-button remove float-right"
            onClick={() => fields.pop()}
          >Delete
          </button>
        </div>
      )}
    </div>
    <div className="columns">
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

class ParticipatingOrganisationForm extends Component {

  constructor(props) {
      super(props);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
      this.props.dispatch(getCodeListItems('OrganisationRole'));
      this.props.dispatch(getCodeListItems('OrganisationType'));
  }

  /**
   * Submit relations data and redirect
   * to performance form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      this.props.dispatch(addParticipatingOrganisation(formData, this.props.activity));
      this.context.router.push('/publisher/activity/geopolitical-information/geopolitical-information')
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {handleSubmit, submitting, activity} = this.props;
    if (!activity["OrganisationRole"] || !activity["OrganisationType"]) {
      return <GeneralLoader/>
    }

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)} name="participatingOrganisation">
          <div className="row no-margin">
            <div className="columns small-12">
              <h6>Participating organisation </h6>
              <FieldArray
                name="renderTitlesData"
                component={renderParticipatingOrganisation}
                roleOptions={activity["OrganisationRole"]}
                typeOptions={activity["OrganisationType"]}
                languageOptions={activity["Language"]}
              />
            </div>
          </div>
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/basic-info/basic-info">Back to basic information</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to geopolitical information
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

ParticipatingOrganisationForm = reduxForm({
  form: 'participating-organisation',
  destroyOnUnmount: false,
  validate
})(ParticipatingOrganisationForm);


ParticipatingOrganisationForm = connect(mapStateToProps, {getCodeListItems})(ParticipatingOrganisationForm);
export default ParticipatingOrganisationForm;
