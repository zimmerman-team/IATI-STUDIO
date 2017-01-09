import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router'

import { getCodeListItems, getLocations, createLocation, updateLocation, deleteLocation } from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import { locationsSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

const renderRegionFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
  <div className="columns small-12">
    <h6>Location id</h6>
    <div className="row no-margin">
      <Field
        component={renderSelectField}
        name="location_vocabulary"
        label="Vocabulary"
        selectOptions={geographicVocabularyOptions}
        defaultOption="Select one of the following options"
      />
      <div className="columns small-6">
        <Field
          name="location_code"
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
              name="point_name"
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
        {/*@TODO Map here*/}
      </div>
      <div className="columns small-12">
        <h6>Exactness</h6>
        <div className="row no-margin">
          <Field
            component={renderSelectField}
            name="exactness"
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
            name="location_class"
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
            name="feature_designation"
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
    errors.featureDesignation = 'Required'
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
      const { activityId, data, tab, subTab } = this.props
      const lastLocation = data;
      const locations = formData.locations;

      handleSubmit(
          'locations',
          activityId,
          lastLocation,
          locations,
          this.props.createLocation,
          this.props.updateLocation,
          this.props.deleteLocation,
      )
      //this.context.router.push('/publisher/activity/classifications/sector');
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
    const {codelists, handleSubmit, submitting} = this.props;
    if (!codelists['GeographicLocationReach'] || !codelists['GeographicVocabulary'] || !codelists['GeographicExactness']
        || !codelists['GeographicLocationClass'] || !codelists['Language']) {
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
                      name="ref"
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
                    name="location_reach"
                    label="Code"
                    selectOptions={codelists["GeographicLocationReach"]}
                    defaultOption="Select one of the following options"
                  />
                </div>
              </div>
              <FieldArray
                name="locationRegion"
                component={renderRegionFields}
                geographicVocabularyOptions={codelists["GeographicVocabulary"]}
              />
              <hr/>
              <h6 className="columns">Name</h6>
              <FieldArray
                name="additionalName"
                component={renderNarrativeFields}
                languageOptions={codelists["Language"]}
                textName="name"
                textLabel="Name"
              />
              <hr/>
              <h6 className="columns">Location description</h6>
              <FieldArray
                name="additionalLocation"
                component={renderNarrativeFields}
                languageOptions={codelists["Language"]}
                textName="locationName"
                textLabel="Location description"
              />
              <hr/>
              <h6 className="columns">Activity description</h6>
              <FieldArray
                name="codelists_description"
                component={renderNarrativeFields}
                languageOptions={codelists["Language"]}
                textName="activeName"
                textLabel="Activity description"
              />
              <hr/>
              <FieldArray
                name="administrative"
                component={renderAdministrativeFields}
                geographicVocabularyOptions={codelists["GeographicVocabulary"]}
              />
              <hr/>
              <FieldArray
                name="pointGeo"
                component={renderPointFields}
                geographicExactnessOptions={codelists["GeographicExactness"]}
                geographicLocationClassOptions={codelists["GeographicLocationClass"]}
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

function mapStateToProps(state, props) {
    const locations = locationsSelector(state)

    return {
        data: locations,
        codelists: state.codelists,
        ...props,
    }
}

LocationForm = reduxForm({
    form: 'geopolitical-information-location',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(LocationForm);

LocationForm = connect(mapStateToProps, {
    getCodeListItems,
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation
})(LocationForm);

export default withRouter(LocationForm)