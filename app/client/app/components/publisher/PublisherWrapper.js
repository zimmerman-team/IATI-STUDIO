'use strict'

import React, { PropTypes }               from 'react'
import { connect }                        from 'react-redux'
import SplashScreen                       from './SplashScreen'
import PublisherSettingsTitle             from './PublisherSettingsTitle'
import PublisherFormCurrentStatus         from './PublisherFormCurrentStatus'
import PublisherFormIatiRegistryApiKey    from './PublisherFormIatiRegistryApiKey'
import PublisherFormLastImport            from './PublisherFormLastImport'
import PublisherFormOrganisationImport    from './PublisherFormOrganisationImport'
import PublisherFormPublishingOptions     from './PublisherFormPublishingOptions'
import PublisherMenuTendina               from './PublisherMenuTendina'

let PublisherWrapper = React.createClass({

  render: function () {
    return (
      <div id="publisherWrapper">
        <SplashScreen />
        <PublisherSettingsTitle />
          <div className="row">
            <div className="columns small-12 medium-8">
              <div className="row">
                <PublisherFormIatiRegistryApiKey />
                <PublisherFormCurrentStatus />
              </div>
              <div className="row">
                <PublisherFormPublishingOptions />
              </div>
              <div className="row">
                <PublisherFormOrganisationImport />
                <PublisherFormLastImport />
              </div>
            </div>
            <PublisherMenuTendina />
          </div>
      </div>
    )
  }
})

export default PublisherWrapper
