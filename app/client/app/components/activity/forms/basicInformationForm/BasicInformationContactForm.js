import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderSelectField, renderNarrativeFields, renderField} from '../../helpers/FormHelper'
import { Link } from 'react-router';
import { getCodeListItems, getContact, createContact, updateContact, deleteContact } from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import { contactsSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

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

const renderParticipatingContact = ({fields, languageOptions, contactTypes}) => (
  <div>
    <div className="field-list">
      <Field
        name="type"
        component={renderSelectField}
        label="Contact type"
        selectOptions={contactTypes}
        defaultOption="Select a type"
      />
      <div className="clearfix"></div>
      <div className="columns small-12">
        <h2 className="page-title">Organisation</h2>
        <FieldArray
          name="ContactOrganisation"
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName="narrativeOrganisation[text]"
          textLabel="Title"
        />
      </div>
      <FieldArray name="ContactDepartment" component={renderContactDepartment}/>
      <FieldArray name="ContactPerson" component={renderContactPerson}/>
      <FieldArray name="ContactJob" component={renderContactJob}/>
      <FieldArray name="ContactPhone" component={renderContactPhone}/>
      <FieldArray name="ContactEmail" component={renderContactEmail}/>
      <FieldArray name="ContactWeb" component={renderContactWebsite}/>
      <FieldArray name="ContactMailAddress" component={renderContactMailAddress}/>
      {fields.map((participatingOrganisation, index) =>
        <div key={index}>
          <h6>Contact Info #{index + 2}</h6>
          <Field name={`${participatingOrganisation}.contact`} label="Contact type"
                 component={renderContactTypeSelect}/>
          <div>
            <h2 className="page-title">Organisation</h2>
            <FieldArray
              name={`${participatingOrganisation}.ContactOrganisation`}
              component={renderNarrativeFields}
              languageOptions={languageOptions}
              textName="narrativeOrganisation[text]"
              textLabel="Title"
            />
          </div>
          <FieldArray name={`${participatingOrganisation}.ContactDepartment`} component={renderContactDepartment}/>
          <FieldArray name={`${participatingOrganisation}.ContactPerson`} component={renderContactPerson}/>
          <FieldArray name={`${participatingOrganisation}.ContactJob`} component={renderContactJob}/>
          <FieldArray name={`${participatingOrganisation}.ContactPhone`} component={renderContactPhone}/>
          <FieldArray name={`${participatingOrganisation}.ContactEmail`} component={renderContactEmail}/>
          <FieldArray name={`${participatingOrganisation}.ContactWeb`} component={renderContactWebsite}/>
          <FieldArray name={`${participatingOrganisation}.ContactMailAddress`} component={renderContactMailAddress}/>
          <button
            type="button"
            title="Remove Participating organisation"
            className="control-button remove float-right"
            onClick={() => fields.remove(index)}>Delete
          </button>
        </div>
      )}
    </div>
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </div>
  </div>
);

const renderContactDepartment = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Department</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativeDepartment[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativeDepartment[code]" label="Language"/>
    </div>
    {fields.map((department, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${department}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${department}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const renderContactPerson = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Person Name</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativePerson[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativePerson[code]" label="Language"/>
    </div>
    {fields.map((conatactPerson, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${conatactPerson}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${conatactPerson}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const renderContactJob = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Job Title</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativeContactJob[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativeContactJob[code]" label="Language"/>
    </div>
    {fields.map((contactJob, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${contactJob}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${contactJob}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const renderContactPhone = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Telephone</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativePhone[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativePhone[code]" label="Language"/>
    </div>
    {fields.map((contactPhone, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${contactPhone}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${contactPhone}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const renderContactEmail = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Email</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativeEmail[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativeEmail[code]" label="Language"/>
    </div>
    {fields.map((contactMail, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${contactMail}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${contactMail}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const renderContactWebsite = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Website</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativeWebsite[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativeWebsite[code]" label="Language"/>
    </div>
    {fields.map((website, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${website}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${website}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const renderContactMailAddress = ({fields, meta: {error}}) => (
  <div className="field-list">
    <h2 className="page-title">Mailing address</h2>
    <hr/>
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="narrativeAddress[text]"
          type="text"
          component={renderField}
          label="Title"
        />
      </div>
      <Field component={renderLanguageSelect} name="narrativeAddress[code]" label="Language"/>
    </div>
    {fields.map((mailingAddress, index) =>

      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${mailingAddress}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field component={renderLanguageSelect} name={`${mailingAddress}.language[code]`} label="Language"/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove float-right"
          onClick={() => fields.remove(index)}>Delete
        </button>
      </div>
    )}
    {error && <span className="error">{error}</span>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.type) {
    errors.type = 'Required'
  }

  if (!values.narrative) {
    const narrativeTextObj = {};
    narrativeTextObj.text = 'Required';
    errors.narrative = narrativeTextObj
  }

  return errors
};

class BasicInformationContactForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit basic information's status data and redirect to status form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const { activityId, data, tab, subTab } = this.props
      const lastContacts = data;
      const contacts = formData.contacts;

      handleSubmit(
          'contacts',
          activityId,
          lastContacts,
          contacts,
          this.props.createContact,
          this.props.updateContact,
          this.props.deleteContact,
      )
    //this.context.router.push('/publisher/activity/participating-organisation/participating-organisation');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('ContactType');
  }

  render() {
    const {codelists, handleSubmit, submitting} = this.props;

    if (!codelists["ContactType"]) {
      return <GeneralLoader/>
    }

    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Contact info</h2>
            <Tooltip className="inline" tooltip="Contact info text goes here">
              <i className="material-icons">info</i>
            </Tooltip>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="field-list">
                <FieldArray
                  name="participating-contact"
                  component={renderParticipatingContact}
                  languageOptions={codelists["Language"]}
                  contactTypes={codelists["ContactType"]}
                />
              </div>
              <div className="columns small-12">
                <Link className="button" to="/publisher/activity/basic-info/date">Back to date</Link>
                <button className="button float-right" type="submit" disabled={submitting}>
                  Continue to Participating organisation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    const contacts = contactsSelector(state)

    return {
        data: contacts,
        codelists: state.codelists,
        ...props,
    }
}

BasicInformationContactForm = reduxForm({
  form: 'basic-info-contact',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(BasicInformationContactForm);


BasicInformationContactForm = connect(mapStateToProps, {
    getCodeListItems,
    getContact,
    createContact,
    updateContact,
    deleteContact
})(BasicInformationContactForm);

export default withRouter(BasicInformationContactForm)
