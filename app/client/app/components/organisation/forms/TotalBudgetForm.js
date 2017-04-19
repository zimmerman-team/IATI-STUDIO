
import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../general/Loaders.react.jsx'
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import {renderField, renderSelectField, renderNarrativeFields} from '../../activity/helpers/FormHelper'
import { getTotalBudgets, createTotalBudget, updateTotalBudget, deleteTotalBudget } from '../../../actions/organisation'
import { createTotalBudgetBudgetLine, updateTotalBudgetBudgetLine, deleteTotalBudgetBudgetLine } from '../../../actions/organisation'
import { getCodeListItems } from '../../../actions/activity'
import { publisherSelector } from '../../../reducers/publisher'
import { totalBudgetSelector } from '../../../reducers/organisation'
import handleSubmit from '../../activity/helpers/handleSubmit'

const validate = values => {
    const errors = {};
    const total_budgets = values.total_budgets || [];

    errors.total_budgets = total_budgets.map(data => {
        let budgetErrors = {}
        if (!data.period_start) {
            budgetErrors.period_start = 'Required'
        }
        if (!data.period_end) {
            budgetErrors.period_end = 'Required'
        }

        if (!data.value) {
            budgetErrors.value = {}
        }

        if (!(data.value && data.value.value)) {
            budgetErrors.value = budgetErrors.value || {}
            budgetErrors.value.value = 'Required'
        }
        if (!(data.value && data.value.date)) {
            budgetErrors.value = budgetErrors.value || {}
            budgetErrors.value.date = 'Required'
        }
        if (!(data.value && data.value.currency)) {
            budgetErrors.value = budgetErrors.value || {}
            budgetErrors.value.currency = 'Required'
        }

        return budgetErrors
    })

    return {}

    return errors;
};

