import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

const renderAdditionalRenderHumanitarianScopeForm = ({fields, vocabularyOptions, scopeOptions, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderHumanitarianScopeForm
          vocabularyOptions={vocabularyOptions}
          scopeOptions={scopeOptions}/>
        <div className="row no-margin">
          <FieldArray
            name={`${description}`}
            component={renderNarrativeFields}
            narrativeAddMore={false}
            languageOptions={languageOptions}
            textName="textPolicy"
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


const RenderHumanitarianScopeForm = ({vocabularyOptions, scopeOptions, languageOptions}) =>
 (
  <div>
    <div className="row no-margin">
      {
        !vocabularyOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="HumanitarianScopeVocabulary"
            label="HumanitarianScopeVocabulary"
            selectOptions={vocabularyOptions}
            defaultOption="Select one of the following options"
          />
      }
        {
          !scopeOptions ?
            <GeneralLoader/> :
            <Field
              component={renderSelectField}
              name="HumanitarianScopeType"
              label="HumanitarianScopeType"
              selectOptions={scopeOptions}
              defaultOption="Select one of the following options"
            />
        }
    </div>
    <div className="row no-margin">
      <div className="columns small-6">
        <Field
          name="VocabularyURI"
          type="text"
          component={renderField}
          label="VocabularyURI"
        />
      </div>
      <div className="columns small-6">
        <Field
          name="CODE"
          type="text"
          component={renderField}
          label="Code"
        />
      </div>
    </div>
    <div className="row no-margin">
      <h2 className="page-title with-tip">Description</h2>
      <FieldArray
        name="additionalTitles"
        component={renderNarrativeFields}
        narrativeAddMore={false}
        languageOptions={languageOptions}
        textName="textPolicyTitle"
        textLabel="Title"
      />
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.CODE) {
    errors.type = 'Required'
  }
  if (!values.VocabularyURI) {
    errors.type = 'Required'
  }

  return errors
};

class HumanitarianScopeForm extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('HumanitarianScopeType');
    this.props.getCodeListItems('HumanitarianScopeVocabulary');
  }

  render() {
    const {activity} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Humanitarian Scope</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderHumanitarianScopeForm
            vocabularyOptions={activity["HumanitarianScopeVocabulary"]}
            scopeOptions={activity["HumanitarianScopeType"]}
            languageOptions={activity["Language"]}
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderHumanitarianScopeForm}
          vocabularyOptions={activity["HumanitarianScopeVocabulary"]}
          scopeOptions={activity["HumanitarianScopeType"]}
          languageOptions={activity["Language"]}
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

HumanitarianScopeForm = reduxForm({
  form: 'classifications-humanitarian-scope',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(HumanitarianScopeForm);


HumanitarianScopeForm = connect(mapStateToProps, {getCodeListItems, createActivity})(HumanitarianScopeForm);
export default HumanitarianScopeForm;
