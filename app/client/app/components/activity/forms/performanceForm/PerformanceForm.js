import React, {Component} from "react";
import {reduxForm} from "redux-form";
import PerformanceConditionForm from "./PerformanceConditionForm";
import PerformanceResultForm from "./PerformanceResultForm";
import PerformanceCommentForm from "./PerformanceCommentForm";

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
            <PerformanceConditionForm/>
            <PerformanceResultForm/>
            <PerformanceCommentForm/>
          </div>
        </form>
        <div className="row no-margin">
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
  form: 'performance',
  destroyOnUnmount: false
})(PerformanceForm)
