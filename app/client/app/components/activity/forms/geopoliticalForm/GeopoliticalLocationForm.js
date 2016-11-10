import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'

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

const renderRegionFields = ({fields, meta: {touched, error}}) => (
  <div className="field-list">
    <div>
      <h6>Location id</h6>
      <div className="columns small-6">
        <Field
          name="textCode"
          type="text"
          component={renderField}
          label="Code"
        />
      </div>
      <Field
        component={renderCodeTypeSelect}
        name="vocabulary[code]"
        label="Vocabulary"
      />
    </div>
    <div>
      {fields.map((vocabulary, index) =>
        <div key={index}>
          <div className="columns small-6">
            <Field
              name={`${vocabulary}.textCode`}
              type="text"
              component={renderField}
              label="Code"
            />
          </div>
          <Field
            component={renderCodeTypeSelect}
            name={`${vocabulary}.vocabulary[code]`}
            label="Vocabulary"
          />
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
  </div>
);
class LocationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {activity} = this.props;
    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Location</h2>
            <Tooltip className="inline" tooltip="Description text goes here">
              <i className="material-icons">info</i>
            </Tooltip>
            <div className="field-list">
              <div className="row">
                <div className="columns small-6">
                  <Field
                    name="referenceText"
                    type="text"
                    component={renderField}
                    label="Reference"
                  />
                </div>
                <h6>Location reach</h6>
                <Field component={renderCodeTypeSelect} name="location[code]" label="Code"/>

                <FieldArray
                  name="additionalLocation"
                  component={renderRegionFields}
                />
                <FieldArray
                  name="additionalName"
                  component={renderNarrativeFields}
                  languageOptions={activity["Language"]}
                  textName="name"
                  textLabel="Name"
                />
                <FieldArray
                  name="additionalLocation"
                  component={renderNarrativeFields}
                  languageOptions={activity["Language"]}
                  textName="locationName"
                  textLabel="Location description"
                />
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
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'LocationForm',     // a unique identifier for this form
})(LocationForm)
