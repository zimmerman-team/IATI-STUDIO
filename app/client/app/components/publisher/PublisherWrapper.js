'use strict'

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import SplashScreen             from './SplashScreen'
import PublisherPageTitle       from '../general/PublisherPageTitle'
import PublisherApiKey          from './PublisherApiKey'
import PublisherImport          from './PublisherImport'
import PublisherOptionsCheck    from './PublisherOptionsCheck'
import PublisherMenuList        from './PublisherMenuList'

let PublisherWrapper = React.createClass({
  render: function () {
    return (
      <div id="publisherWrapper">
        <SplashScreen />
          <PublisherPageTitle pageTitleContent="IATI settings" />
          <div className="row">
            <div className="columns small-12 medium-8">
              <PublisherApiKey />
              <PublisherOptionsCheck />
              <PublisherImport />
            </div>
            <PublisherMenuList />
          </div>
      </div>
    )
  }
})

export default PublisherWrapper
