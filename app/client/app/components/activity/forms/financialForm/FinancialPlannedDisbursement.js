import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderSelectField, renderOrgFields} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

const renderAdditionalRenderFinancialPlannedDisbursementForm = ({fields, disbursementChannelOptions, currencyOptions,
    languageOptions, organisationOptions, meta: {touched, error}}) => (
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


const RenderFinancialPlannedDisbursementForm = ({disbursementChannelOptions, currencyOptions,
    languageOptions, organisationOptions}) =>
 (
  <div>
    <div className="row">
      {
        !disbursementChannelOptions ?
          <GeneralLoader/> :
          <Field
            component={renderSelectField}
            name="disbursementChannelOptions"
            label="Type"
            selectOptions={disbursementChannelOptions}
            defaultOption="Select one of the following options"
          />
      }
    </div>
    <div className="row">
      <div className="columns small-6">
        Period start
        <Field
          name="dateStart"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    <div className="row">
      <div className="columns small-6">
        Period end
        <Field
          name="dateEnd"
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
          name="date"
          type="text"
          component={renderField}
          label="Currency"
        />
      </div>
    </div>
    <div className="row">
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
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.ReceiverOrg) {
    errors.type = 'Required'
  }
  return errors
};

class FinancialPlannedDisbursement extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('DisbursementChannel');
    this.props.getCodeListItems('Currency');
    this.props.getCodeListItems('Language');
    this.props.getCodeListItems('OrganisationType');
  }

  render() {
    const {activity} = this.props;

    if (!activity["DisbursementChannel"] || !activity["Currency"]
        || !activity["Language"] || !activity["OrganisationType"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Planned Disbursement</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderFinancialPlannedDisbursementForm
            currencyOptions={activity["Currency"]}
            disbursementChannelOptions={activity["DisbursementChannel"]}
            languageOptions={activity["Language"]}
            organisationOptions={activity["OrganisationType"]}
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderFinancialPlannedDisbursementForm}
          currencyOptions={activity["Currency"]}
          languageOptions={activity["Language"]}
          disbursementChannelOptions={activity["DisbursementChannel"]}
          organisationOptions={activity["OrganisationType"]}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

FinancialPlannedDisbursement = reduxForm({
  form: 'financial-planned-disbursement',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(FinancialPlannedDisbursement);


FinancialPlannedDisbursement = connect(mapStateToProps, {getCodeListItems, createActivity})(FinancialPlannedDisbursement);
export default FinancialPlannedDisbursement;
