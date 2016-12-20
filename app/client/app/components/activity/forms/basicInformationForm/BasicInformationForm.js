import React, {Component} from 'react'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import DescriptionForm from './BasicInformationDescriptionForm'
import DateForm from './BasicInformationDateForm'
import ContactForm from './BasicInformationContactForm'
import StatusForm from './BasicInformationStatusForm'

import ActivityTooltip from '../../ActivityTooltip'


const getFormSubComponentFromRoute = (subTab) => {
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

class BasicInformationForm extends React.Component {

    constructor(props) {
        super(props);
    }

    //@todo: Move IATI activity editor to separate component.
    render() {
        const {subTab} = this.props;
        const formSubComponent = getFormSubComponentFromRoute(subTab);

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
