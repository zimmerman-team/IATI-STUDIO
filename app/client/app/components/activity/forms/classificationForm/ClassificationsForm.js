import React, { Component } from 'react'
import SectorForm from './ClassificationSectorForm'
import PolicyMakerForm from './ClassificationPolicyForm'
import CountryBudgetForm from './ClassificationCountryBudgetForm'
import SelectForm from './ClassificationSelectForm'
import HumanitarianScopeForm from './ClassificationHumanitarianScopeForm'

class ClassificationsForm extends Component {
  constructor(props) {
    super(props)
  }

  static getFormSubComponentComponentFromRoute(subTab) {
    switch(subTab) {
      case 'sector':
        return <SectorForm/>;
      case 'policy':
        return <PolicyMakerForm/>;
      case 'select':
        return <SelectForm/>;
      case 'country':
        return <CountryBudgetForm/>;
      case 'humanitarian':
        return <HumanitarianScopeForm/>;
      default:
        return <SectorForm/>;
    }
  }

  render() {
    const {subTab} = this.props;
    const formSubComponent = ClassificationsForm.getFormSubComponentComponentFromRoute(subTab);

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Classifications</h2>
            <hr />
          </div>
        </div>
        {formSubComponent}
      </div>
    )
  }
}

export default ClassificationsForm;
