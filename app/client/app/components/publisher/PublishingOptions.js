'use strict'

import React, { PropTypes } from 'react'

let PublishingOptions = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>Publishing options</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons iconaPiatta">info</i></a>
        </div>
        <div className="input-group">
          <input id="checkbox1" type="checkbox" /><label for="checkbox1">Automatically publish activities to the IATI registry</label>
        </div>

      </div>
    )
  }
})

export default PublishingOptions
