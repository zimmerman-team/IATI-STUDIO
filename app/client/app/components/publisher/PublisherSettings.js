"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { browserHistory }     from 'react-router'
import { toggleMainMenu }     from '../../actions/sync'
import PublisherWrapper       from './PublisherWrapper'


let PublisherSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() { this.props.toggleMainMenu(false) },

  render: function() {
    return (
      <div>
        <PublisherWrapper />
      </div>
    )
  }
})

function mapStateToProps(state, props) { return {} }

export default connect(mapStateToProps, {toggleMainMenu,})(PublisherSettings)
