"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'

import DatasetsSettings from '../../components/publisher/DatasetsSettings'

import { publisherSelector } from '../../reducers/createActivity'
import {GeneralLoader} from '../../components/general/Loaders.react.jsx'

class DatasetsSettingsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'modifiedActivities': [],
            'publishCount': null,
            'totalCount': null,
        }

        this.publishActivities = this.publishActivities.bind(this)
        this.publishOrganisations = this.publishOrganisations.bind(this)
    }

    componentWillMount() {
        this.props.toggleMainMenu(true)

        if (this.props.publisher.id) {
            // console.log(this.props.fetchActivities(this.props.publisher.id))
            this.props.fetchActivities(this.props.publisher.id)
                .then(action => this.setState({ totalCount: action.response.result.count }))
            this.props.getModifiedActivities(this.props.publisher.id)
                .then(action => this.setState({ modifiedActivities: action.response.results }))
            this.props.getReadyToPublishActivities(this.props.publisher.id)
                .then(action => this.setState({ publishCount: action.response.count }))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.publisher.id !== nextProps.publisher.id) {
            this.props.fetchActivities(nextProps.publisher.id)
                .then(action => this.setState({ totalCount: action.response.result.count }))
            this.props.getModifiedActivities(nextProps.publisher.id)
                .then(action => this.setState({ modifiedActivities: action.response.results }))
            this.props.getReadyToPublishActivities(nextProps.publisher.id)
                .then(action => this.setState({ publishCount: action.response.count }))
        }
    }

    publishActivities() {
        const { publisher } = this.props

        this.props.publishActivities(publisher.id, publisher.activityDataset && publisher.activityDataset.id)
            .then(() => {
                this.setState({
                    modifiedActivities: [],
                    publishCount: 0,
                    totalCount: 0,
                })
            }) 
    }

    publishOrganisations() {
        const { publisher } = this.props
        this.props.publishOrganisations(publisher.id, publisher.activityDataset.id)
    }

    render() {
        if (this.props.isFetching) {
            return <GeneralLoader/>
        }

        return (
            <DatasetsSettings 
                {...this.props}
                modifiedActivities={this.state.modifiedActivities}
                totalCount={this.state.totalCount}
                publishCount={this.state.publishCount}
                publishActivities={this.publishActivities}
            />
        )
    }
}


function mapStateToProps(state, props) {
    return {
        navState: state.navState,
        publisher: publisherSelector(state),
        isFetching: state.activity.isFetching,
    }
}

import { publishActivities, generateXmlFile } from '../../actions/async'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchActivities, getModifiedActivities, getReadyToPublishActivities } from '../../actions/activity'

export default connect(mapStateToProps, {
    toggleMainMenu,
    publishActivities,
    generateXmlFile,
    fetchActivities,
    getModifiedActivities,
    getReadyToPublishActivities
})(DatasetsSettingsContainer)


