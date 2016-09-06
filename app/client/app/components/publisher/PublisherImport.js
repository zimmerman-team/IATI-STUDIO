'use strict'

import React, { PropTypes } from 'react'

let PublisherImport = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>Import</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className="input-group-field" type="text" placeholder="Organisation's IATI identifier" />
            <div className="input-group-button">
              <input type="submit" className="button" value="Import" />
            </div>
          </div>
        </div>
        <div className="columns small-12 medium-6">
          <div>
            <h6>Last import</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className="input-group-field inputNeutro" type="text" value="Never" disabled />
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherImport
