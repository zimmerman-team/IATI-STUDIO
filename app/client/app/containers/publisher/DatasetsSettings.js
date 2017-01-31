"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'

import DatasetsSettings from '../../components/publisher/DatasetsSettings'

import { publisherSelector } from '../../reducers/createActivity'

class DatasetsSettingsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'modifiedActivities': [],
            'publishCount': null,
        }
    }

    componentWillMount() {
        this.props.toggleMainMenu(true)

        if (this.props.publisher.id) {
            console.log('componentWillMount');
            this.props.getModifiedActivities(this.props.publisher.id)
                .then(action => this.setState({ modifiedActivities: action.response }))

            this.props.getReadyToPublishActivities(this.props.publisher.id)
                .then(action => this.setState({ publishCount: action.response.count }))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.publisher.id !== nextProps.publisher.id) {

            this.props.getModifiedActivities(nextProps.publisher.id)
                .then(action => this.setState({ modifiedActivities: action.response.results }))

            this.props.getReadyToPublishActivities(nextProps.publisher.id)
                .then(action => this.setState({ publishCount: action.response.count }))
        }
    }

    render() {
        console.log(this.state);

        return (
            <DatasetsSettings 
                {...this.props}
                modifiedActivities={this.state.modifiedActivities}
                publishCount={this.state.publishCount}
            />
        )
    }
}


function mapStateToProps(state, props) {
    return {
        navState: state.navState,
        publisher: publisherSelector(state),
    }
}

import { publishActivities, generateXmlFile } from '../../actions/async'
import { toggleMainMenu }       from '../../actions/sync'
import { getModifiedActivities, getReadyToPublishActivities } from '../../actions/activity'

export default connect(mapStateToProps, {
    toggleMainMenu,
    publishActivities,
    generateXmlFile,
    getModifiedActivities,
    getReadyToPublishActivities
})(DatasetsSettingsContainer)


