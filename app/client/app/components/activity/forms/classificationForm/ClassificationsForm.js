import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import SectorForm from './ClassificationSectorForm'
import PolicyMakerForm from './ClassificationPolicyForm'
import CountryBudgetForm from './ClassificationCountryBudgetForm'
import HumanitarianScopeForm from './ClassificationHumanitarianScopeForm'
import { getCodeListItems } from '../../../../actions/activity'
import {renderNarrativeFields, renderField, renderSelectField, RenderSingleSelect} from '../../helpers/FormHelper'

class ClassificationsForm extends React.Component {

  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getCodeListItems('CollaborationType');
    this.props.getCodeListItems('FlowType');
    this.props.getCodeListItems('FinanceType');
    this.props.getCodeListItems('AidType');
    this.props.getCodeListItems('TiedStatus');
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;
    if (!activity['CollaborationType'] || !activity['FlowType'] || !activity['FinanceType']
      || !activity['AidType'] || !activity['TiedStatus']) {
          return <GeneralLoader />
    }

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Classifications</h2>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <SectorForm/>
          <PolicyMakerForm/>
          <RenderSingleSelect
            name='collaborationType'
            label='Collaboration Type'
            selectOptions={activity['CollaborationType']}/>
          <RenderSingleSelect
            name='flowType'
            label='Default Flow Type'
            selectOptions={activity['FlowType']}/>
          <RenderSingleSelect
            name='financeType'
            label='Default Finance Type'
            selectOptions={activity['FinanceType']}/>
          <RenderSingleSelect
            name='aidType'
            label='Default Aid Type'
            selectOptions={activity['AidType']}/>
          <RenderSingleSelect
            name='tiedStatus'
            label='Default Tied Type'
            selectOptions={activity['TiedStatus']}/>
          <CountryBudgetForm/>
          <HumanitarianScopeForm/>
          <div className="row no-margin">
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to Geopolitical Information</button>
              <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to Financial
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

ClassificationsForm = reduxForm({
  form: 'classification',
  destroyOnUnmount: false,
})(ClassificationsForm);


ClassificationsForm = connect(mapStateToProps, {getCodeListItems})(ClassificationsForm);
export default ClassificationsForm;
