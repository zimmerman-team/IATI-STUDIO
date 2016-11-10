import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderSectorTypeSelect = ({name, label, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option></option>
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

const renderSector = ({fields, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="row">
          <Field component={renderSectorTypeSelect} name={`${description}.region[code]`} label="Sector Vocabulary"/>
          <div className="columns small-6">
            <Field
              name="uriSectorText"
              type="text"
              component={renderField}
              label="Vocabulary URI"
            />
          </div>
          <Field component={renderSectorTypeSelect} name={`${description}.vocabulary[code]`} label="Sector Code"/>
          <div className="columns small-6">
            <Field
              name="SectorText"
              type="text"
              component={renderField}
              label="Percentage"
            />
          </div>
        </div>
        <div className="row">
          <FieldArray
            name={`${description}.additionalSector`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textName="textSector"
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
class SectorForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('SectorVocabulary');
    this.props.getCodeListItems('Sector');
  }

  render() {
    const {activity} = this.props;

    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Sector</h2>
            <Tooltip className="inline" tooltip="Description text goes here">
              <i className="material-icons">info</i>
            </Tooltip>
            <div className="field-list">
              {
                !activity["SectorVocabulary"] ?
                  <GeneralLoader/> :
                  <Field
                    component={renderSelectField}
                    name="sectorVocabulary[code]"
                    label="Sector vocabulary"
                    selectOptions={activity["SectorVocabulary"]}
                    defaultOption="Select one of the following options"
                  />
              }
              <div className="columns small-6">
                <Field
                  name="uriSectorText"
                  type="text"
                  component={renderField}
                  label="Vocabulary URI"
                />
              </div>
              {
                !activity["Sector"] ?
                  <GeneralLoader/> :
                  <Field
                    component={renderSelectField}
                    name="sector[code]"
                    label="Sector code"
                    selectOptions={activity["Sector"]}
                    defaultOption="Select one of the following options"
                  />
              }
              <div className="columns small-6">
                <Field
                  name="SectorText"
                  type="text"
                  component={renderField}
                  label="Percentage"
                />
              </div>
              <FieldArray
                name="additionalTitles"
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="textSectorTitle"
                textLabel="Title"
              />
            </div>
            <FieldArray name="additionalSector" component={renderSector} languageOptions={activity["Language"]}/>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'SectorForm',     // a unique identifier for this form
})(SectorForm)
