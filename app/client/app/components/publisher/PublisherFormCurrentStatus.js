'use strict'

import React, { PropTypes } from 'react'

let PublisherFormCurrentStatus = React.createClass({
  render: function () {
    return (
      <div>
        <div>
          <h6>Current status</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
        </div>
        <div className="input-group">
          <input className="input-group-field inputNotValidated" type="text" value="NOT VALIDATED" disabled="disabled" />
        </div>
      </div>
    )
  }
})

export default PublisherFormCurrentStatus
