import React from 'react'
import {connect}            from 'react-redux'
import {toggleMainMenu} from '../../actions/sync'

import {
    getActivity,
    markReadyToPublishActivity
} from '../../actions/activity'

import store from '../../app'
import {GeneralLoader} from '../general/Loaders.react.jsx'
import IdentificationForm from './forms/identificationForm/IdentificationForm'
import BasicInformationForm from './forms/basicInformationForm/BasicInformationForm'
import ParticipatingOrganisationForm from './forms/participatingOrganisationForm/ParticipatingOrganisationForm'
import GeopoliticalInformationForm from './forms/geopoliticalForm/GeopoliticalForm'
import ClassificationsForm from './forms/classificationForm/ClassificationsForm'
import DocumentLinkForm from './forms/documentLinkForm/DocumentLinkForm'
import RelationsForm from './forms/relationsForm/RelationsForm'
import FinancialForm from './forms/financialForm/FinancialForm'
import PerformanceForm from './forms/performanceForm/PerformanceForm'

import ActivitySidebar from './ActivitySidebar'
import ActivityPublishState from './ActivityPublishState.js'

import { publisherSelector } from '../../reducers/createActivity.js'

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

    componentWillMount() {
        if (this.props.publisher) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }
    /**
     * Redirects to the specific form basis of route.
     *
     * @param tab
     * @param subTab
     * @param activityId
     * @returns {XML}
     */
    getFormComponentFromRoute(tab, subTab, activityId) {
        switch (tab) {
            case 'identification':
                return <IdentificationForm { ...this.props } />;
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
                return (activityId === "identification") ? <IdentificationForm { ...this.props } /> :
                    <h1>Not Found!</h1>;
        }
    }

    render() {
        const {tab, subTab, activityId, activity } = this.props;

        if (!activity) {
            return <GeneralLoader/>
        }

        const formComponent = this.getFormComponentFromRoute(tab, subTab, activityId);

        return (
            <div>
                <div className="row">
                    <div className="columns small-9">
                        <ActivityPublishState
                            markReadyToPublish={this.props.markReadyToPublishActivity}
                            publishedState={activity.published_state}
                            activityId={activityId}
                            publisherId={this.props.publisher && this.props.publisher.id}
                        />
                        {formComponent}
                    </div>
                    <div className="columns small-3 activity-nav-col">
                        <ActivitySidebar
                            mainForm={tab}
                            subForm={subTab}
                            activityId={activityId}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {

    const activityId = props.params.activityId
    let currentActivity = state.activity.activity && state.activity.activity[activityId];

    console.log(currentActivity);

    return {
        navState: state.navState,
        activity: currentActivity,
        publisher: publisherSelector(state),
        codeLists: state.codeLists,
        activityId: props.params.activityId,
        tab: props.params.tab,
        subTab: props.params.subTab,

    }
}

export default connect(mapStateToProps, {
    getActivity,
    markReadyToPublishActivity,
    toggleMainMenu,
})(ActivityEdit);
