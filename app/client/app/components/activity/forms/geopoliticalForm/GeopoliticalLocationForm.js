import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderCodeTypeSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option></option>
          <option value="1">+91</option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderRegionFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
  <div className="columns small-12">
    <h6>Location id</h6>
    <div className="row">
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

class LocationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('GeographicLocationReach');
    this.props.getCodeListItems('GeographicVocabulary');
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
          <div className="row">
            <div className="columns small-12">
              <div className="row">
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
              <div className="row">
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
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'LocationForm',     // a unique identifier for this form
})(LocationForm)
