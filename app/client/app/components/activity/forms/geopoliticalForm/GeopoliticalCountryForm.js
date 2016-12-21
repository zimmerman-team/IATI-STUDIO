import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import { getCodeListItems, createActivity, addGeopoliticalCountry } from '../../../../actions/activity'

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
        <div className="row no-margin">
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
        <div className="row no-margin">
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

class RecipientCountryForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit geopolitical's country data and redirect to region form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addGeopoliticalCountry(formData, this.props.activity));
    this.context.router.push('/publisher/activity/geopolitical-information/region');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('Country');
  }

  render() {
    const {activity, handleSubmit, submitting} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Recipient Country</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="field-list">
              <div className="row no-margin">
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
            <div className="columns small-12">
              <Link className="button" to="/publisher/activity/participating-organisation/participating-organisation/">Back to participating organigation</Link>
              <button className="button float-right" type="submit" disabled={submitting}>
                Continue to Region
              </button>
            </div>
          </form>
        <FieldArray
          name="additionalDescription"
          component={renderDescription}
          languageOptions={activity["Language"]}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

RecipientCountryForm = reduxForm({
  form: 'geopolitical-information-country',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(RecipientCountryForm);


RecipientCountryForm = connect(mapStateToProps, {getCodeListItems, createActivity})(RecipientCountryForm);
export default RecipientCountryForm;