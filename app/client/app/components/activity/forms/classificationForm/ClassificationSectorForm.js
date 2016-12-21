import React, { Component, PropTypes } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import { getCodeListItems, createActivity, addClassificationSector } from '../../../../actions/activity'

const renderSector = ({fields, languageOptions, sectorVocabularyOptions, sectorOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="row no-margin">
          {
            !sectorVocabularyOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name={`${description}.region[code]`}
                label="Sector vocabulary"
                selectOptions={sectorVocabularyOptions}
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
            !sectorOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name={`${description}.sector[code]`}
                label="Sector"
                selectOptions={sectorOptions}
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
        </div>
        <div className="row no-margin">
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

const validate = values => {
  const errors = {};

  if (!values.SectorText) {
    errors.type = 'Required'
  }
  return errors
};

class SectorForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit classification's select data and redirect to status form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addClassificationSector(formData, this.props.activity));
    this.context.router.push('/publisher/activity/classification/policy');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('SectorVocabulary');
    this.props.getCodeListItems('Sector');
  }

  render() {
    const {activity, handleSubmit, submitting} = this.props;

    if (!activity['SectorVocabulary'] || !activity['Sector']) {
      return <GeneralLoader />
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Sector</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <div className="row no-margin">
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
          </div>
          <FieldArray
            name="additionalSector"
            component={renderSector}
            languageOptions={activity["Language"]}
            sectorVocabularyOptions={activity["SectorVocabulary"]}
            sectorOptions={activity["Sector"]}
          />
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/geopolitical/geopolitical">Back to Geopolitical</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to Policy
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

SectorForm = reduxForm({
  form: 'classifications-sector',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(SectorForm);


SectorForm = connect(mapStateToProps, {getCodeListItems, createActivity})(SectorForm);
export default SectorForm;
