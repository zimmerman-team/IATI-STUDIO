import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import FinancialBudgetForm from './FinancialBudgetForm'
import FinancialPlannedDisbursement from './FinancialPlannedDisbursement'
import FinancialTransactionForm from './FinancialTransactionForm'

class FinancialForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;

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
            <FinancialBudgetForm/>
            <FinancialPlannedDisbursement/>
            <FinancialTransactionForm/>
            <div className=""><h6>Capital Spend</h6></div>
            <div className="row">
              <div className="columns small-6">
                <Field
                  name="capitalSpend"
                  type="text"
                  component={renderField}
                  label="Capital Spend"
                />
              </div>
            </div>
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
  form: 'financial',
  destroyOnUnmount: false
})(FinancialForm)
