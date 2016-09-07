'use strict'

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import PublisherPageTitle       from '../general/PublisherPageTitle'
import PublisherButtons         from '../general/PublisherButtons'

let OrgWrapper = React.createClass({
  render: function () {
    return (
      <div id="orgWrapper">
        <div className="rowPub">
          <PublisherPageTitle pageTitleContent="Organisation settings" />
          <PublisherButtons type:delete />
        </div>
      </div>
    )
  }
})

export default OrgWrapper
