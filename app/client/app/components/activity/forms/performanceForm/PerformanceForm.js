import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../helpers/FormHelper";
import PerformanceConditionForm from "./PerformanceConditionForm";
import PerformanceResultForm from "./PerformanceResultForm";

class PerformanceForm extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    const {handleSubmit, submitting, previousPage} = this.props;

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Performance</h2>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field-list">
            <PerformanceConditionForm {...this.props}/>
            <PerformanceResultForm {...this.props}/>
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
  form: 'PerformanceForm',
  destroyOnUnmount: false
})(PerformanceForm)
