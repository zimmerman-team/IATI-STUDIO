"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { Link }                 from 'react-router'
import moment                   from 'moment'
import {Tooltip } from '../general/Tooltip.react.jsx'


class DatasetActivityPublisher extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { dataset } = this.props

        return (
            <div className="row">
                <div className="activity-publish columns small-centered small-12">
                    <h3>Activity Dataset</h3>
                    <a onClick={this.props.publish} className="button">Publish</a>
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
                </div>
            </div>
        )
    }
}

let DatasetsSettings = React.createClass({ // A stateful container all children are stateless

    publishDataset: function (name, title, filetype){
        this.props.publishDataset(this.props.publisher, name, title, filetype)
    },

    deleteDataset: function (dataset){
        this.props.deleteDataset(this.props.publisher, dataset)
    },

    updateDataset: function (dataset){
        this.props.updateDataset(this.props.publisher, dataset)
    },

    generateXmlFile: function (dataset){
        this.props.generateXmlFile(this.props.publisher, dataset)
    },

    componentWillMount: function() {
        this.props.toggleMainMenu(true)
    },

    render: function() {
        const { publisher } = this.props

        let wrapClass = classNames('pusher',{
            'pushed' : this.props.navState.menuState
        })

        let datasetsPublisher;

        if(this.props.publisher){
            console.log(publisher.datasets);
            const activityDataset = _.find(publisher.datasets, (p) => p.id && p.filetype === 'Activity' && p.added_manually)
            const organisationDataset = _.find(publisher.datasets, (p) => p.id && p.filetype === 'Organisation' && p.added_manually)

            console.log(activityDataset);
            console.log(organisationDataset);

            datasetsPublisher = 
                <div>
                    <DatasetActivityPublisher
                        dataset={activityDataset}
                        publish={() => this.props.publishActivities(publisher.id, activityDataset && activityDataset.id)}
                    />
                    <DatasetOrganisationPublisher
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

import { publisherSelector } from '../../reducers/createActivity'

function mapStateToProps(state, props) {
    return {
        navState: state.navState,
        publisher: publisherSelector(state),
    }
}

import { publishActivities, generateXmlFile } from '../../actions/async'

export default connect(mapStateToProps, {
    toggleMainMenu,
    publishActivities,
    generateXmlFile
})(DatasetsSettings)


