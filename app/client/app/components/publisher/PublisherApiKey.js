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
    return {
      userId: '',
      apiKey: '',
    }
  },

  componentWillReceiveProps(nextProps){
    if (nextProps.publisher.validationStatus){
      this.setState({
        userId: nextProps.publisher.userId,
        userIdError: false,
        apiKey: nextProps.publisher.apiKey,
        apiKeyError: false,
      })
    }
  },

  handleSubmit: function (e) {
    e.preventDefault()
    if (this.props.publisher.validationStatus) {
      this.props.getApiKeyUnlink(this.props.publisher)
    } 
    else {
      this.props.getApiKeyValidation(this.state.apiKey, this.state.userId)
    }
  },

  unvalidate: function (){
    this.props.getApiKeyUnlink(this.props.publisher)
  },

  handleChangeUserId: function(e){
    this.setState({userId: e.target.value})
  },

  handleChangeApiKey: function(e){
    this.setState({apiKey: e.target.value})
  },

  render: function () {

    let validationClass = classNames('validation-status margin-bottom-2',{
      valid: this.props.publisher.validationStatus,
      invalid: !this.props.publisher.validationStatus
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <div className="row">
            <div className="columns medium-4">
              <h6 className="with-tip">IATI Registry user ID</h6>
              <Tooltip className="inline" tooltip="Use: zimmzimm"><i className="material-icons">info</i></Tooltip>
              <input placeholder="User ID" type="text" value={this.state.userId} onChange={this.handleChangeUserId}/>
            </div>
            <div className="columns medium-8">
              <h6 className="with-tip">IATI Registry API key</h6>
              <Tooltip className="inline" tooltip="Use: 42664fcd-2494-4bab-92fe-5af6113d55a6"><i className="material-icons">info</i></Tooltip>
              <input placeholder="API Key" type="text" value={this.state.apiKey} onChange={this.handleChangeApiKey} />
            </div>
          </div>
          <input value={this.props.publisher.validationStatus ? 'Unlink from registry' : 'Validate'} type="submit" className="button"/>
        </form>

        <h6 className="with-tip">Current validation status</h6>
        <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
        <div className={validationClass}>
          {this.props.publisher.validationStatus ? "VALIDATED" : "NOT VALIDATED"}
        </div>

      </div>
    )
  }
})

export default connect(null,
  { getApiKeyValidation, getApiKeyUnlink, deletePublisher }
)(PublisherApiKey)
