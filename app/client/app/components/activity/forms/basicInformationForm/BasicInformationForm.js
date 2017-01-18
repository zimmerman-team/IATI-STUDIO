import React, {Component} from 'react'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import DescriptionForm from './BasicInformationDescriptionForm'
import DateForm from './BasicInformationDateForm'
import ContactForm from './BasicInformationContactForm'
import StatusForm from './BasicInformationStatusForm'

import ActivityTooltip from '../../ActivityTooltip'

class BasicInformationForm extends React.Component {

    constructor(props) {
        super(props);
        this.getFormComponentFromRoute = this.getFormComponentFromRoute.bind(this)
    }

    getFormComponentFromRoute(subTab) {
        switch(subTab) {
            case 'description':
                return <DescriptionForm { ...this.props }/>;
            case 'status':
                return <StatusForm { ...this.props }/>;
            case 'date':
                return <DateForm { ...this.props }/>;
            case 'contact':
                return <ContactForm { ...this.props }/>;
            default:
                return <DescriptionForm { ...this.props }/>;
        }
    }

    //@todo: Move IATI activity editor to separate component.
    render() {
        const {subTab} = this.props;
        const formSubComponent = this.getFormComponentFromRoute(subTab);

        return (
            <div>
                <ActivityTooltip
                    text="An IATI Activity"
                />
                {formSubComponent}
            </div>
        )
    }
}

export default BasicInformationForm;
