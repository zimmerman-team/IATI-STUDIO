import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderAdditionalRenderFinancialBudgetForm = ({fields, budgetTypeOptions, budgetStatusOptions, currencyOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderFinancialBudgetForm
          budgetTypeOptions={budgetTypeOptions}
          budgetStatusOptions={budgetStatusOptions}
          currencyOptions={currencyOptions}/>
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


const RenderFinancialBudgetForm = ({budgetTypeOptions, budgetStatusOptions, currencyOptions}) =>
 (
  <div>
    <div className="row">
      {
        !budgetTypeOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="budgetTypeOptions"
            label="Budget Type Options"
            selectOptions={budgetTypeOptions}
            defaultOption="Select one of the following options"
          />
      }
        {
          !budgetStatusOptions ?
            <GeneralLoader/> :
            <Field
              component={renderSelectField}
              name="budgetStatusOptions "
              label="Budget Status Options"
              selectOptions={budgetStatusOptions}
              defaultOption="Select one of the following options"
            />
        }
    </div>
    <div className="row">
      <div className="columns small-6">
        Period start
        <Field
          name="dateStart"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    <div className="row">
      <div className="columns small-6">
        Period end
        <Field
          name="dateEnd"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    Value
    <div className="row">
      <div className="columns small-6">
        <Field
          name="amount"
          type="text"
          component={renderField}
          label="Amount"
        />
      </div>
      <div className="columns small-6">
        <Field
          name="date"
          type="text"
          component={renderField}
          label="Currency"
        />
      </div>
    </div>
    <div className="row">
      <div className="columns small-6">
        <Field
          name="valueDate"
          type="date"
          component={renderField}
          label="Value date"
        />
      </div>
    </div>
  </div>
);

class FinancialBudgetForm extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('BudgetType');
    this.props.getCodeListItems('BudgetStatus');
    this.props.getCodeListItems('Currency');
  }

  render() {
    const {activity} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">The Budget</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderFinancialBudgetForm
            budgetTypeOptions={activity["BudgetType"]}
            budgetStatusOptions={activity["BudgetStatus"]}
            currencyOptions={activity["Currency"]}
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderFinancialBudgetForm}
          budgetTypeOptions={activity["BudgetType"]}
          budgetStatusOptions={activity["BudgetStatus"]}
          currencyOptions={activity["Currency"]}
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'FinancialBudgetForm',     // a unique identifier for this form
})(FinancialBudgetForm)
