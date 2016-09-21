'use strict'

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import { updatePublisher }      from '../../actions/async'
import { PublisherCheckbox }    from './PublisherElements'

let PublisherOptionsCheck = React.createClass({

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
      <div className="row">
        <div className="columns small-12">
          
          <div>
            <h6>Publishing options</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>

          <div className="input-group">
            <input type="checkbox" checked={autoPublishValue} />
            <label onClick={this.updatePublisherOnclick}>{autoPublishName}</label>
          </div>

        </div>
      </div>
    )
  }
})

export default connect(null,
  { updatePublisher }
)(PublisherOptionsCheck)
