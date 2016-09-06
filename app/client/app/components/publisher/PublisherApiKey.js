'use strict'

import React, { PropTypes } from 'react'

let PublisherApiKey = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>IATI Registry API key</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className="input-group-field" type="text" label="Enter your API key"/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Validate" />
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
            <input className="input-group-field inputValidated" type="text" value="VALIDATED" disabled />
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherApiKey
