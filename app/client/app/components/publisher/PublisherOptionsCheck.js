'use strict'

import React, { PropTypes }         from 'react'
import { connect }                  from 'react-redux'
import { Checkbox, SubmitButton }   from '../general/List.react.jsx'
import { updatePublisher, getApiKeyUnlink }   from '../../actions/async'

let PublisherOptionsCheck = React.createClass({

  autoPublishOnclick: function (){
    console.log('hereee' + ' ' + this.props.publisher.autoPublish)
    this.props.getApiKeyUnlink(this.props.publisher._id)
  },

  render: function () {

    let autoPublishValue;if(this.props.publisher.autoPublish){autoPublishValue=true}else{autoPublishValue=false}
    let autoPublishName = "Automatically publish activities to the IATI registry"

    return (
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>Publishing options</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>

          <div className="input-group">
            <input type="checkbox" checked={autoPublishValue} />
            <label onClick={this.autoPublishOnclick}>{autoPublishName}</label>
          </div>

        </div>
      </div>
    )
  }
})

export default connect(null,
  { updatePublisher, getApiKeyUnlink }
)(PublisherOptionsCheck)
