'use strict'

import React, { PropTypes } from 'react'

let PublisherFormIatiRegistryApiKey = React.createClass({
  render: function () {
    return (
      <div>

        <div>
          <h6>IATI Registry API key</h6>
          <a className='iconaPiatta' href='#'><i className="material-icons">info</i></a>
        </div>

        <div className="input-group">
          <input className="input-group-field" type="text" placeholder="Enter your API key" />
          <div className="input-group-button">
            <input type="submit" className="button" value="Validate" />
          </div>
        </div>

      </div>
    )
  }
})

export default PublisherFormIatiRegistryApiKey
