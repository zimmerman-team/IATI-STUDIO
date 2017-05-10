import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {
    renderNarrativeFields, renderField, renderSelectField, renderOrgFields,
    renderSectorFields, RenderSingleSelect, renderRecipientCountries
} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {
    getCodeListItems,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getActivity
} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {transactionsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderFinancialTransactionForm = ({
    fields, humanitarianOptions,
    transactionOptions, organisationOptions, languageOptions, currencyOptions,
    disbursementOptions, sectorVocabularyOptions, sectorOptions, countryOptions,
    flowOptions, financeOptions, aidOptions, tiedOptions, showRecipientCountry, handleDeleteFormData, meta: {touched, dirty, error}
}) => {
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
                                        name={`${transaction}ref`}
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
                            </div>

                            <div className="row no-margin">
                                <div className="columns small-6">
                                    <strong>Value</strong>
                                </div>
                            </div>

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
                            {/* @TODO uncomment when issue #949 is fixed
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
                            */}
                            <div className="row no-margin">
                                <Field
                                    name={`${transaction}provider_organisation`}
                                    textName={`${transaction}provider_organisation`}
                                    component={renderOrgFields}
                                    languageOptions={languageOptions}
                                    organisationOptions={organisationOptions}
                                    mainLabel="Provider org"
                                    activityKey="provider_activity_id"
                                    textLabel="Title"
                                />
                                <div className="columns">
                                    <button
                                        type="button"
                                        title="Remove Title"
                                        className="control-button remove float-right"
                                        onClick={() => handleDeleteFormData("financial-transaction", `${transaction}provider_organisation`)}>Clear Organization
                                    </button>
                                </div>
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
                                <div className="columns">
                                    <button
                                        type="button"
                                        title="Remove Title"
                                        className="control-button remove float-right"
                                        onClick={() => handleDeleteFormData("financial-transaction", `${transaction}receiver_organisation`)}>Clear Organization
                                    </button>
                                </div>
                            </div>
                            <div className="row no-margin">
                                <div className="columns small-6">
                                    <strong>Disbursement channel</strong>
                                </div>
                            </div>
                            <div className="row no-margin">
                                <Field
                                    component={renderSelectField}
                                    name={`${transaction}disbursement_channel.code`}
                                    textName={`${transaction}disbursement_channel.code`}
                                    label="Type"
                                    selectOptions={disbursementOptions}
                                    defaultOption="Select one of the following options"
                                />
                            </div>
                            {/*
                            <FieldArray
                                name={`${transaction}.sector`}
                                textName={`${transaction}.sector`}
                                component={renderSectorFields}
                                sectorVocabularyOptions={sectorVocabularyOptions}
                                sectorOptions={sectorOptions}
                                languageOptions={languageOptions}
                                textLabel="Sector"
                            />
                            */}

                            { showRecipientCountry ?
                                <div className="row no-margin">
                                    <FieldArray
                                        name={`${transaction}.recipient_country`}
                                        textName={`${transaction}.recipient_country`}
                                        component={renderRecipientCountries}
                                        sectorVocabularyOptions={sectorVocabularyOptions}
                                        sectorOptions={sectorOptions}
                                        languageOptions={languageOptions}
                                        countryOptions={countryOptions}
                                        textLabel="Sector"
                                    />
                                </div>
                                :
                                <div className="row no-margin">
                                    <div className="columns small-centered small-12">
                                        <h2 className="page-title with-tip">Recipient country</h2>
                                    </div>
                                    <div className="columns small-centered small-12">
                                        Geopolitical Recipient Countries has already been filled
                                    </div>
                                </div>
                            }

                            {/* @TODO uncomment when issue #949 is fixed
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
                             */}

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

    const transactions = values.transactions || [];

    errors.transactions = transactions.map(transactionData => {
        let transactionErrors = {};

        if (!transactionData.transaction_type) {
            transactionErrors.transaction_type = {code: 'Required'}
        }

        if (!transactionData.value_date) {
            transactionErrors.value_date = 'Required'
        }

        if (!transactionData.activity_id) {
            transactionErrors.activity_id = 'Required'
        }

        if (!transactionData.ref) {
            transactionErrors.ref = 'Required'
        }

        if (!transactionData.receiver_activity_id) {
            transactionErrors.receiver_activity_id = 'Required'
        }

        if (!transactionData.transaction_date) {
            transactionErrors.transaction_date = 'Required'
        }

        if (!transactionData.value) {
            transactionErrors.value = 'Required'
        }

        if (!transactionData.currency) {
            transactionErrors.currency = {code: 'Required'}
        }

        if (!transactionData.disbursement_channel) {
            transactionErrors.disbursement_channel = {code: 'Required'}
        }

        return transactionErrors
    });

    return errors
};

class FinancialTransactionForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteFormData = this.handleDeleteFormData.bind(this);
    }

    handleDeleteFormData(formName, fieldName) {
        //@TODO: Use props instead for redux-form/Change check https://github.com/erikras/redux-form/issues/152
        const metaData = {
            field: fieldName,
            form: formName,
            persistentSubmitErrors: false,
            touch: false
        };
        this.props.dispatch({meta: metaData, payload: {}, type: "@@redux-form/CHANGE"});
    }

    /**
     * Submit financial's transaction data and redirect to capital form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        const lastTransaction = data;
        let transactions = formData.transactions;

        transactions = transactions.map(function (transactionData) {
            transactionData.activity_id = activityId;
            transactionData.description = {narratives: []};
            /*
            if (transactionData.receiver_organisation) {
                transactionData.receiver_organisation.receiver_activity_id = activityId;
            }
            if (transactionData.provider_organisation) {
                transactionData.provider_organisation.provider_activity_id = activityId;
            }
            */

            if (!transactionData.provider_organisation || _.isEmpty(transactionData.provider_organisation.narratives) || _.isEmpty(transactionData.provider_organisation.narratives[0])) {
                delete transactionData.provider_organisation;
            }
            if (!transactionData.receiver_organisation || _.isEmpty(transactionData.receiver_organisation.narratives) || _.isEmpty(transactionData.receiver_organisation.narratives[0])) {
                delete transactionData.receiver_organisation;
            }
            return transactionData;
        });

        handleSubmit(
            publisher.id,
            'transactions',
            activityId,
            lastTransaction,
            transactions,
            this.props.createTransaction,
            this.props.updateTransaction,
            this.props.deleteTransaction,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/financial/capital`)
            }
        }).catch((e) => {
            console.log(e)
        })
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
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getTransactions(this.props.publisher.id, this.props.activityId)
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data;
            const newData = nextProps.data;

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
        const {codeLists, handleSubmit, submitting, activityId, isFetching, activity} = this.props;
        let showRecipientCountry = true;
        if (activity && activity.recipient_countries && activity.recipient_countries.length > 0) {
            showRecipientCountry = false;
        }

        if (isFetching || !codeLists["HumanitarianScopeType"] || !codeLists["TransactionType"] || !codeLists["OrganisationType"]
                || !codeLists["Currency"] || !codeLists["Language"] || !codeLists["DisbursementChannel"]
                || !codeLists["SectorVocabulary"] || !codeLists["Sector"] || !codeLists["Country"]
                || !codeLists["FlowType"] || !codeLists["FinanceType"] || !codeLists["AidType"] || !codeLists["TiedStatus"]) {
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
                        humanitarianOptions={codeLists["HumanitarianScopeType"]}
                        organisationOptions={codeLists["OrganisationType"]}
                        languageOptions={codeLists["Language"]}
                        currencyOptions={codeLists["Currency"]}
                        disbursementOptions={codeLists["DisbursementChannel"]}
                        transactionOptions={codeLists["TransactionType"]}
                        countryOptions={codeLists["Country"]}
                        flowOptions={codeLists["FlowType"]}
                        financeOptions={codeLists["FinanceType"]}
                        aidOptions={codeLists["AidType"]}
                        tiedOptions={codeLists["TiedStatus"]}
                        sectorVocabularyOptions={codeLists["SectorVocabulary"]}
                        sectorOptions={codeLists["Sector"]}
                        showRecipientCountry={showRecipientCountry}
                        handleDeleteFormData={this.handleDeleteFormData}
                    />
                    <div className="columns small-12">
                        <Link className="button"
                              to={`/publisher/activities/${activityId}/financial/planned-disbursement`}>
                            Back to Planned Disbursement
                        </Link>
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
    let transactions = transactionsSelector(state);
    const isFetching = state.activity.isFetching;

    return {
        data: transactions,
        isFetching: isFetching,
        codeLists: state.codeLists,
        activity: state.activity.activity,
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
    getActivity,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
})(FinancialTransactionForm);

export default withRouter(FinancialTransactionForm)