'use strict'

import React, { PropTypes } from 'react'

let PublisherFormLastImport = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>Last import</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
        </div>
        <div className="input-group">
          <input className="input-group-field" type="text" placeholder="Never" />
        </div>

      </div>
    )
  }
})

export default PublisherFormLastImport
