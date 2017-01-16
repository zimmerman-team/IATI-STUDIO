import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderSelectField, renderNarrativeFields, renderField} from '../../helpers/FormHelper'
import { Link } from 'react-router';
import { getCodeListItems, getContact, createContact, updateContact, deleteContact } from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import { contactsSelector, publisherSelector } from '../../../../reducers/createActivity.js'
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

const renderParticipatingContact = ({ fields, languageOptions, contactTypes, meta: {dirty, touched, error} }) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
  <div>
      {fields.map((contact, index) =>
        <div key={index}>
          <h6>Contact Info #{index + 2}</h6>
          <Field name={`${contact}.contact`} label="Contact type"
                 component={renderContactTypeSelect}/>
          <div>
            <h2 className="page-title">Organisation</h2>
            <FieldArray
              name={`${contact}.ContactOrganisation`}
              component={renderNarrativeFields}
              languageOptions={languageOptions}
              textName="narrativeOrganisation[text]"
              textLabel="Title"
            />
          </div>
          <FieldArray name={`${contact}.ContactDepartment`} component={renderContactDepartment}/>
          <FieldArray name={`${contact}.ContactPerson`} component={renderContactPerson}/>
          <FieldArray name={`${contact}.ContactJob`} component={renderContactJob}/>
          <FieldArray name={`${contact}.ContactPhone`} component={renderContactPhone}/>
          <FieldArray name={`${contact}.ContactEmail`} component={renderContactEmail}/>
          <FieldArray name={`${contact}.ContactWeb`} component={renderContactWebsite}/>
          <FieldArray name={`${contact}.ContactMailAddress`} component={renderContactMailAddress}/>
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
    )
};

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
      const { activityId, data, tab, subTab, publisher } = this.props
      const lastContacts = data;
      const contacts = formData.contacts;

      handleSubmit(
          publisher.id,
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('contacts', newData);

            // change each item
            newData.forEach((d,i) => this.props.change(`contacts[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('contacts', i)
            }
        }

        console.log(nextProps.publisher);

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getContact(nextProps.publisher.id, nextProps.activityId)
        }
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
    const contacts = contactsSelector(state);
    const { activityId } = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];

    return {
        data: contacts,
        codelists: state.codelists,
        activity: state.activity.activity,
        initialValues: {"contacts": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

BasicInformationContactForm = reduxForm({
  form: 'basic-info-contact',     // a unique identifier for this form
  destroyOnUnmount: false,
  enableReinitialize: true,
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
