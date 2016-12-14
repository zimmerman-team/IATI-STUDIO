import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

const renderRegionFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
  <div className="columns small-12">
    <h6>Location id</h6>
    <div className="row no-margin">
      {
        !geographicVocabularyOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="geographicVocabulary"
            label="Vocabulary"
            selectOptions={geographicVocabularyOptions}
            defaultOption="Select one of the following options"
          />
      }
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
          {
            !geographicVocabularyOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name={`${vocabulary}.textCode`}
                label="Vocabulary"
                selectOptions={geographicVocabularyOptions}
                defaultOption="Select one of the following options"
              />
          }
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
      {
        !geographicVocabularyOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="administrativeVocabulary"
            label="Vocabulary"
            selectOptions={geographicVocabularyOptions}
            defaultOption="Select one of the following options"
          />
      }
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
          {
            !geographicVocabularyOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name={`${vocabulary}.textCode`}
                label="Vocabulary"
                selectOptions={geographicVocabularyOptions}
                defaultOption="Select one of the following options"
              />
          }
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
              name="srsName"
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
          {
            !geographicExactnessOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name="geographicExactness"
                label="Code"
                selectOptions={geographicExactnessOptions}
                defaultOption="Select one of the following options"
              />
          }
        </div>
      </div>
      <div className="columns small-12">
        <h6>Location class</h6>
        <div className="row no-margin">
          {
            !geographicExactnessOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name="geographicLocationClass"
                label="Code"
                selectOptions={geographicLocationClassOptions}
                defaultOption="Select one of the following options"
              />
          }
        </div>
      </div>
      <div className="columns small-12">
        <h6>Feature designation</h6>
        <div className="row no-margin">
          {
            !geographicExactnessOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name="featureDesignation"
                label="Code"
                selectOptions={geographicLocationClassOptions}
                defaultOption="Select one of the following options"
              />
          }
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

class LocationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('GeographicLocationReach');
    this.props.getCodeListItems('GeographicVocabulary');
    this.props.getCodeListItems('GeographicExactness');
    this.props.getCodeListItems('GeographicLocationClass');
  }

  render() {
    const {activity} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Location</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
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
                {
                  !activity["GeographicLocationReach"] ?
                    <GeneralLoader/> :
                    <Field
                      component={renderSelectField}
                      name="geographicLocationReach"
                      label="Code"
                      selectOptions={activity["GeographicLocationReach"]}
                      defaultOption="Select one of the following options"
                    />
                }
              </div>
            </div>
            <FieldArray
              name="additionalLocation"
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
              name="additionalActive"
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