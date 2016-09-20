"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchPublisher }       from '../../actions/async'
import SplashScreen             from './SplashScreen'
import PublisherApiKey          from './PublisherApiKey'
import PublisherImport          from './PublisherImport'
import PublisherOptionsCheck    from './PublisherOptionsCheck'
import PublisherDatasets        from './PublisherDatasets'
import PublisherMenuList        from './PublisherMenuList'
import { PageTitle }            from './PublisherElements'

function loadData(props) {
    props.fetchPublisher()
}

let PublisherSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() {

    this.props.toggleMainMenu(false)
    loadData(this.props)
  },

  render: function() {
    return (
      <div>
        <div publisher={this.props.publisher} id="publisherWrapper">
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
      </div>
    )
  }
})

function mapStateToProps(state, props) {

    const { publisher } = state
    return {
        publisher: publisher,
    }
}

export default connect(mapStateToProps, {
  toggleMainMenu,
  fetchPublisher
})(PublisherSettings)
