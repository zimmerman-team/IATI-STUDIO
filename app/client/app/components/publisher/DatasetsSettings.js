"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { Link }                 from 'react-router'
import moment                   from 'moment'
import {Tooltip } from '../general/Tooltip.react.jsx'


class DatasetActivityPublisher extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { dataset, modifiedActivities, publishCount, totalCount, isFetching } = this.props

        let messageComponent;

        if(isFetching || (dataset && dataset.export_in_progress)) {
            messageComponent = <p>Export is currently in progress... We will send you an email upon completion</p>
        }
        else if (!dataset) {
            messageComponent = (
                <div>
                    <h4>Create dataset</h4>
                    <p>You have not yet published to the registry, click publish to publish your first IATI dataset</p>
                    <a 
                        onClick={this.props.publish}
                        className="button"
                    >Publish</a>
                </div>
            )
        }
        else if (modifiedActivities && modifiedActivities.length === 0) {
            messageComponent = (
                <div>
                    <h4>Dataset</h4>
                    <a href={dataset.source_url}>Click here to go to the activity XML</a>
                    <h4>Update dataset</h4>
                    <p>No changes to be published</p>
                </div>
            )
        }
        else {
            messageComponent = (
                <div>
                    <h4>Dataset</h4>
                    <a href={dataset.source_url}>Click here to go to the activity XML</a>

                    <h4>Update dataset</h4>
                    <p>You will publish { publishCount } of a total of { totalCount } activities</p>
                    <p>{ modifiedActivities.length } activities have been added or modified</p>
                    <a 
                        onClick={this.props.publish}
                        className="button"
                    >Publish</a>
                </div>
            )
        }

        console.log(<messageComponent />);


        console.log('called dataset', dataset);
        return (
            <div className="row">
                <div className="activity-publish columns small-centered small-12">
                    <h3>Activity Dataset</h3>
                    { messageComponent }
                </div>
            </div>
        )
    }
}


class DatasetOrganisationPublisher extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { dataset } = this.props

        return (
            <div className="row">
                <div className="organisation-publish columns small-centered small-12">
                    <h3>Organisation Dataset</h3>
                    { !dataset ?
                        <p>You have not yet published to the registry, click publish to publish your first IATI dataset</p>
                        :
                        <p>Update your dataset</p>
                    }
                </div>
            </div>
        )
    }
}

let DatasetsSettings = React.createClass({ // A stateful container all children are stateless

    render: function() {
        const { publisher } = this.props

        let wrapClass = classNames('pusher',{
            'pushed' : this.props.navState.menuState
        })

        if (!this.props.publisher.id) {
            return (
                <div className={wrapClass}>
                    <div className="row controls">
                        <div className="columns small-12">
                            <h1>First do the publisher setup!</h1>
                        </div>
                    </div>
                </div>
            )
        }

        let datasetsPublisher;

        if(publisher){
            const activityDataset = publisher.activityDataset
            const organisationDataset = publisher.organisationDataset

            console.log(activityDataset, 'called');

            datasetsPublisher = 
                <div>
                    <DatasetActivityPublisher
                        isFetching={publisher.isFetching}
                        dataset={activityDataset}
                        publish={ this.props.publishActivities }
                        modifiedActivities={this.props.modifiedActivities}
                        publishCount={this.props.publishCount}
                        totalCount={this.props.totalCount}
                    />
                    <DatasetOrganisationPublisher
                        isFetching={publisher.isFetching}
                        dataset={organisationDataset}
                        publish={this.props.publishOrganisations}
                    />
                </div>

        } else {
            datasetsPublisher =
                (
                <div className="row">
                    <div className="columns small-12">
                        <p>You have to be validated with the IATI Registry first. Go to <Link to="/publisher/settings/">our publisher settings</Link> to set this up.</p>
                    </div>
                </div>
            )
        }

        return (
            <div className={wrapClass}>
                <div className="row controls">
                    <div className="columns small-centered small-12">
                        <h2 className="page-title with-tip">Your IATI datasets</h2>
                        <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
                        <hr />
                    </div>
                </div>
                {datasetsPublisher}
            </div>
        )
    }

})

export default DatasetsSettings
