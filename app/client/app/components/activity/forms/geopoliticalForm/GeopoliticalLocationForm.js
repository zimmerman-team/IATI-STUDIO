import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import { getCodeListItems, createActivity, addGeopoliticalLocation } from '../../../../actions/activity'

const renderRegionFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
  <div className="columns small-12">
    <h6>Location id</h6>
    <div className="row no-margin">
      <Field
        component={renderSelectField}
        name="geographicVocabulary"
        label="Vocabulary"
        selectOptions={geographicVocabularyOptions}
        defaultOption="Select one of the following options"
      />
      <div className="columns small-6">
        <Field
          name="geographicVocabularyCode"
          type="text"
          component={renderField}
          label="Code"
        />
      </div>
      {fields.map((vocabulary, index) =>
        <div key={index}>
          <Field
            component={renderSelectField}
            name={`${vocabulary}.textCode`}
            label="Vocabulary"
            selectOptions={geographicVocabularyOptions}
            defaultOption="Select one of the following options"
          />
          <div className="columns small-6">
            <Field
              name={`${vocabulary}.geographicVocabularyCode`}
              type="text"
              component={renderField}
              label="Code"
            />
          </div>
        </div>
      )}
    </div>
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

const renderAdministrativeFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
  <div className="columns small-12">
    <h6>Administrative</h6>
    <div className="row no-margin">
      <Field
        component={renderSelectField}
        name="administrativeVocabulary"
        label="Vocabulary"
        selectOptions={geographicVocabularyOptions}
        defaultOption="Select one of the following options"
      />
      <div className="columns small-6">
        <Field
          name="administrativeVocabularyCode"
          type="text"
          component={renderField}
          label="Code"
        />
      </div>
      <div className="columns small-12">
        <div className="row no-margin">
          <div className="columns small-6">
            <Field
              name="administrativeLevel"
              type="text"
              component={renderField}
              label="Level"
            />
          </div>
        </div>
      </div>
      {fields.map((vocabulary, index) =>
        <div key={index}>
          <Field
            component={renderSelectField}
            name={`${vocabulary}.textCode`}
            label="Vocabulary"
            selectOptions={geographicVocabularyOptions}
            defaultOption="Select one of the following options"
          />
          <div className="columns small-6">
            <Field
              name={`${vocabulary}.geographicVocabularyCode`}
              type="text"
              component={renderField}
              label="Code"
            />
          </div>
          <div className="columns small-12">
            <div className="row no-margin">
              <div className="columns small-6">
                <Field
                  name={`${vocabulary}.administrativeLevel`}
                  type="text"
                  component={renderField}
                  label="Level"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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

const renderPointFields = ({fields, geographicExactnessOptions, geographicLocationClassOptions, meta: {touched, error}}) => (
  <div className="columns small-12">
    <h6>Point</h6>
    <div className="row no-margin">
      <div className="columns small-12">
        <div className="row no-margin">
          <div className="columns small-6">
            <Field
              name="name"
              type="text"
              component={renderField}
              label="Srs name"
            />
          </div>
        </div>
      </div>
      <div className="columns small-12">
        <h6>Position</h6>
        <div className="row no-margin">
          <div className="columns small-6">
            <Field
              name="latitude"
              type="text"
              component={renderField}
              label="Latitude"
            />
          </div>
          <div className="columns small-6">
            <Field
              name="longitude"
              type="text"
              component={renderField}
              label="Longitude"
            />
          </div>
        </div>
      </div>
      <div className="columns small-12">
        Map here
      </div>
      <div className="columns small-12">
        <h6>Exactness</h6>
        <div className="row no-margin">
          <Field
            component={renderSelectField}
            name="exactness[code"
            label="Exactness"
            selectOptions={geographicExactnessOptions}
            defaultOption="Select one of the following options"
          />
        </div>
      </div>
      <div className="columns small-12">
        <h6>Location class</h6>
        <div className="row no-margin">
          <Field
            component={renderSelectField}
            name="location_class[code]"
            label="Location Class"
            selectOptions={geographicLocationClassOptions}
            defaultOption="Select one of the following options"
          />
        </div>
      </div>
      <div className="columns small-12">
        <h6>Feature designation</h6>
        <div className="row no-margin">
          <Field
            component={renderSelectField}
            name="feature_designation[code]"
            label="Feature Designation"
            selectOptions={geographicLocationClassOptions}
            defaultOption="Select one of the following options"
          />
        </div>
      </div>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.featureDesignation) {
    errors.type = 'Required'
  }
  return errors
};

class LocationForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit geopolitical's location data and redirect to location form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addGeopoliticalLocation(formData, this.props.activity));
    this.context.router.push('/publisher/activity/classifications/sector');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('GeographicLocationReach');
    this.props.getCodeListItems('GeographicVocabulary');
    this.props.getCodeListItems('GeographicExactness');
    this.props.getCodeListItems('GeographicLocationClass');
    this.props.getCodeListItems('Language');
  }

  render() {
    const {activity, handleSubmit, submitting} = this.props;
    if (!activity['GeographicLocationReach'] || !activity['GeographicVocabulary'] || !activity['GeographicExactness']
        || !activity['GeographicLocationClass'] || !activity['Language']) {
      return <GeneralLoader />
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Location</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <div className="row no-margin">
              <div className="columns small-12">
                <div className="row no-margin">
                  <div className="columns small-6">
                    <Field
                      name="referenceText"
                      type="text"
                      component={renderField}
                      label="Reference"
                    />
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="columns small-12">
                <h6>Location Reach</h6>
                <div className="row no-margin">
                  <Field
                    component={renderSelectField}
                    name="location_reach[code]"
                    label="Code"
                    selectOptions={activity["GeographicLocationReach"]}
                    defaultOption="Select one of the following options"
                  />
                </div>
              </div>
              <h6>Location id</h6>
              <FieldArray
                name="location_id"
                component={renderRegionFields}
                geographicVocabularyOptions={activity["GeographicVocabulary"]}
              />
              <hr/>
              <h6 className="columns">Name</h6>
              <FieldArray
                name="additionalName"
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="name"
                textLabel="Name"
              />
              <hr/>
              <h6 className="columns">Location description</h6>
              <FieldArray
                name="additionalLocation"
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="locationName"
                textLabel="Location description"
              />
              <hr/>
              <h6 className="columns">Activity description</h6>
              <FieldArray
                name="activity_description[code]"
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="activeName"
                textLabel="Activity description"
              />
              <hr/>
              <FieldArray
                name="administrative"
                component={renderAdministrativeFields}
                geographicVocabularyOptions={activity["GeographicVocabulary"]}
              />
              <hr/>
              <FieldArray
                name="point"
                component={renderPointFields}
                geographicExactnessOptions={activity["GeographicExactness"]}
                geographicLocationClassOptions={activity["GeographicLocationClass"]}
              />
            </div>
          </div>
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/geopolitical-information/region/">Back to region</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to Classifications
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

LocationForm = reduxForm({
  form: 'geopolitical-information-location',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(LocationForm);


LocationForm = connect(mapStateToProps, {getCodeListItems, createActivity})(LocationForm);
export default LocationForm;