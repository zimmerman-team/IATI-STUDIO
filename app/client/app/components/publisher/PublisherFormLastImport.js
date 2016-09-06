'use strict'

import React, { PropTypes } from 'react'

let PublisherFormLastImport = React.createClass({
  render: function () {
    return (
      <div className="columns small-12 medium-6">
        <div>
          <h6>Last import</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
        </div>
        <div className="input-group">
          <input className="input-group-field inputNeutro" type="text" value="Never" disabled />
        </div>
      </div>
    )
  }
})

export default PublisherFormLastImport
