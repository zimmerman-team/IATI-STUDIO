'use strict'

import React, { PropTypes } from 'react'

let CurrentStatus = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>Current status</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons iconaPiatta">info</i></a>
        </div>
        <div className="input-group">
          <input className="input-group-field input-not-validated" type="text" placeholder="NOT VALIDATED" />
        </div>

      </div>
    )
  }
})

export default CurrentStatus
