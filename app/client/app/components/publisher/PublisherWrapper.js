'use strict'

import React, { PropTypes }             from 'react'
import { connect }                      from 'react-redux'
import SplashScreen                     from './SplashScreen'
import PublisherTitle                   from './PublisherTitle'
import PublisherFormIatiRegistryApiKey  from './PublisherFormIatiRegistryApiKey'
import PublisherFormCurrentStatus       from './PublisherFormCurrentStatus'
import PublisherFormPublishingOptions   from './PublisherFormPublishingOptions'
import PublisherFormOrganisationImport  from './PublisherFormOrganisationImport'
import PublisherFormLastImport          from './PublisherFormLastImport'
import PublisherFormMenuTendina         from './PublisherFormMenuTendina'

let PublisherWrapper = React.createClass({

  render: function () {
    return (
      <div id='publisherWrapper'>
        <SplashScreen />
        <PublisherTitle />
        <div className="row padRow">
          <div className="columns small-12 medium-12">
            <div className="row">
              <div className="columns small-12 medium-8">
                <div className="row">
                  <div className="columns small-12 medium-6 padColumns">
                    <PublisherFormIatiRegistryApiKey />
                  </div>
                  <div className="columns small-12 medium-6 padColumns">
                    <PublisherFormCurrentStatus />
                  </div>
                </div>
                <div className="row">
                  <div className="columns small-12 medium-6 padColumns">
                    <PublisherFormPublishingOptions />
                  </div>
                </div>
                <div className="row">
                  <div className="columns small-12 medium-6 padColumns">
                    <PublisherFormOrganisationImport />
                  </div>
                  <div className="columns small-12 medium-6 padColumns">
                    <PublisherFormLastImport />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="columns small-12 medium-4 padColumns">
                  <PublisherFormMenuTendina />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherWrapper
