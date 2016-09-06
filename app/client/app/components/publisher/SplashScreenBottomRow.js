'use strict'

import React, { PropTypes }       from 'react'
import { connect }                from 'react-redux'
import SplashScreenBottomTitle    from './SplashScreenBottomTitle'
import IatiRegistryApiKey         from './IatiRegistryApiKey'
import CurrentStatus              from './CurrentStatus'
import PublishingOptions              from './PublishingOptions'
import OrganisationImport              from './OrganisationImport'
import LastImport              from './LastImport'

let SplashScreenBottomRow = React.createClass({

  render: function () {
    return (
      <div>
        <SplashScreenBottomTitle />
          <div className="row">
            <div className="columns small-12 medium-12">
              <div className="row">
                <div className="columns small-12 medium-8">

                  <div className="row">
                    <div className="columns small-12 medium-6">
                      <IatiRegistryApiKey />
                    </div>
                    <div className="columns small-12 medium-6">
                      <CurrentStatus />
                    </div>
                  </div>

                  <div className="row">
                    <div className="columns small-12 medium-6">
                      <PublishingOptions />
                    </div>
                  </div>

                  <div className="row">
                    <div className="columns small-12 medium-6">
                      <OrganisationImport />
                    </div>
                    <div className="columns small-12 medium-6">
                      <LastImport />
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
})

export default SplashScreenBottomRow
