import React, {Component} from 'react'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import FinancialBudgetForm from './FinancialBudgetForm'
import FinancialPlannedDisbursementForm from './FinancialPlannedDisbursementForm'
import FinancialTransactionForm from './FinancialTransactionForm'
import FinancialCapitalForm from './FinancialCapitalForm'

class FinancialForm extends React.Component {

    constructor(props) {
        super(props);
    }

    static getFormSubComponentComponentFromRoute(subTab) {
        switch (subTab) {
            case 'budget':
                return <FinancialBudgetForm {...this.props}/>;
            case 'planned-disbursement':
                return <FinancialPlannedDisbursementForm {...this.props}/>;
            case 'transaction':
                return <FinancialTransactionForm {...this.props}/>;
            case 'capital':
                return <FinancialCapitalForm {...this.props}/>;

            default:
                return <FinancialBudgetForm {...this.props}/>;
        }
    }

    render() {
        const {subTab} = this.props;
        const formSubComponent = FinancialForm.getFormSubComponentComponentFromRoute(subTab);

        return (
            <div>
                <div className="row controls">
                    <div className="columns small-centered small-12">
                        <h2 className="page-title with-tip">Financial</h2>
                        <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
                        <hr />
                    </div>
                </div>
                {formSubComponent}
            </div>
        );
    }
}

export default FinancialForm;

