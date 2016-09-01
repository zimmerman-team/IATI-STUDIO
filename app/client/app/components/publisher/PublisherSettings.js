"use strict"

import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { toggleMainMenu } from '../../actions/sync'

// A state container: all children are stateless
let PublisherSettings = React.createClass({

    componentDidMount: function() {
    },

    componentWillMount: function() {
        this.props.toggleMainMenu(false)
    },

    render: function() {

        return (
            <div>
                Publisher settings page
            </div>
        )

    }
})

function mapStateToProps(state, props) {
    return {}
}

export default connect(mapStateToProps, {
    toggleMainMenu,
})(PublisherSettings)

