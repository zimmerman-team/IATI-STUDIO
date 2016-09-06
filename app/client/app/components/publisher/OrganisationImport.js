'use strict'

import React, { PropTypes } from 'react'

let OrganisationImport = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>Import</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons iconaPiatta">info</i></a>
        </div>
        <div className="input-group">
          <input className="input-group-field" type="text" placeholder="Enter your organisation's IATI identifier" />
          <div className="input-group-button">
            <input type="submit" className="button" value="Import" />
          </div>
        </div>

      </div>
    )
  }
})

export default OrganisationImport