const renderBudgetLineForm = ({fields, currencyOptions, languageOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((budget_line, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <strong>Budget Line</strong>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${budget_line}ref`}
                                    type="text"
                                    component={renderField}
                                    label="Ref"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <strong>Value</strong>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${budget_line}value.value`}
                                    type="number"
                                    component={renderField}
                                    label="Amount"
                                />
                            </div>
                            <Field
                                component={renderSelectField}
                                name={`${budget_line}value.currency.code`}
                                textName={`${budget_line}value.currency.code`}
                                label="Currency"
                                selectOptions={currencyOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${budget_line}value.date`}
                                    type="date"
                                    component={renderField}
                                    label="Value date"
                                />
                            </div>
                        </div>
                        <div className="field-list">
                            <div className="row no-margin">
                                <FieldArray
                                    name={`${budget_line}narratives`}
                                    component={renderNarrativeFields}
                                    languageOptions={languageOptions}
                                    textLabel="Text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
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

const renderTotalBudgetForm = ({fields, budgetTypeOptions, budgetStatusOptions, currencyOptions, languageOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((budget, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${budget}status.code`}
                                textName={`${budget}status.code`}
                                label="Budget Status Options"
                                selectOptions={budgetStatusOptions}
                                defaultOption="Select one of the following options"
                            />
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
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <strong>Value</strong>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${budget}value.value`}
                                    type="number"
                                    component={renderField}
                                    label="Amount"
                                />
                            </div>
                            <Field
                                component={renderSelectField}
                                name={`${budget}value.currency.code`}
                                textName={`${budget}value.currency.code`}
                                label="Currency"
                                selectOptions={currencyOptions}
                                defaultOption="Select one of the following options"
                            />
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
                        <div className="row no-margin">
                            <FieldArray
                                name={`${budget}budget_lines`}
                                component={renderBudgetLineForm}
                                currencyOptions={currencyOptions}
                                languageOptions={languageOptions}
                            />
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
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


class TotalBudgetForm extends PureComponent {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.saveBudgetLines = this.saveBudgetLines.bind(this);
    }

    componentWillMount() {
        this.props.getCodeListItems('BudgetStatus');
        this.props.getCodeListItems('Currency');
        this.props.getCodeListItems('Language');

        if (this.props.publisher && this.props.publisher.id) {
            this.props.getTotalBudgets(this.props.publisher.id, this.props.organisation.id)
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.organisation !== nextProps.organisation || this.props.publisher !== nextProps.publisher) {
            this.props.getTotalBudgets(nextProps.publisher.id, nextProps.organisation.id)
        }
    }

    saveBudgetLines(budgetId, prevFormData, formData) {
        const { organisation, publisher } = this.props;

        console.log('saving budget lines...');

        handleSubmit(
            publisher.id,
            'total_budgets',
            [ organisation.id, budgetId],
            prevFormData,
            formData,
            this.props.createTotalBudgetBudgetLine,
            this.props.updateTotalBudgetBudgetLine,
            this.props.deleteTotalBudgetBudgetLine,
            'total_budget'
        ).then((result) => {
            console.log('in budget_line callback...', formData);
                if (!result.error) {
                    // this.props.router.push(`/publisher/activities/${activityId}/financial/planned-disbursement`)
                }

        }).catch(e => {
            console.error(e)
        })
    }

    /*
     * Submit total_budget data and redirect
     * to basic information form.
     */
    handleFormSubmit(formData) {
        const { publisher, organisation, data } = this.props;

        const prevFormData = data;
        const total_budgets = formData.total_budgets;

        console.log('called handleSubmit');
        console.log(publisher, organisation, data, formData);
        console.log(this.props.createTotalBudget);

        try {
            handleSubmit(
                publisher.id,
                'total_budgets',
                organisation.id,
                data,
                total_budgets,
                this.props.createTotalBudget,
                this.props.updateTotalBudget,
                this.props.deleteTotalBudget,
                'organisation'
            ).then((result) => {
                if (!result.error) {
                    // this.props.router.push(`/publisher/activities/${activityId}/financial/planned-disbursement`)

                    // TODO: also create budget-line objects - 2017-04-19
                    const budgetLinePromises = result.map((action, i) => {
                        let prevBudgetLines = []
                        if (prevFormData && prevFormData[i] && prevFormData[i].budget_lines) {
                            prevBudgetLines = prevFormData[i].budget_lines
                        }
                        const budget_lines = total_budgets[i].budget_lines

                        console.log(prevBudgetLines, budget_lines);

                        return this.saveBudgetLines(
                            action.response.result,
                            prevBudgetLines,
                            budget_lines
                        )
                    })

                    return Promise.all(budgetLinePromises)
                }
            }).catch((e) => {
                console.log(e)
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {submitting, organisation, handleSubmit, codeLists, organisationId, isFetching, currentIATIIdentifier, publisher} = this.props;

        if (isFetching || !organisation || !codeLists["Currency"] || !codeLists['BudgetStatus'] || !codeLists['Language']) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <Tooltip
                    text="An IATI Organisation"
                />
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">TotalBudget</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                        <i className="material-icons">info</i>
                    </Tooltip>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)} name="total_budget">
                    <div className="field-list">
                        <div className="row no-margin">
                            <FieldArray
                                name="total_budgets"
                                component={renderTotalBudgetForm}
                                budgetStatusOptions={codeLists["BudgetStatus"]}
                                currencyOptions={codeLists["Currency"]}
                                languageOptions={codeLists["Language"]}
                            />
                        </div>
                    </div>
                    <div className="columns small-12">
                        <button className="button" type="submit" disabled={submitting}>
                            Continue to basic information
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

TotalBudgetForm = reduxForm({
    form: 'total_budget',     // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(TotalBudgetForm);


const selector = formValueSelector('total_budget');

function mapStateToProps(state, props) {
    let total_budgets = totalBudgetSelector(state);
    return {
        isFetching: state.organisation.isFetching,
        submitting: state.organisation.submitting,
        organisation: state.organisation.organisation,
        codeLists: state.codeLists,
        data: total_budgets,
        initialValues: { "total_budgets": total_budgets },  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

TotalBudgetForm = connect(mapStateToProps, {
    getTotalBudgets,
    createTotalBudget,
    updateTotalBudget,
    deleteTotalBudget,
    getCodeListItems,
    createTotalBudgetBudgetLine, updateTotalBudgetBudgetLine, deleteTotalBudgetBudgetLine,
})(TotalBudgetForm);

export default withRouter(TotalBudgetForm)
