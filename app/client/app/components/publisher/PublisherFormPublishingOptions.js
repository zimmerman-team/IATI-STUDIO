'use strict'

import React, { PropTypes } from 'react'

let PublisherFormPublishingOptions = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>Publishing options</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
        </div>
        <div className="input-group">
          <input type="checkbox" /><label>Automatically publish activities to the IATI registry</label>
        </div>

      </div>
    )
  }
})

export default PublisherFormPublishingOptions
