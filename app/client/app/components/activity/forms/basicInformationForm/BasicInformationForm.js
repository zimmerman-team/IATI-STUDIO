import React, {Component} from 'react'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import DescriptionForm from './BasicInformationDescriptionForm'
import DateForm from './BasicInformationDateForm'
import ContactForm from './BasicInformationContactForm'
import StatusForm from './BasicInformationStatusForm'

class BasicInformationForm extends React.Component {

  constructor(props) {
    super(props);
  }

  static getFormSubComponentComponentFromRoute(subTab) {
    switch(subTab) {
      case 'description':
        return <DescriptionForm/>;
      case 'status':
        return <StatusForm/>;
      case 'date':
        return <DateForm/>;
      case 'contact':
        return <ContactForm/>;

      default:
        return <DescriptionForm/>;
    }
  }

  //@todo: Move IATI activity editor to separate component.
  render() {
    const {subTab} = this.props;
    const formSubComponent = BasicInformationForm.getFormSubComponentComponentFromRoute(subTab);

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        {formSubComponent}
      </div>
    )
  }
}

export default BasicInformationForm;
