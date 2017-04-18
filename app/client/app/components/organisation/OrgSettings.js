"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { browserHistory }     from 'react-router'
import { toggleMainMenu }     from '../../actions/sync'
import {GeneralLoader} from '../general/Loaders.react.jsx'

import {
    // getOrganisation,
    markReadyToPublishOrganisation
} from '../../actions/organisation'


import OrganisationSidebar from './OrganisationSidebar'
import OrganisationPublishState from './OrganisationPublishState.js'

import { publisherSelector } from '../../reducers/publisher.js'

import IdentificationForm from './forms/IdentificationForm'

class OrgSettings extends React.Component {

    constructor(props) {
        super(props);

        this.getFormComponentFromRoute = this.getFormComponentFromRoute.bind(this);
    }

    componentDidMount() {
        this.props.toggleMainMenu(true)
    }

    componentDidMount() {
        this.props.toggleMainMenu(false)
    }

//     componentWillMount() {
//         if (this.props.publisher && this.props.publisher.id) {
//             this.props.getActivity(this.props.publisher.id, this.props.activityId)
//         }
//     }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
    //         this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
    //     }
    // }

    getFormComponentFromRoute(tab, subTab, activityId) {
        switch (subTab) {
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
                return <h1>Not Found!</h1>;
        }
    }


    render() {
        const { publisher, tab, subTab } = this.props
        
        let wrapClass = classNames('row', 'pusher',{ 'pushed' : this.props.navState.menuState
        })

        if (!publisher || !publisher.id) {
            return <GeneralLoader/>
        }

        const organisation = publisher.organisation

        const formComponent = this.getFormComponentFromRoute(tab, subTab);

        return (
            <div>
                <div className={ wrapClass }>
                    <div className="columns small-9">
                        <OrganisationPublishState
                            markReadyToPublish={this.props.markReadyToPublishOrganisation}
                            publishedState={organisation.published_state}
                            organisationId={organisation.id}
                            publisherId={this.props.publisher && this.props.publisher.id}
                        />
                        {formComponent}
                    </div>
                    <div className="columns small-3 activity-nav-col">
                        <OrganisationSidebar
                            mainForm={tab}
                            subForm={subTab}
                            organisationId={organisation.id}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) { 

    return {
        navState: state.navState,
        publisher: publisherSelector(state),
        tab: props.params.tab,
        subTab: props.params.subTab,
    } 
}

export default connect(mapStateToProps, {toggleMainMenu,})(OrgSettings)
