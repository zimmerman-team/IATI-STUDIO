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
        const { dataset, modifiedActivities, publishCount, isFetching } = this.props

        return (
            <div className="row">
                <div className="activity-publish columns small-centered small-12">
                    <h3>Activity Dataset</h3>
                    { !dataset ?
                        <p>You have not yet published to the registry, click publish to publish your first IATI dataset</p>
                        :
                        <div>
                            <a href={dataset.source_url}>Click here to go to the activity XML</a>
                        </div>
                    }
                    {
                        modifiedActivities && modifiedActivities.length === 0 ?
                            <h4>No changes to be published</h4>
                            :
                            <div>
                                <p>You will publish { publishCount } activities</p>
                                <p>{ modifiedActivities.length } activities have been added or modified</p>
                                <p>Update your dataset</p>
                                <a 
                                    onClick={this.props.publish}
                                    className="button"
                                    disabled={isFetching}
                                >
                                    Publish</a>
                            </div>
                    }
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

        let datasetsPublisher;

        if(this.props.publisher){
            const activityDataset = _.find(publisher.datasets, (p) => p.id && p.filetype === 'Activity' && p.added_manually)
            const organisationDataset = _.find(publisher.datasets, (p) => p.id && p.filetype === 'Organisation' && p.added_manually)

            datasetsPublisher = 
                <div>
                    <DatasetActivityPublisher
                        isFetching={publisher.isFetching}
                        dataset={activityDataset}
                        publish={() => this.props.publishActivities(publisher.id, activityDataset && activityDataset.id)}
                        modifiedActivities={this.props.modifiedActivities}
                        publishCount={this.props.publishCount}
                    />
                    <DatasetOrganisationPublisher
                        isFetching={publisher.isFetching}
                        dataset={organisationDataset}
                        publish={() => this.props.publishActivities(publisher.id, organisationDataset && organisationDataset.id)}
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
