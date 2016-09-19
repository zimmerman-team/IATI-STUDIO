"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { browserHistory }     from 'react-router'
import { toggleMainMenu }     from '../../actions/sync'
import PublisherWrapper       from './PublisherWrapper'
import { fetchPublisher }     from '../../actions/async'


function loadData(props) {
    props.fetchPublisher()
}

let PublisherSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() {

    this.props.toggleMainMenu(false)
    loadData(this.props)
  },

  render: function() {
    return (
      <div>
        <PublisherWrapper publisher={this.props.publisher} />
      </div>
    )
  }
})

function mapStateToProps(state, props) {

    const { publisher } = state
    return {
        publisher: publisher,
    }
}


export default connect(mapStateToProps, {
  toggleMainMenu,
  fetchPublisher
})(PublisherSettings)
