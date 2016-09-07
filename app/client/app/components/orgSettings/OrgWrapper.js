'use strict'

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import PublisherPageTitle       from '../general/PublisherPageTitle'

let OrgWrapper = React.createClass({
  render: function () {
    return (
      <div id="orgWrapper">
        <PublisherPageTitle pageTitleContent="Organisation settings" />
      </div>
    )
  }
})

export default OrgWrapper
