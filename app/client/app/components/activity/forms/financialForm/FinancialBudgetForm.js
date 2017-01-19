import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import handleSubmit from '../../helpers/handleSubmit'
import {publisherSelector} from '../../../../reducers/createActivity.js'
import {getCodeListItems, getActivity, createBudget, updateBudget, deleteBudget} from '../../../../actions/activity'
import {withRouter} from 'react-router'

const renderFinancialBudgetForm = ({fields, budgetTypeOptions, budgetStatusOptions, currencyOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((budget, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="row no-margin">
                            {
                                !budgetTypeOptions ?
                                    <GeneralLoader/> :
                                    <Field
                                        component={renderSelectField}
                                        name={`${budget}type.code`}
                                        textName={`${budget}type.code`}
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
                                        name={`${budget}status.code`}
                                        textName={`${budget}status.code`}
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
                                    name={`${budget}period_start`}
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
                                    name={`${budget}period_end`}
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
                                    name={`${budget}value.value`}
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
                                        name={`${budget}value.currency`}
                                        tesxtName={`${budget}value.currency`}
                                        label="Currency"
                                        selectOptions={currencyOptions}
                                        defaultOption="Select one of the following options"
                                    />
                            }
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${budget}value.date`}
                                    type="date"
                                    component={renderField}
                                    label="Value date"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
                        <button
                            type="button"
                            title="Remove Title"
                            className="control-button remove float-right"
                            onClick={() => fields.remove(index)}>Delete
                        </button>
                        {touched && error && <span className="error">{error}</span>}
                    </div>
                    <br/><br/>
                </div>
            )}
        </div>
    )
};


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
        const {activityId, data, publisher} = this.props;
        const budgets = formData.budgets;

        handleSubmit(
            publisher.id,
            'budgets',
            activityId,
            data,
            budgets,
            this.props.createBudget,
            this.props.updateBudget,
            this.props.deleteBudget,
        );

        this.props.router.push(`/publisher/activities/${activityId}/financial/planned-disbursement`)
    }

    componentWillMount() {
        this.props.getCodeListItems('BudgetType');
        this.props.getCodeListItems('BudgetStatus');
        this.props.getCodeListItems('Currency');
    }

    componentWillReceiveProps(nextProps) {
        //if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher)
        if (this.props.activityId &&  this.props.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting, activity, activityId} = this.props;

        if (!activity ||  !codelists["BudgetType"] || !codelists["BudgetStatus"] || !codelists["Currency"]) {
            return <GeneralLoader/>
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">The Budget</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="budgets"
                        component={renderFinancialBudgetForm}
                        budgetTypeOptions={codelists["BudgetType"]}
                        budgetStatusOptions={codelists["BudgetStatus"]}
                        currencyOptions={codelists["Currency"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/classifications/humanitarian`}>Back to humanitarian</Link>
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
    const { activityId } = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let budgets = currentActivity && currentActivity.budgets;

    return {
        data: budgets,
        activity: state.activity.activity,
        codelists: state.codelists,
        initialValues: {"budgets": budgets},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

FinancialBudgetForm = reduxForm({
    form: 'financial-budget',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(FinancialBudgetForm);

FinancialBudgetForm = connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
    createBudget,
    updateBudget,
    deleteBudget
})(FinancialBudgetForm);

export default withRouter(FinancialBudgetForm)
