import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

const renderAdditionalRegion = ({fields, languageOptions, regionOptions, regionVocabularyOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="row no-margin">
          {
            !regionOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name={`${description}.region[code]`}
                label="Region code"
                selectOptions={regionOptions}
                defaultOption="Select one of the following options"
              />
          }
          {
            !regionVocabularyOptions ?
              <GeneralLoader/> :
              <Field
                component={renderSelectField}
                name={`${description}.vocabulary[code]`}
                label="Region vocabulary"
                selectOptions={regionVocabularyOptions}
                defaultOption="Select one of the following options"
              />
          }
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

  if (!values.region) {
    errors.type = 'Required'
  }
  return errors
};

class RecipientRegionForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('Region');
    this.props.getCodeListItems('RegionVocabulary');
  }

  render() {
    const {activity} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Recipient Region</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <div className="row no-margin">
            {
              !activity["Region"] ?
                <GeneralLoader/> :
                <Field
                  component={renderSelectField}
                  name="region"
                  label="Region code"
                  selectOptions={activity["Region"]}
                  defaultOption="Select one of the following options"
                />
            }
            {
              !activity["RegionVocabulary"] ?
                <GeneralLoader/> :
                <Field
                  component={renderSelectField}
                  name="regionVocabulary"
                  label="Region vocabulary"
                  selectOptions={activity["RegionVocabulary"]}
                  defaultOption="Select one of the following options"
                />
            }
          </div>
          <div className="row no-margin">
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
          <div className="row no-margin">
            <FieldArray
              name="additionalTitles"
              component={renderNarrativeFields}
              languageOptions={activity["Language"]}
              textName="textTitle"
              textLabel="Title"
            />
          </div>
        </div>
        <FieldArray
          name="additionalRegion"
          component={renderAdditionalRegion}
          regionOptions={activity["Region"]}
          regionVocabularyOptions={activity["RegionVocabulary"]}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

RecipientRegionForm = reduxForm({
  form: 'geopolitical-information-recipient-region',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(RecipientRegionForm);


RecipientRegionForm = connect(mapStateToProps, {getCodeListItems, createActivity})(RecipientRegionForm);
export default RecipientRegionForm;