"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchPublisher, updatePublisher }       from '../../actions/async'
import SplashScreen             from './PublisherSplash'
import PublisherApiKey          from './PublisherApiKey'
import PublisherImport          from './PublisherImport'
import { Link }                 from 'react-router'
import { PublisherButton }      from '../general/List.react.jsx'
import { PublisherCheckbox }    from './PublisherElements'

import {Tooltip} from '../general/Tooltip.react.jsx'

let PublisherSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() {
    this.props.toggleMainMenu(false)
    this.props.fetchPublisher()
  },

  render: function() {

    let datasetsIndicator = this.props.publisher.validationStatus ? 
      <p>We found {this.props.publisher.datasets.length} datasets on the IATI Registry linked to your account. Please go to the <Link to="/publisher/datasets/">datasets page</Link> to view your existing activities.</p>
      :
      <p>Please validate your IATI Registry settings first.</p>

    return (
      <div>
        <div publisher={this.props.publisher} id="publisherWrapper">
          {/*<SplashScreen />*/}

            <div className="row controls">
              <div className="columns small-centered small-12 large-10 xlarge-8">
                <h2 className="page-title">Setup your IATI publishing settings</h2>
                <hr />
              </div>
            </div>

            <div className="row">

              <div className="columns small-centered small-12 large-10 xlarge-8">
                <PublisherApiKey publisher={this.props.publisher} />
                <PublisherOptionsCheck publisher={this.props.publisher} />
                <h6 className="with-tip">Datasets on the IATI Registry</h6>
                <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
                {datasetsIndicator}

              </div>

            </div>

          </div>
        </div>
    )
  }
})

const PublisherOptionsCheck = React.createClass({

  updatePublisherOnclick: function (){
    this.props.updatePublisher({
      ...this.props.publisher,
      autoPublish: !this.props.publisher.autoPublish
    })
  },

  render: function () {

    let autoPublishValue = this.props.publisher.autoPublish ? true : false
    let autoPublishName = "Automatically publish activities to the IATI registry"

    return (
          
      <div className="margin-bottom-2">
        <h6 className="with-tip">Publishing options</h6>
        <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
        <div>
          <input type="checkbox" checked={autoPublishValue} />
          <label onClick={this.updatePublisherOnclick}>{autoPublishName}</label>
        </div>
      </div>
    )
  }
})

connect(null,
  { updatePublisher }
)(PublisherOptionsCheck)

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
