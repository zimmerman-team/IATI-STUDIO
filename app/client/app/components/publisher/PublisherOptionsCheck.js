'use strict'

import React, { PropTypes } from 'react'

let PublisherOptionsCheck = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>Publishing options</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input type="checkbox" /><label>Automatically publish activities to the IATI registry</label>
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherOptionsCheck
