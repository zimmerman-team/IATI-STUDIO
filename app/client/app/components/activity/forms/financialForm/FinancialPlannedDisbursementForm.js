import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderSelectField, renderOrgFields} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {Link} from 'react-router';
import {connect} from 'react-redux'
import handleSubmit from '../../helpers/handleSubmit'
import {withRouter} from 'react-router'
import {publisherSelector} from '../../../../reducers/createActivity.js'
import {
    getCodeListItems, createActivity, getActivity, createPlannedDisbursement, updatePlannedDisbursement,
    deletePlannedDisbursement
} from '../../../../actions/activity'
import _ from 'lodash'

const renderFinancialPlannedDisbursementForm = ({
    fields, disbursementChannelOptions, currencyOptions,
    languageOptions, organisationOptions, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((plannedDisbursement, index) =>
                <div key={index}>
                <div className="field-list">
                    <div className="row no-margin">
                        {
                            !disbursementChannelOptions ?
                                <GeneralLoader/> :
                                <Field
                                    component={renderSelectField}
                                    name={`${plannedDisbursement}type.code`}
                                    textName={`${plannedDisbursement}type.code`}
                                    label="Type"
                                    selectOptions={disbursementChannelOptions}
                                    defaultOption="Select one of the following options"
                                />
                        }
                    </div>
                    <div className="row no-margin">
                        <div className="columns small-6">
                            Period start
                            <Field
                                name={`${plannedDisbursement}period_start`}
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
                                name={`${plannedDisbursement}period_end`}
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
                                name={`${plannedDisbursement}.value.value`}
                                type="number"
                                component={renderField}
                                label="Amount"
                            />
                        </div>
                        {
                            !currencyOptions ?
                                <GeneralLoader/> :
                                <Field
                                    component={renderSelectField}
                                    name={`${plannedDisbursement}.value.currency.code`}
                                    textName={`${plannedDisbursement}.value.currency.code`}
                                    label="Currency"
                                    selectOptions={currencyOptions}
                                    defaultOption="Select one of the following options"
                                />
                        }
                    </div>
                    <div className="row no-margin">
                        <div className="columns small-6">
                            <Field
                                name={`${plannedDisbursement}.value.date`}
                                type="date"
                                component={renderField}
                                label="Value date"
                            />
                        </div>
                    </div>
                    <div className="row no-margin">
                        <FieldArray
                            name={`${plannedDisbursement}provider_organisation`}
                            textName={`${plannedDisbursement}provider_organisation`}
                            component={renderOrgFields}
                            languageOptions={languageOptions}
                            organisationOptions={organisationOptions}
                            mainLabel="Provider org"
                            activityKey="provider_activity_id"
                            textLabel="Title"
                        />
                    </div>
                    <div className="row no-margin">
                        <FieldArray
                            name={`${plannedDisbursement}receiver_organisation`}
                            textName={`${plannedDisbursement}receiver_organisation`}
                            component={renderOrgFields}
                            languageOptions={languageOptions}
                            organisationOptions={organisationOptions}
                            mainLabel="Receiver org"
                            activityKey="receiver_activity_id"
                            textLabel="Title"
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


const validate = values => {
    let errors = {};

    const plannedDisbursements = values.planned_disbursements || [];

    errors.planned_disbursements = plannedDisbursements.map(disbursementData => {
        let disbursementErrors = {};

        if (!disbursementData.type) {
            disbursementErrors.type = {code: 'Required'}
        }

        if (!disbursementData.value) {
            disbursementErrors.value = {date: 'Required', currency: {code: 'Required'}, value: 'Required'}
        }

        if (!disbursementData.period_start) {
            disbursementErrors.period_start = 'Required'
        }

        if (!disbursementData.period_end) {
            disbursementErrors.period_end = 'Required'
        }

        return disbursementErrors
    });

    return errors
};

class FinancialPlannedDisbursement extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit financial's planned disbursement data and redirect to transaction form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        const planned_disbursements = formData.planned_disbursements;

        handleSubmit(
            publisher.id,
            'planned_disbursements',
            activityId,
            data,
            planned_disbursements,
            this.props.createPlannedDisbursement,
            this.props.updatePlannedDisbursement,
            this.props.deletePlannedDisbursement,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/financial/transaction`)
            }
        }).catch((e) => {
            console.log(e)
        })

    }

    componentWillMount() {
        this.props.getCodeListItems('DisbursementChannel');
        this.props.getCodeListItems('Currency');
        this.props.getCodeListItems('Language');
        this.props.getCodeListItems('OrganisationType');
    }

    componentWillReceiveProps(nextProps) {
        //if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher)
        if (this.props.activityId && this.props.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting, activityId} = this.props;

        if (!codelists["DisbursementChannel"] || !codelists["Currency"] || !codelists["Language"] || !codelists["OrganisationType"]) {
            return <GeneralLoader/>
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Planned Disbursement</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="planned_disbursements"
                        component={renderFinancialPlannedDisbursementForm}
                        currencyOptions={codelists["Currency"]}
                        languageOptions={codelists["Language"]}
                        disbursementChannelOptions={codelists["DisbursementChannel"]}
                        organisationOptions={codelists["OrganisationType"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/financial/budget`}>
                            Back to Budget
                        </Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to transaction
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let planned_disbursements = currentActivity && currentActivity.planned_disbursements;

    if (planned_disbursements && planned_disbursements.length > 0) {
        planned_disbursements = planned_disbursements.map(function (plannedDisbursement) {
            plannedDisbursement.receiver_organisation = _.omitBy(plannedDisbursement.receiver_organisation, _.isNil);
            plannedDisbursement.provider_organisation = _.omitBy(plannedDisbursement.provider_organisation, _.isNil);
            return plannedDisbursement;
        })
    }

    return {
        data: planned_disbursements,
        codelists: state.codelists,
        initialValues: {"planned_disbursements": planned_disbursements},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

FinancialPlannedDisbursement = reduxForm({
    form: 'financial-planned-disbursement',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(FinancialPlannedDisbursement);


FinancialPlannedDisbursement = connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
    createPlannedDisbursement,
    updatePlannedDisbursement,
    deletePlannedDisbursement
})(FinancialPlannedDisbursement);

FinancialPlannedDisbursement = connect(mapStateToProps, {
    getCodeListItems,
    createActivity
})(FinancialPlannedDisbursement);
export default withRouter(FinancialPlannedDisbursement);
