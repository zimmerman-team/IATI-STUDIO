'use strict'
import React, { PropTypes }                   from 'react'
import classNames                             from 'classnames'
import { connect }                            from 'react-redux'
import {ValidationButton, PublisherInput }    from './PublisherElements'
import { SubmitButton }                       from '../general/List.react.jsx'
import { getApiKeyValidation, getApiKeyUnlink, deletePublisher } from '../../actions/async'
// this is an on fly comment { /* <div><h6>Comment</h6></div> */ }
import {Tooltip} from '../general/Tooltip.react.jsx'

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
    this.props.getApiKeyUnlink(this.props.publisher)
  },

  render: function () {

    let validationClass = classNames('validation-status margin-bottom-2',{
      valid: this.props.publisher.validationStatus,
      invalid: !this.props.publisher.validationStatus
    })
    let validationValue = this.props.publisher.validationStatus ? "VALIDATED" : "NOT VALIDATED"

    let validationButton;
    if(this.props.publisher.validationStatus){
      validationButton = <SubmitButton value="Unlink" onClick={this.unvalidate} />
    } else {
      validationButton = <SubmitButton value="Validate" onClick={this.validate} />
    }

    return (
      <div>
        <div className="row">
          <div className="columns medium-4">
            <h6 className="with-tip">IATI Registry user ID</h6>
            <Tooltip className="inline" tooltip="Use: zimmzimm"><i className="material-icons">info</i></Tooltip>
            <input ref="userId" placeholder="User ID" type="text" />
          </div>
          <div className="columns medium-8">
            <h6 className="with-tip">IATI Registry API key</h6>
            <Tooltip className="inline" tooltip="Use: 42664fcd-2494-4bab-92fe-5af6113d55a6"><i className="material-icons">info</i></Tooltip>
            <input ref="apiKey" placeholder="API Key" type="text" />
          </div>
        </div>
        {validationButton}

        <h6 className="with-tip">Current validation status</h6>
        <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
        <div className={validationClass}>
          {validationValue}
        </div>

      </div>
    )
  }
})

export default connect(null,
  { getApiKeyValidation, getApiKeyUnlink, deletePublisher }
)(PublisherApiKey)
