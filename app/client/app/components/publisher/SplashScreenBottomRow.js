"use strict"

import React, { PropTypes }       from 'react'
import { connect }                from 'react-redux'
import classNames                 from 'classnames'
import ReactCSSTransitionGroup    from 'react-addons-css-transition-group'
import { Tooltip }                from '../general/Tooltip.react.jsx'

let SplashScreenBottomRow = React.createClass({
  render: function () {
    return (
      <div>

        <div className="row">

          <div className="columns small-12 medium-4 large-4">
            <div style={{ display: 'inline-block' }}>
            <h6>
              IATI Registry API key
              <Tooltip tooltip="Info"><a className="edit button flat" style={{ margin: '10px' }} onClick={this.props.infoItem}><i className="material-icons">info</i></a></Tooltip>
            </h6>
            </div>
            <div style={{ display: 'inline' }}>
              <div style={{ display: 'inline-block' }}>
                <input type="text" name="" placeholder="Enter your API key" />
              </div>
              <div style={{ display: 'inline-block' }}>
                <input type="submit" className="button" placeholder="" />
              </div>
            </div>
          </div>

          <div className="columns small-12 medium-4 large-4">
            <div>
              <h6>Current status</h6>
              <input type="text" name="" placeholder="NOT VALIDATED" />
            </div>
          </div>

          <div className="columns small-12 medium-4 large-4">
          </div>

        </div>

      </div>
    )
  }
})

export default SplashScreenBottomRow
