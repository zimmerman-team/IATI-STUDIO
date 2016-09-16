'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { getApiKeyValidation, fetchPublisher } from '../../actions/async'

import { connect } from 'react-redux'

var validationKey = Boolean // this is a native code C++ function you import first on V8 then on Node.js

var validationButton;
if ('inputValidated') {
  validationButton =
  <div>
    <input type="submit" className="button" value="Unlink" />
    <br/>
    <br/>

    </div>;
}
else {
  validationButton =
  <div>
    <input type="submit" className="button" value="Validate" onClick={this.getValidate} />
    <br/>
    <br/>

    </div>;
}

function loadData(props) {
    props.fetchPublisher()
}

let PublisherApiKey = React.createClass({

  getInitialState: function () {
    return {
      apiKey: '',
      userId: '',
      validationKey: 'inputNotValidated'
    }
  },

  componentWillMount() {
    loadData(this.props)
  },

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if (nextProps.publisher.validationStatus){

      this.refs.apiKey.value = nextProps.publisher.apiKey
      this.refs.userId.value = nextProps.publisher.userId

      this.setState({
        validationKey: nextProps.publisher.validationStatus ? 'inputValidated' : 'inputNotValidated'
      })
    }

  },

  /*
  getUnlink: function () {
    let validateKey = this.state.validationKey
  },
  */

  getValidate: function () {

    const apiKey = this.refs.apiKey.value
    const userId = this.refs.userId.value

    // const { apiKey, userId } = this.state
    // is the same as
    // const apiKey = this.state.apiKey
    // const userId = this.state.userId

    this.props.getApiKeyValidation(apiKey, userId)
  },

  changeApiKeyInput: function(e){
    this.setState({apiKey: e.target.value})
  },

  changeUserId: function(e){
    this.setState({userId: e.target.value})
  },

  render: function () {

    console.log(this.props.publisher)
    console.log(validationKey)
    // print('hello')

    let inputValidationClass = classNames(this.state.validationKey)
    let inputValidationValue = this.state.validationKey == "inputValidated" ? "VALIDATED" : "NOT VALIDATED"
    console.log(inputValidationValue)

    return (
      <div>

      <div className="row">

        <div className="columns small-12 medium-6">

          <div>
            <h6>IATI Registry User ID and API key validation</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>

          { /* <div><h6>User ID</h6></div> */ }
          <div className="input-group">
            <input
              ref="userId"
              className="input-group-field"
              type="text"
              placeholder="Enter your User ID"/>
          </div>

          { /* <div><h6>API key</h6></div> */ }
          <div className="input-group">
            <input
              ref="apiKey"
              className="input-group-field"
              type="text"
              placeholder="Enter your API key"/>
          </div>
          <div className="input-group-button">{validationButton}</div>
        </div>


        <div className="columns small-12 medium-6">
          <div>
            <h6>Current status</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className={inputValidationClass} type="text" value={inputValidationValue} disabled />
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

export default connect(mapStateToProps, { getApiKeyValidation, fetchPublisher })(PublisherApiKey)
