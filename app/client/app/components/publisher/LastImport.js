'use strict'

import React, { PropTypes } from 'react'

let LastImport = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>Last import</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons iconaPiatta">info</i></a>
        </div>
        <div className="input-group">
          <input className="input-group-field" type="text" placeholder="Never" />
        </div>
        
      </div>
    )
  }
})

export default LastImport
