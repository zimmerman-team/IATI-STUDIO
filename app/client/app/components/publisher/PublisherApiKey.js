'use strict'
import React, { PropTypes }                   from 'react'
import classNames                             from 'classnames'
import { connect }                            from 'react-redux'
import {ValidationButton, PublisherInput }    from './PublisherElements'
import { SubmitButton }                       from '../general/List.react.jsx'
import { getApiKeyValidation, getApiKeyUnlink, deletePublisher } from '../../actions/async'
// this is an on fly comment { /* <div><h6>Comment</h6></div> */ }

let PublisherApiKey = React.createClass({

  getInitialState: function () {
    return {}
  },

  componentWillReceiveProps(nextProps){
    if (nextProps.publisher.validationStatus){
      this.refs.apiKey.value = nextProps.publisher.apiKey
      this.refs.userId.value = nextProps.publisher.userId
    }
  },

  validate: function () {
    const apiKey = this.refs.apiKey.value
    const userId = this.refs.userId.value
    this.props.getApiKeyValidation(apiKey, userId)
  },

  unvalidate: function (){
    this.props.getApiKeyUnlink(this.props.publisher._id)
  },

  render: function () {

    let inputValidationClass = classNames({
      inputValidated: this.props.publisher.validationStatus,
      inputNotValidated: !this.props.publisher.validationStatus
    })
    let inputValidationValue = this.props.publisher.validationStatus ? "VALIDATED" : "NOT VALIDATED"

    let validationButton;
    if(this.props.publisher.validationStatus){
      validationButton = <SubmitButton value="Unlink" onClick={this.unvalidate} />
    } else {
      validationButton = <SubmitButton value="Validate" onClick={this.validate} />
    }

    return (
      <div>
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>IATI Registry User ID and API key validation</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>

          <div className="input-group">
            <input ref="userId" className="input-group-field" placeholder="User ID" type="text" />
          </div>

          <div className="input-group">
            <input ref="apiKey" className="input-group-field" placeholder="API Key" type="text" />
          </div>

          <div className="input-group-button">
            {validationButton}
          </div>

        </div>

        <div className="columns small-12 medium-6">
          <div>
            <h6>Current status</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <PublisherInput className={inputValidationClass} value={inputValidationValue} disabled />
          </div>
        </div>
      </div>
      </div>
    )
  }
})

export default connect(null,
  { getApiKeyValidation, getApiKeyUnlink, deletePublisher }
)(PublisherApiKey)
