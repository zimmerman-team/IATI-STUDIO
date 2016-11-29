import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField, renderOrgFields,
    renderSectorFields, RenderSingleSelect} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderAdditionalRenderFinancialTransactionForm = ({fields, humanitarianOptions,
    transactionOptions, organisationOptions, languageOptions, currencyOptions,
    disbursementOptions, sectorVocabularyOptions, sectorOptions, countryOptions,
    flowOptions, financeOptions, aidOptions, tiedOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
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


const RenderFinancialTransactionForm = ({humanitarianOptions, transactionOptions,
    organisationOptions, languageOptions, currencyOptions, disbursementOptions,
    sectorVocabularyOptions, sectorOptions, countryOptions,
    flowOptions, financeOptions, aidOptions, tiedOptions}) =>
 (
  <div>
    <div className="row">
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
    <div className="row">
      <Field
        name="transactionType"
        component={renderSelectField}
        label="Transaction type"
        selectOptions={transactionOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <div className="row">
      <div className="columns small-6">
        Transaction date
        <Field
          name="transactionDate"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    Value
    <div className="row">
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
          name="valueDate"
          type="date"
          component={renderField}
          label="Value date"
        />
      </div>
    </div>
    <div className="row">
      <div className="columns small-6">
        <Field
          name="currency"
          component={renderSelectField}
          label="Currency"
          selectOptions={currencyOptions}
          defaultOption="Select one of the following options"
        />
      </div>
    </div>
    <div className="row">
      <FieldArray
        name="additionalTitles"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="textTitle"
        textLabel="Text"
        narrativeLabel="Description"
      />
    </div>
    <div className="row">
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
    <div className="row">
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
    <div>
      <div className=""><h6>Disbursement channel</h6></div>
      <div className="row">
        {
          !disbursementOptions ?
            <GeneralLoader/> :
            <Field
              component={renderSelectField}
              name="disbursementChannelOptions"
              label="Type"
              selectOptions={disbursementOptions}
              defaultOption="Select one of the following options"
            />
        }
      </div>
    </div>
    <div className="row">
      <FieldArray
        name="Sector"
        component={renderSectorFields}
        sectorVocabularyOptions={sectorVocabularyOptions}
        sectorOptions={sectorOptions}
        languageOptions={languageOptions}
        textName="Sector[text]"
        textLabel="Sector"
      />
    </div>
    <div className="row">
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Recipient country</h2>
      </div>
    </div>
    <div className="row">
      <Field
        name="country"
        component={renderSelectField}
        label="Country"
        selectOptions={countryOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <div className="row">
      <FieldArray
        name="additionalTitles"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="textTitle"
        textLabel="Text"
        narrativeLabel="Description"
      />
    </div>
    <RenderSingleSelect
      name='flowType'
      label='Flow Type'
      selectOptions={flowOptions}/>
    <RenderSingleSelect
      name='financeType'
      label='Finance Type'
      selectOptions={financeOptions}/>
    <RenderSingleSelect
      name='aidType'
      label='Aid Type'
      selectOptions={aidOptions}/>
    <RenderSingleSelect
      name='tiedStatus'
      label='Tied Type'
      selectOptions={tiedOptions}/>
  </div>
);

class FinancialTransactionForm extends Component {

  constructor(props) {
    super(props)
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

  render() {
    const {activity} = this.props;

    if (!activity["HumanitarianScopeType"] || !activity["TransactionType"] || !activity["OrganisationType"]
        || !activity["Currency"] || !activity["Language"] || !activity["DisbursementChannel"]
        || !activity["SectorVocabulary"] || !activity["Sector"] || !activity["Country"]
        || !activity["FlowType"] || !activity["FinanceType"] || !activity["AidType"] || !activity["TiedStatus"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Transaction</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderFinancialTransactionForm
            humanitarianOptions={activity["HumanitarianScopeType"]}
            organisationOptions={activity["OrganisationType"]}
            languageOptions={activity["Language"]}
            currencyOptions={activity["Currency"]}
            disbursementOptions={activity["DisbursementChannel"]}
            transactionOptions={activity["TransactionType"]}
            sectorVocabularyOptions={activity["SectorVocabulary"]}
            sectorOptions={activity["Sector"]}
            countryOptions={activity["Country"]}
            flowOptions={activity["FlowType"]}
            financeOptions={activity["FinanceType"]}
            aidOptions={activity["AidType"]}
            tiedOptions={activity["TiedStatus"]}
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderFinancialTransactionForm}
          humanitarianOptions={activity["HumanitarianScopeType"]}
          organisationOptions={activity["OrganisationType"]}
          languageOptions={activity["Language"]}
          currencyOptions={activity["Currency"]}
          disbursementOptions={activity["DisbursementChannel"]}
          transactionOptions={activity["TransactionType"]}
          countryOptions={activity["Country"]}
          flowOptions={activity["FlowType"]}
          financeOptions={activity["FinanceType"]}
          aidOptions={activity["AidType"]}
          tiedOptions={activity["TiedStatus"]}
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'FinancialTransactionForm',     // a unique identifier for this form
})(FinancialTransactionForm)
