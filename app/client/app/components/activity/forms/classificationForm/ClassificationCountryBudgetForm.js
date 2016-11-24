import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderAdditionalRenderCountryBugetForm = ({fields, vocabularyOptions, codeOptions, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderCountryBugetForm
          vocabularyOptions={vocabularyOptions}
          codeOptions={codeOptions}/>
        <div className="row">
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


const RenderCountryBugetForm = ({vocabularyOptions, codeOptions, languageOptions}) =>
 (
  <div>
    <div className="row">
      {
        !vocabularyOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="BudgetIdentifierVocabulary"
            label="BudgetIdentifierVocabulary"
            selectOptions={vocabularyOptions}
            defaultOption="Select one of the following options"
          />
      }
    </div>
    <div className="row">
        {
          !codeOptions ?
            <GeneralLoader/> :
            <Field
              component={renderSelectField}
              name="BudgetIdentifier"
              label="BudgetIdentifier"
              selectOptions={codeOptions}
              defaultOption="Select one of the following options"
            />
        }
      <div className="columns small-6">
        <Field
          name="BudgetPercentage"
          type="text"
          component={renderField}
          label="Percentage"
        />
      </div>
    </div>
    <div className="row">
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

class CountryBudgetForm extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('BudgetIdentifier');
    this.props.getCodeListItems('BudgetIdentifierVocabulary');
  }

  render() {
    const {activity} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Country Budget Item</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderCountryBugetForm
            vocabularyOptions={activity["BudgetIdentifierVocabulary"]}
            codeOptions={activity["BudgetIdentifier"]}
            languageOptions={activity["Language"]}
          />
        </div>
        <FieldArray
          name="additionalCountryBuget"
          component={renderAdditionalRenderCountryBugetForm}
          vocabularyOptions={activity["BudgetIdentifierVocabulary"]}
          codeOptions={activity["BudgetIdentifier"]}
          languageOptions={activity["Language"]}
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'CountryBudgetForm',     // a unique identifier for this form
})(CountryBudgetForm)
