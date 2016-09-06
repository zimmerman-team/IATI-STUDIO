'use strict'

import React, { PropTypes } from 'react'

let PublisherMenuTendina = React.createClass({
  render: function () {
    return (
      <div className="columns small-12 medium-4">
        <div className="menuTendinaOuter">
          <div className="menuTendinaInner">
            <ul className="menuTendina">
              <li>
                <a href="#">Registry settings</a>
                <ul className="menuTendinaNested">
                  <li><a href="#">API key</a></li>
                  <li><a href="#">Publishing options</a></li>
                  <li><a href="#">Import</a></li>
                </ul>
              </li>
              <li><a href="#">Activity defaults</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherMenuTendina
