import React from 'react'
import {connect}            from 'react-redux'
import {toggleMainMenu} from '../../actions/sync'

import { 
    getActivity,
    createActivity,
    getCodeListItems,
    addBasicInformation,
    addParticipatingOrganisation,
    addDocumentLink
} from '../../actions/activity'

import store from '../../app'
import IdentificationForm from './forms/identificationForm/IdentificationForm'
import BasicInformationForm from './forms/basicInformationForm/BasicInformationForm'
import ParticipatingOrganisationForm from './forms/participatingOrganisationForm/ParticipatingOrganisationForm'
import GeopoliticalInformationForm from './forms/geopoliticalForm/GeopoliticalForm'
import ClassificationsForm from './forms/classificationForm/ClassificationsForm'
import DocumentLinkForm from './forms/documentLinkForm/DocumentLinkForm'
import RelationsForm from './forms/relationsForm/RelationsForm'
import FinancialForm from './forms/financialForm/FinancialForm'
import ActivitySidebar from './ActivitySidebar'
import PerformanceForm from './forms/performanceForm/PerformanceForm'

class ActivityEdit extends React.Component {

    constructor(props) {
        super(props);

        this.getFormComponentFromRoute = this.getFormComponentFromRoute.bind(this);

    }

    /**
     * Submit participating organisation data and redirect
     * to geopolitical information form.
     *
     * @param data
     */
    componentDidMount() {
        this.props.toggleMainMenu(false)
    }

    getFormComponentFromRoute(tab, subTab) {
        switch(tab) {
            case 'identification':
                return <IdentificationForm subTab={subTab} { ...this.props } />;
            case 'basic-info':
                return <BasicInformationForm subTab={subTab} { ...this.props }/>;
            case 'participating-organisation':
                return <ParticipatingOrganisationForm { ...this.props }/>;
            case 'geopolitical-information':
                return <GeopoliticalInformationForm subTab={subTab} { ...this.props }/>;
            case 'classifications':
                return <ClassificationsForm subTab={subTab} { ...this.props }/>;
            case 'document-link':
                return <DocumentLinkForm subTab={subTab} { ...this.props }/>;
            case 'relations':
                return <RelationsForm subTab={subTab} { ...this.props }/>;
            case 'financial':
                return <FinancialForm subTab={subTab} { ...this.props }/>;
            case 'performance':
                return <PerformanceForm subTab={subTab} { ...this.props }/>;
            default:
                // TODO: return a nice not found screen here - 2017-01-02
                return <h1>Not Found!</h1>
        }
    }

    render() {
        const mainForm = this.props.tab;
        const subForm = this.props.subTab;
        const formComponent = this.getFormComponentFromRoute(mainForm, subForm);

        return (
            <div>
                <div className="row">
                    <div className="columns small-9">
                        {formComponent}
                    </div>
                    <div className="columns small-3 activity-nav-col">
                        <ActivitySidebar mainForm={mainForm} subForm={subForm}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {

    // const activityId = props.activityId

    return {
        navState: state.navState,
        codelists: state.codelists,
        activityId: props.params.activityId,
        tab: props.params.tab,
        subTab: props.params.subTab,

    }
}

export default connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
    createActivity,
    addParticipatingOrganisation,
    toggleMainMenu,
})(ActivityEdit);
