import React, {Component} from "react";
import PerformanceConditionForm from "./PerformanceConditionForm";
import PerformanceResultForm from "./PerformanceResultForm";
import PerformanceCommentForm from "./PerformanceCommentForm";

class PerformanceForm extends Component {

    constructor(props) {
        super(props);
        this.getFormComponentFromRoute = this.getFormComponentFromRoute.bind(this)
    }

    getFormComponentFromRoute(subTab) {
        switch (subTab) {
            case 'condition':
                return <PerformanceConditionForm { ...this.props }/>;
            case 'result':
                return <PerformanceResultForm { ...this.props }/>;
            case 'comment':
                return <PerformanceCommentForm { ...this.props }/>;
            default:
                return <PerformanceConditionForm { ...this.props }/>;
        }
    }

    render() {
        const {subTab} = this.props;
        const formSubComponent = this.getFormComponentFromRoute(subTab);

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
