import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderSelectField, renderOrgFields} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {Link} from 'react-router';
import {connect} from 'react-redux'
import handleSubmit from '../../helpers/handleSubmit'
import {withRouter} from 'react-router'
import {plannedDisbursementsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {
    getCodeListItems, createActivity, getPlannedDisbursements, createPlannedDisbursement, updatePlannedDisbursement,
    deletePlannedDisbursement
} from '../../../../actions/activity'

const renderAdditionalRenderFinancialPlannedDisbursementForm = ({
    fields, disbursementChannelOptions, currencyOptions,
    languageOptions, organisationOptions, meta: {touched, error}
}) => (
    <div>
        {fields.map((description, index) =>
            <div className="field-list" key={index}>
                <RenderFinancialPlannedDisbursementForm
                    disbursementChannelOptions={disbursementChannelOptions}
                    currencyOptions={currencyOptions}
                    languageOptions={languageOptions}
                    organisationOptions={organisationOptions}
                />
            </div>
        )}
        <div className="columns">
            <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
            <button
                type="button"
                title="Remove Title"
                className="control-button remove float-right"
                onClick={() => fields.pop()}>Delete
            </button>
            {touched && error && <span className="error">{error}</span>}
        </div>
    </div>
);


const RenderFinancialPlannedDisbursementForm = ({
    disbursementChannelOptions, currencyOptions,
    languageOptions, organisationOptions
}) => (
    <div>
        <div className="row no-margin">
            {
                !disbursementChannelOptions ?
                    <GeneralLoader/> :
                    <Field
                        component={renderSelectField}
                        name="type"
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
                    name="period_start"
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
                    name="period_end"
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
                    name="amount"
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
                        name="currency"
                        label="Currency"
                        selectOptions={currencyOptions}
                        defaultOption="Select one of the following options"
                    />
            }
        </div>
        <div className="row no-margin">
            <div className="columns small-6">
                <Field
                    name="valueDate"
                    type="date"
                    component={renderField}
                    label="Value date"
                />
            </div>
        </div>
        <div className="row no-margin">
            <FieldArray
                name="ProviderOrg"
                component={renderOrgFields}
                languageOptions={languageOptions}
                organisationOptions={organisationOptions}
                textName="receiverOrg[text]"
                mainLabel="Provider org"
                textLabel="Title"
            />
        </div>
        <div className="row no-margin">
            <FieldArray
                name="ReceiverOrg"
                component={renderOrgFields}
                languageOptions={languageOptions}
                organisationOptions={organisationOptions}
                textName="receiverOrg[text]"
                mainLabel="Receiver org"
                textLabel="Title"
            />
        </div>
    </div>
);

const validate = values => {
    const errors = {};

    if (!values.type) {
        errors.type = 'Required'
    }
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
        const plannedDisbursements = formData.plannedDisbursements;

        handleSubmit(
            publisher.id,
            'plannedDisbursements',
            activityId,
            data,
            plannedDisbursements,
            this.props.createPlannedDisbursement,
            this.props.updatePlannedDisbursement,
            this.props.deletePlannedDisbursement,
        );
        //this.context.router.push('/publisher/activities/financial/transaction');
    }

    static contextTypes = {
        router: PropTypes.object,
    };

    componentWillMount() {
        this.props.getCodeListItems('DisbursementChannel');
        this.props.getCodeListItems('Currency');
        this.props.getCodeListItems('Language');
        this.props.getCodeListItems('OrganisationType');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('plannedDisbursements', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`plannedDisbursements[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('plannedDisbursements', i)
            }
        }

        console.log(nextProps.publisher);

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getPlannedDisbursements(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting} = this.props;

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
                    <div className="field-list">
                        <RenderFinancialPlannedDisbursementForm
                            currencyOptions={codelists["Currency"]}
                            disbursementChannelOptions={codelists["DisbursementChannel"]}
                            languageOptions={codelists["Language"]}
                            organisationOptions={codelists["OrganisationType"]}
                        />
                    </div>
                    <FieldArray
                        name="additionalPlannedDisbursement"
                        component={renderAdditionalRenderFinancialPlannedDisbursementForm}
                        currencyOptions={codelists["Currency"]}
                        languageOptions={codelists["Language"]}
                        disbursementChannelOptions={codelists["DisbursementChannel"]}
                        organisationOptions={codelists["OrganisationType"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to="/publisher/activities/financial/budget">Back to budget</Link>
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
    const plannedDisbursements = plannedDisbursementsSelector(state)

    return {
        data: plannedDisbursements,
        codelists: state.codelists,
        initialValues: {"plannedDisbursements": plannedDisbursements},  // populate initial values for redux form
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
    getPlannedDisbursements,
    createPlannedDisbursement,
    updatePlannedDisbursement,
    deletePlannedDisbursement
})(FinancialPlannedDisbursement);

FinancialPlannedDisbursement = connect(mapStateToProps, {
    getCodeListItems,
    createActivity
})(FinancialPlannedDisbursement);
export default withRouter(FinancialPlannedDisbursement);
