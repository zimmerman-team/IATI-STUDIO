'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'

let PublisherApiKey = React.createClass({

  getInitialState: function () {
    return {
      validationKey: 'good'
    }
  },

  getValidate: function () {
    let verifyKey = this.state.validationKey == 'good' ? 'bad' : 'good'
    this.setState({ validationKey: verifyKey })
  },

  render: function () {
    return (
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>IATI Registry API key {this.state.validationKey}</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className="input-group-field" type="text" label="Enter your API key"/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Validate" onClick={this.getValidate} />
            </div>
          </div>
        </div>
        <div className="columns small-12 medium-6">
          <div>
            <h6>Current status</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className="input-group-field inputNotValidated" type="text" value="NOT VALIDATED" disabled />
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherApiKey
