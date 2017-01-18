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

const renderAdditionalRenderFinancialTransactionForm = ({
    fields, humanitarianOptions,
    transactionOptions, organisationOptions, languageOptions, currencyOptions,
    disbursementOptions, sectorVocabularyOptions, sectorOptions, countryOptions,
    flowOptions, financeOptions, aidOptions, tiedOptions, meta: {touched, error}
}) => (
    <div>
        {fields.map((transaction, index) =>
            <div className="field-list" key={index}>
                <RenderFinancialTransactionForm
                    humanitarianOptions={humanitarianOptions}
                    organisationOptions={organisationOptions}
                    languageOptions={languageOptions}
                    currencyOptions={currencyOptions}
                    transactionOptions={transactionOptions}
                    countryOptions={countryOptions}
                    flowOptions={flowOptions}
                    financeOptions={financeOptions}
                    aidOptions={aidOptions}
                    tiedOptions={tiedOptions}
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


const RenderFinancialTransactionForm = ({
    humanitarianOptions, transactionOptions,
    organisationOptions, languageOptions, currencyOptions, disbursementOptions,
    sectorVocabularyOptions, sectorOptions, countryOptions,
    flowOptions, financeOptions, aidOptions, tiedOptions
}) =>
    (
        <div>
            <div className="row no-margin">
                <div className="columns small-6">
                    <Field
                        name="reference"
                        type="text"
                        component={renderField}
                        label="Reference"
                    />
                </div>
                <Field
                    name="humanitarian"
                    component={renderSelectField}
                    label="Humanitarian"
                    selectOptions={humanitarianOptions}
                    defaultOption="Select one of the following options"
                />
            </div>
            <div className="row no-margin">
                <Field
                    name="transaction_type"
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
                        name="transaction_date"
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
                <div className="columns small-6">
                    <Field
                        name="value_date"
                        type="date"
                        component={renderField}
                        label="Value date"
                    />
                </div>
            </div>
            <div className="row no-margin">
                <Field
                    name="currency"
                    component={renderSelectField}
                    label="Currency"
                    selectOptions={currencyOptions}
                    defaultOption="Select one of the following options"
                />
            </div>
            <div className="row no-margin">
                <FieldArray
                    name="transaction"
                    component={renderNarrativeFields}
                    languageOptions={languageOptions}
                    textName="textTitle"
                    textLabel="Text"
                    narrativeLabel="Description"
                />
            </div>
            <div className="row no-margin">
                <FieldArray
                    name="provider_organisation"
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
                    name="receiver_organisation"
                    component={renderOrgFields}
                    languageOptions={languageOptions}
                    organisationOptions={organisationOptions}
                    textName="receiverOrg[text]"
                    mainLabel="Receiver org"
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
                                name="disbursement_channel"
                                label="Type"
                                selectOptions={disbursementOptions}
                                defaultOption="Select one of the following options"
                            />
                    }
                </div>
            </div>
            <FieldArray
                name="Sector"
                component={renderSectorFields}
                sectorVocabularyOptions={sectorVocabularyOptions}
                sectorOptions={sectorOptions}
                languageOptions={languageOptions}
                textName="Sector[text]"
                textLabel="Sector"
            />
            <div className="row no-margin">
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Recipient country</h2>
                </div>
            </div>
            <div className="row no-margin">
                <Field
                    name="country"
                    component={renderSelectField}
                    label="Country"
                    selectOptions={countryOptions}
                    defaultOption="Select one of the following options"
                />
            </div>
            <div className="row no-margin">
                <FieldArray
                    name="transaction"
                    component={renderNarrativeFields}
                    languageOptions={languageOptions}
                    textName="textTitle"
                    textLabel="Text"
                    narrativeLabel="Description"
                />
            </div>
            <RenderSingleSelect
                name='flow_type'
                label='Flow Type'
                selectOptions={flowOptions}/>
            <RenderSingleSelect
                name='finance_type'
                label='Finance Type'
                selectOptions={financeOptions}/>
            <RenderSingleSelect
                name='aid_type'
                label='Aid Type'
                selectOptions={aidOptions}/>
            <RenderSingleSelect
                name='tied_status'
                label='Tied Status'
                selectOptions={tiedOptions}/>
        </div>
    );

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
        const {activityId, data, tab, subTab, publisher} = this.props
        const lastTransaction = data;
        const transactions = formData.transactions;

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
        //this.context.router.push('/publisher/activities/financial/capital');
    }

    static contextTypes = {
        router: PropTypes.object,
    };

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
                    <div className="field-list">
                        <RenderFinancialTransactionForm
                            humanitarianOptions={codelists["HumanitarianScopeType"]}
                            organisationOptions={codelists["OrganisationType"]}
                            languageOptions={codelists["Language"]}
                            currencyOptions={codelists["Currency"]}
                            disbursementOptions={codelists["DisbursementChannel"]}
                            transactionOptions={codelists["TransactionType"]}
                            sectorVocabularyOptions={codelists["SectorVocabulary"]}
                            sectorOptions={codelists["Sector"]}
                            countryOptions={codelists["Country"]}
                            flowOptions={codelists["FlowType"]}
                            financeOptions={codelists["FinanceType"]}
                            aidOptions={codelists["AidType"]}
                            tiedOptions={codelists["TiedStatus"]}
                        />
                        <FieldArray
                            name="additionalHumanitarianScope"
                            component={renderAdditionalRenderFinancialTransactionForm}
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
                        />
                        <div className="columns small-12">
                            <Link className="button" to="/publisher/activities/financial/planned-disbursement">Back to
                                planned disbursement</Link>
                            <button className="button float-right" type="submit" disabled={submitting}>
                                Continue to capital
                            </button>
                        </div>
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