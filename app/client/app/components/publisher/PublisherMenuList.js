'use strict'

import React, { PropTypes } from 'react'

let PublisherMenuList = React.createClass({
  render: function () {
    return (
      <div className="menuTendinaOuter">
        <div className="menuTendinaInner">
          <ul className="menuTendina">
            <li>
              <a href="#">Registry settings</a><i className="material-icons iMenuList">keyboard_arrow_up</i>
              <ul className="menuTendinaNested">
                <li><a href="#">API key</a></li>
                <li><a href="#">Publishing options</a></li>
                <li><a href="#">Datasets</a></li>
              </ul>
            </li>
            <li>
              <a href="#">Activity defaults</a><i className="material-icons iMenuList">keyboard_arrow_down</i>
            </li>
          </ul>
        </div>
      </div>
    )
  }
})

export default PublisherMenuList
