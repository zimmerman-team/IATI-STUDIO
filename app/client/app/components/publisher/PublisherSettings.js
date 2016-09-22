"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchPublisher }       from '../../actions/async'
import SplashScreen             from '../../components/collections/PublisherSplash'
import PublisherApiKey          from './PublisherApiKey'
import PublisherImport          from './PublisherImport'
import PublisherOptionsCheck    from './PublisherOptionsCheck'
import { Link }                 from 'react-router'
import { PublisherButton }      from '../general/List.react.jsx'
import { PageTitle, PublisherMenuList } from './PublisherElements'

let PublisherSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() {
    this.props.toggleMainMenu(false)
    this.props.fetchPublisher()
  },

  render: function() {

    let datasetsIndicator;
    if(this.props.publisher.validationStatus){
      datasetsIndicator =
      (
        <p>
        We found {this.props.publisher.datasets.length} datasets on the IATI Registry coupled to your account. Please go to the
        <Link to="/publisher/datasets/"> datasets page </Link>
        to import your existing activities.
        </p>
      )
    } else {
      datasetsIndicator =
      <p>Please validate before we can show datasets</p>
    }

    return (
      <div>
        <div publisher={this.props.publisher} id="publisherWrapper">
          <SplashScreen />
          <div className="rowPub">
            <PageTitle pageTitleContent="IATI setting" />

            <div className="row">

              <div className="columns small-12 medium-8">
                <PublisherApiKey publisher={this.props.publisher} />

                <div className="row">
                  <div className="columns small-12 medium-6">
                    <PublisherOptionsCheck publisher={this.props.publisher} />
                  </div>

                  <div className='columns small-12 medium-6'>
                    <div>
                      <div>
                        <h6>Datasets on IATI Registry</h6>
                        <a href='#'><i className="material-icons iH6">info</i></a>
                      </div>
                      {datasetsIndicator}
                    </div>
                  </div>

                </div>

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
