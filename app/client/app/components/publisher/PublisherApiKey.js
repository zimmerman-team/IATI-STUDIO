'use strict'
import React, { PropTypes }                   from 'react'
import classNames                             from 'classnames'
import { connect }                            from 'react-redux'
import {ValidationButton, PublisherInput }    from './PublisherElements'
import { SubmitButton }                       from '../general/List.react.jsx'
import { getApiKeyValidation, getApiKeyUnlink, deletePublisher } from '../../actions/async'
// this is an on fly comment { /* <div><h6>Comment</h6></div> */ }
import {Tooltip} from '../general/Tooltip.react.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

let PublisherApiKey = React.createClass({

  getInitialState: function () {
    return {
      userId: '',
      apiKey: '',
      userIdError: false,
      userIdErrorPopup: false,
      apiKeyError: false,
      apiKeyErrorPopup: false,
    }
  },

  componentWillReceiveProps(nextProps){
    if (nextProps.formStatus && nextProps.formStatus.message && typeof nextProps.formStatus.message.error !== 'undefined') {
      this.setState({
        userIdError: nextProps.formStatus.message.error.type === 'user_id',
        userIdErrorPopup: nextProps.formStatus.message.error.type === 'user_id',
        apiKeyError: nextProps.formStatus.message.error.type === 'api_key',
        apiKeyErrorPopup: nextProps.formStatus.message.error.type === 'api_key',
      })
    }
    else {
      this.setState({
        userIdError: false,
        userIdErrorPopup: false,
        apiKeyError: false,
        apiKeyErrorPopup: false,
      })
    }
    if (nextProps.publisher.validationStatus){
      this.setState({
        userId: nextProps.publisher.userId,
        apiKey: nextProps.publisher.apiKey,
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

  handleChangeUserId: function(e){
    this.setState({userId: e.target.value})
  },

  handleChangeApiKey: function(e){
    this.setState({apiKey: e.target.value})
  },

  closeErrorPopup: function(type){
    if (type === 'userId') {
      this.setState({
        userIdErrorPopup: false,
      })
    }
    if (type === 'apiKey') {
      this.setState({
        apiKeyErrorPopup: false,
      })
    }
  },

  render: function () {
    let validationClass = classNames('validation-status margin-bottom-2',{
      valid: this.props.publisher.validationStatus,
      invalid: !this.props.publisher.validationStatus
    })

    let buttonTxt
    if (this.props.publisher.validationStatus && this.props.formStatus.fetchingResponse) {
      buttonTxt = 'Unlinking...'
    }
    else if (!this.props.publisher.validationStatus && this.props.formStatus.fetchingResponse) {
      buttonTxt = 'Validating...'
    }
    else if (this.props.publisher.validationStatus && !this.props.formStatus.fetchingResponse) {
      buttonTxt = 'Unlink from registry'
    }
    else {
      buttonTxt = 'Validate'
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="columns medium-4">
              <h6 className="with-tip">IATI Registry user ID</h6>
              <Tooltip className="inline" tooltip="Use: zimmzimm"><i className="material-icons">info</i></Tooltip>
              <input placeholder="User ID" type="text" value={this.state.userId} onChange={this.handleChangeUserId} className={this.state.userIdError && 'has-errors'}/>
              <ReactCSSTransitionGroup transitionName="fade-slow" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {this.state.userIdErrorPopup && <span className="form-error is-visible" onClick={this.closeErrorPopup.bind(null, 'userId')}>This field is invalid <i className="material-icons">close</i></span>}
              </ReactCSSTransitionGroup>
            </div>
            <div className="columns medium-8">
              <h6 className="with-tip">IATI Registry API key</h6>
              <Tooltip className="inline" tooltip="Use: 42664fcd-2494-4bab-92fe-5af6113d55a6"><i className="material-icons">info</i></Tooltip>
              <input placeholder="API Key" type="text" value={this.state.apiKey} onChange={this.handleChangeApiKey} className={this.state.apiKeyError && 'has-errors'}/>
              <ReactCSSTransitionGroup transitionName="fade-slow" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {this.state.apiKeyErrorPopup && <span className="form-error is-visible" onClick={this.closeErrorPopup.bind(null, 'apiKey')}>This field is invalid <i className="material-icons">close</i></span>}
              </ReactCSSTransitionGroup>
            </div>
          </div>
          <input value={buttonTxt} type="submit" className="button" disabled={this.props.formStatus.fetchingResponse}/>
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

const mapStateToProps = function(state, props) {
    return {
      formStatus: state.apiKeyValidationForm
    }
}

export default connect(mapStateToProps,
  { getApiKeyValidation, getApiKeyUnlink, deletePublisher }
)(PublisherApiKey)
