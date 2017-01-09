import React, {Component} from "react";
import PerformanceConditionForm from "./PerformanceConditionForm";
import PerformanceResultForm from "./PerformanceResultForm";
import PerformanceCommentForm from "./PerformanceCommentForm";

class PerformanceForm extends Component {

  constructor(props) {
    super(props);
  }

  static getFormSubComponentComponentFromRoute(subTab) {
    switch(subTab) {
      case 'condition':
        return <PerformanceConditionForm/>;
      case 'result':
        return <PerformanceResultForm/>;
      case 'comment':
        return <PerformanceCommentForm/>;

      default:
        return <PerformanceConditionForm/>;
    }
  }

  render() {
    const {subTab} = this.props;
    const formSubComponent = PerformanceForm.getFormSubComponentComponentFromRoute(subTab);

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Performance</h2>
            <hr />
          </div>
        </div>
        {formSubComponent}
      </div>
    )
  }
}

export default PerformanceForm;
