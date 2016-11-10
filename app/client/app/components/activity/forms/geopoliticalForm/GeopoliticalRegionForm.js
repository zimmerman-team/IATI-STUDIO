import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField} from '../../helpers/FormHelper'

const renderRegionTypeSelect = ({name, label, meta: {touched, error}}) => (
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
const renderRegion = ({fields, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="row">
          <Field
            name={`${description}.region[code]`}
            component={renderRegionTypeSelect}
            label="Region Code"
          />
          <Field
            name={`${description}.vocabulary[code]`}
            component={renderRegionTypeSelect}
            label="Region Vocabulary"
          />
        </div>
        <div className="row">
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
class RecipientRegionForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {activity} = this.props;

    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Recipient Region</h2>
            <Tooltip className="inline" tooltip="Description text goes here">
              <i className="material-icons">info</i>
            </Tooltip>
            <div className="field-list">
              <div className="row">
                <Field component={renderRegionTypeSelect} name="vocabulary[code]" label="Region Code"/>
                <Field component={renderRegionTypeSelect} name="region[code]" label="Region Vocabulary"/>
              </div>
              <div className="row">
                <div className="columns small-6">
                  <Field
                    name="uriText"
                    type="text"
                    component={renderField}
                    label="Vocabulary URI"
                  />
                </div>
                <div className="columns small-6">
                  <Field
                    name="percentageText"
                    type="text"
                    component={renderField}
                    label="Percentage"
                  />
                </div>
              </div>
              <div className="row">
                <FieldArray
                  name="additionalTitles"
                  component={renderNarrativeFields}
                  languageOptions={activity["Language"]}
                  textName="textTitle"
                  textLabel="Title"
                />
              </div>
            </div>
            <FieldArray name="additionalRegion" component={renderRegion}/>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
})(RecipientRegionForm)
