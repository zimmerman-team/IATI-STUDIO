import React, { Component, PropTypes } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import handleSubmit from '../../helpers/handleSubmit'
import { budgetsSelector } from '../../../../reducers/createActivity.js'
import { getCodeListItems, getBudgets, createBudget, updateBudget, deleteBudget } from '../../../../actions/activity'
import { withRouter } from 'react-router'


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
    <div className="row no-margin">
      {
        !budgetTypeOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="type"
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
            name="status"
            label="Budget Status Options"
            selectOptions={budgetStatusOptions}
            defaultOption="Select one of the following options"
          />
      }
    </div>
    <div className="row no-margin">
      <div className="columns small-6">
        Period start
        <Field
          name="period_start"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    <div className="row no-margin">
      <div className="columns small-6">
        Period end
        <Field
          name="period_end"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    Value
    <div className="row no-margin">
      <div className="columns small-6">
        <Field
          name="amount"
          type="text"
          component={renderField}
          label="Amount"
        />
      </div>
      {
        !currencyOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="currency"
            label="Currency"
            selectOptions={currencyOptions}
            defaultOption="Select one of the following options"
          />
      }
    </div>
    <div className="row no-margin">
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

const validate = values => {
  const errors = {};

  if (!values.status) {
    errors.status = 'Required'
  }
  return errors
};

class FinancialBudgetForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit financial's budget data
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const { activityId, data, tab, subTab } = this.props
      const lastBudget = data;
      const budgets = formData.budgets;

      handleSubmit(
          'budgets',
          activityId,
          lastBudget,
          budgets,
          this.props.createBudget,
          this.props.updateBudget,
          this.props.deleteBudget,
      )
      //this.context.router.push('/publisher/activity/financial/planned-disbursement');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('BudgetType');
    this.props.getCodeListItems('BudgetStatus');
    this.props.getCodeListItems('Currency');
  }

  render() {
    const {codelists, handleSubmit, submitting} = this.props;

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">The Budget</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <RenderFinancialBudgetForm
              budgetTypeOptions={codelists["BudgetType"]}
              budgetStatusOptions={codelists["BudgetStatus"]}
              currencyOptions={codelists["Currency"]}
            />
          </div>
          <FieldArray
            name="additionalHumanitarianScope"
            component={renderAdditionalRenderFinancialBudgetForm}
            budgetTypeOptions={codelists["BudgetType"]}
            budgetStatusOptions={codelists["BudgetStatus"]}
            currencyOptions={codelists["Currency"]}
          />
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/classification/classification">Back to classification</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to Planned Disbursement
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    const budgets = budgetsSelector(state)

    return {
        data: budgets,
        codelists: state.codelists,
        ...props,
    }
}

FinancialBudgetForm = reduxForm({
  form: 'financial-budget',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(FinancialBudgetForm);


FinancialBudgetForm = connect(mapStateToProps, {
    getCodeListItems,
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget
})(FinancialBudgetForm);

export default FinancialBudgetForm;
