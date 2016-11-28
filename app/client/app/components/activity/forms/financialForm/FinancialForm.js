import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import FinancialBudgetForm from './FinancialBudgetForm'
import FinancialPlannedDisbursement from './FinancialPlannedDisbursement'

class FinancialForm extends React.Component {

  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getCodeListItems('FinanceType');
    this.props.getCodeListItems('FinanceTypeCategory');
    this.props.getCodeListItems('Currency');
    this.props.getCodeListItems('DescriptionType');
    this.props.getCodeListItems('HumanitarianScopeType');
    this.props.getCodeListItems('TransactionType');
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;
    if (!activity['FinanceType'] || !activity['FinanceTypeCategory']) {
      return <GeneralLoader />
    }

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Financial</h2>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field-list">
            <div className="row">
              <Field
                component={renderSelectField}
                name="financeType"
                label='Finance Type'
                selectOptions={activity["FinanceType"]}
                defaultOption="Select one of the following options"
              />
              <Field
                component={renderSelectField}
                name="financeTypeCategory"
                label='Finance Type Category'
                selectOptions={activity["FinanceTypeCategory"]}
                defaultOption="Select one of the following options"
              />
            </div>
            <FinancialBudgetForm {...this.props}/>
            <FinancialPlannedDisbursement {...this.props}/>
          </div>
        </form>
        <div className="row">
          <div className="columns small-12">
            <button type="button" className="button" onClick={previousPage}>Back to Classifications</button>
            <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
              Continue to Document Link
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'FinancialForm',
  destroyOnUnmount: false
})(FinancialForm)
