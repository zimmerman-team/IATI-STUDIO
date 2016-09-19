'use strict'

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import SplashScreen             from './SplashScreen'
import PublisherApiKey          from './PublisherApiKey'
import PublisherImport          from './PublisherImport'
import PublisherOptionsCheck    from './PublisherOptionsCheck'
import PublisherDatasets        from './PublisherDatasets'
import PublisherMenuList        from './PublisherMenuList'
import { PageTitle }            from '../orgSettings/OrgComponentsList'

let PublisherWrapper = React.createClass({
  render: function () {
    return (
      <div id="publisherWrapper">
        <SplashScreen />
        <div className="rowPub">
          <PageTitle pageTitleContent="IATI setting" />
          <div className="row">
            <div className="columns small-12 medium-8">
              <PublisherApiKey publisher={this.props.publisher} />
              <PublisherOptionsCheck publisher={this.props.publisher} />
              <PublisherImport />
              <PublisherDatasets datasets={this.props.publisher.datasets} />
            </div>
            <div className="columns small-12 medium-4">
              <PublisherMenuList />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherWrapper
