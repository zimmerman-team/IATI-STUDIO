import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {
    renderNarrativeFields, renderField, renderSelectField, renderOrgFields,
    renderSectorFields, RenderSingleSelect
} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {
    getCodeListItems,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {transactionsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderFinancialTransactionForm = ({
    fields, humanitarianOptions,
    transactionOptions, organisationOptions, languageOptions, currencyOptions,
    disbursementOptions, sectorVocabularyOptions, sectorOptions, countryOptions,
    flowOptions, financeOptions, aidOptions, tiedOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((transaction, index) =>
                <div key={index}>
            <div className="field-list">
                <div>
                    <div className="row no-margin">
                        <div className="columns small-6">
                            <Field
                                name={`${transaction}reference`}
                                type="text"
                                component={renderField}
                                label="Reference"
                            />
                        </div>
                        <Field
                            name={`${transaction}humanitarian`}
                            textName={`${transaction}humanitarian`}
                            component={renderSelectField}
                            label="Humanitarian"
                            selectOptions={[{code: "true", name: "true"}, {code: "false", name: "false"}]}
                            defaultOption="Select one of the following options"
                        />
                    </div>
                    <div className="row no-margin">
                        <Field
                            name={`${transaction}transaction_type.code`}
                            textName={`${transaction}transaction_type.code`}
                            component={renderSelectField}
                            label="Transaction type"
                            selectOptions={transactionOptions}
                            defaultOption="Select one of the following options"
                        />
                    </div>
                    <div className="row no-margin">
                        <div className="columns small-6">
                            Transaction date
                            <Field
                                name={`${transaction}transaction_date`}
                                type="date"
                                component={renderField}
                                label="Date"
                            />
                        </div>
                        <div className="columns small-6">
                            <Field
                                name={`${transaction}activity_id`}
                                type="text"
                                component={renderField}
                                label="Activity ID"
                            />
                        </div>
                    </div>
                    Value
                    <div className="row no-margin">
                        <div className="columns small-6">
                            <Field
                                name={`${transaction}value`}
                                type="number"
                                component={renderField}
                                label="Amount"
                            />
                        </div>
                        <div className="columns small-6">
                            <Field
                                name={`${transaction}value_date`}
                                type="date"
                                component={renderField}
                                label="Value date"
                            />
                        </div>
                    </div>
                    <div className="row no-margin">
                        <Field
                            name={`${transaction}currency.code`}
                            textName={`${transaction}currency.code`}
                            component={renderSelectField}
                            label="Currency"
                            selectOptions={currencyOptions}
                            defaultOption="Select one of the following options"
                        />
                    </div>
                    <div className="row no-margin">
                        <FieldArray
                            name={`${transaction}transaction`}
                            component={renderNarrativeFields}
                            languageOptions={languageOptions}
                            textName="textTitle"
                            textLabel="Text"
                            narrativeLabel="Description"
                        />
                    </div>
                    <div className="row no-margin">
                        <FieldArray
                            name={`${transaction}provider_organisation`}
                            textName={`${transaction}provider_organisation`}
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
                            name={`${transaction}receiver_organisation`}
                            textName={`${transaction}receiver_organisation`}
                            component={renderOrgFields}
                            languageOptions={languageOptions}
                            organisationOptions={organisationOptions}
                            mainLabel="Receiver org"
                            activityKey="receiver_activity_id"
                            textLabel="Title"
                        />
                    </div>
                    <div>
                    <div className=""><h6>Disbursement channel</h6></div>
                        <div className="row no-margin">
                            {
                                !disbursementOptions ?
                                    <GeneralLoader/> :
                                    <Field
                                        component={renderSelectField}
                                        name={`${transaction}disbursement_channel.code`}
                                        textName={`${transaction}disbursement_channel.code`}
                                        label="Type"
                                        selectOptions={disbursementOptions}
                                        defaultOption="Select one of the following options"
                                    />
                            }
                        </div>
                    </div>
                    <FieldArray
                        name={`${transaction}sector`}
                        textName={`${transaction}sector`}
                        component={renderSectorFields}
                        sectorVocabularyOptions={sectorVocabularyOptions}
                        sectorOptions={sectorOptions}
                        languageOptions={languageOptions}
                        textLabel="Sector"
                    />
                    <div className="row no-margin">
                        <div className="columns small-centered small-12">
                            <h2 className="page-title with-tip">Recipient country</h2>
                        </div>
                    </div>
                    <div className="row no-margin">
                        <Field
                            name={`${transaction}country`}
                            textName={`${transaction}country`}
                            component={renderSelectField}
                            label="Country"
                            selectOptions={countryOptions}
                            defaultOption="Select one of the following options"
                        />
                    </div>
                    <div className="row no-margin">
                        <FieldArray
                            name={`${transaction}description.narratives`}
                            component={renderNarrativeFields}
                            languageOptions={languageOptions}
                            textName="textTitle"
                            textLabel="Text"
                            narrativeLabel="Description"
                        />
                    </div>
                    <RenderSingleSelect
                        name={`${transaction}flow_type.code`}
                        textName={`${transaction}flow_type.code`}
                        label='Flow Type'
                        selectOptions={flowOptions}/>
                    <RenderSingleSelect
                        name={`${transaction}finance_type.code`}
                        textName={`${transaction}finance_type.code`}
                        label='Finance Type'
                        selectOptions={financeOptions}/>
                    <RenderSingleSelect
                        name={`${transaction}aid_type.code`}
                        textName={`${transaction}aid_type.code`}
                        label='Aid Type'
                        selectOptions={aidOptions}/>
                    <RenderSingleSelect
                        name={`${transaction}tied_status.code`}
                        textName={`${transaction}tied_status.code`}
                        label='Tied Status'
                        selectOptions={tiedOptions}/>
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

    if (!values.aid_type) {
        errors.type = 'Required'
    }
    return errors
};

class FinancialTransactionForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit financial's transaction data and redirect to capital form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props
        const lastTransaction = data;
        let transactions = formData.transactions;
        transactions.activity_id = activityId;

        handleSubmit(
            publisher.id,
            'transactions',
            activityId,
            lastTransaction,
            transactions,
            this.props.createTransaction,
            this.props.updateTransaction,
            this.props.deleteTransaction,
        )
        this.props.router.push(`/publisher/activities/${activityId}/financial/capital`);
    }


    componentWillMount() {
        this.props.getCodeListItems('HumanitarianScopeType');
        this.props.getCodeListItems('TransactionType');
        this.props.getCodeListItems('Currency');
        this.props.getCodeListItems('Language');
        this.props.getCodeListItems('OrganisationType');
        this.props.getCodeListItems('DisbursementChannel');
        this.props.getCodeListItems('SectorVocabulary');
        this.props.getCodeListItems('Sector');
        this.props.getCodeListItems('Country');
        this.props.getCodeListItems('FlowType');
        this.props.getCodeListItems('FinanceType');
        this.props.getCodeListItems('AidType');
        this.props.getCodeListItems('TiedStatus');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('transactions', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`transactions[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('transactions', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getTransactions(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting} = this.props;

        if (!codelists["HumanitarianScopeType"] || !codelists["TransactionType"] || !codelists["OrganisationType"]
            || !codelists["Currency"] || !codelists["Language"] || !codelists["DisbursementChannel"]
            || !codelists["SectorVocabulary"] || !codelists["Sector"] || !codelists["Country"]
            || !codelists["FlowType"] || !codelists["FinanceType"] || !codelists["AidType"] || !codelists["TiedStatus"]) {
            return <GeneralLoader/>
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Transaction</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <FieldArray
                            name="transactions"
                            component={renderFinancialTransactionForm}
                            humanitarianOptions={codelists["HumanitarianScopeType"]}
                            organisationOptions={codelists["OrganisationType"]}
                            languageOptions={codelists["Language"]}
                            currencyOptions={codelists["Currency"]}
                            disbursementOptions={codelists["DisbursementChannel"]}
                            transactionOptions={codelists["TransactionType"]}
                            countryOptions={codelists["Country"]}
                            flowOptions={codelists["FlowType"]}
                            financeOptions={codelists["FinanceType"]}
                            aidOptions={codelists["AidType"]}
                            tiedOptions={codelists["TiedStatus"]}
                            sectorVocabularyOptions={codelists["SectorVocabulary"]}
                            sectorOptions={codelists["Sector"]}
                        />
                        <div className="columns small-12">
                            <Link className="button" to="/publisher/activities/financial/planned-disbursement">Back to
                                planned disbursement</Link>
                            <button className="button float-right" type="submit" disabled={submitting}>
                                Continue to capital
                            </button>
                        </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const transactions = transactionsSelector(state);

    return {
        data: transactions,
        codelists: state.codelists,
        initialValues: {"transactions": transactions},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

FinancialTransactionForm = reduxForm({
    form: 'financial-transaction',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(FinancialTransactionForm);

FinancialTransactionForm = connect(mapStateToProps, {
    getCodeListItems,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
})(FinancialTransactionForm);

export default withRouter(FinancialTransactionForm)