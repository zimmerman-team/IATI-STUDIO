import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderAdditionalRenderFinancialPlannedDisbursementForm = ({fields, disbursementChannelOptions, currencyOptions, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderFinancialPlannedDisbursementForm
          disbursementChannelOptions={disbursementChannelOptions}
          currencyOptions={currencyOptions}
          languageOptions={languageOptions}
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


const RenderFinancialPlannedDisbursementForm = ({disbursementChannelOptions, currencyOptions, languageOptions}) =>
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
        name="ContactOrganisation"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="narrativeOrganisation[text]"
        textLabel="Title"
      />
    </div>
  </div>
);

class FinancialPlannedDisbursement extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('DisbursementChannel');
    this.props.getCodeListItems('Currency');
    this.props.getCodeListItems('Language');
  }

  render() {
    const {activity} = this.props;

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
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderFinancialPlannedDisbursementForm}
          currencyOptions={activity["Currency"]}
          languageOptions={activity["Language"]}
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'FinancialPlannedDisbursement',     // a unique identifier for this form
})(FinancialPlannedDisbursement)
