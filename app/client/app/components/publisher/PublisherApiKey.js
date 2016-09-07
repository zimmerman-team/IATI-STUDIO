'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'

let PublisherApiKey = React.createClass({

  getInitialState: function () {
    return {
      validationKey: 'inputNotValidated'
    }
  },

  getValidate: function () {
    let verifyKey = this.state.validationKey == 'inputValidated' ? 'inputNotValidated' : 'inputValidated'
    this.setState({ validationKey: verifyKey })
  },

  render: function () {

    let inputValidationClass = classNames(this.state.validationKey)
    let inputValidationValue = this.state.validationKey == "inputValidated" ? "VALIDATED" : "NOT VALIDATED"
    // console.log(inputValidationValue)

    return (
      <div className="row">
        <div className="columns small-12 medium-6">
          <div>
            <h6>IATI Registry API key</h6>
            <a href='#'><i className="material-icons iH6">info</i></a>
          </div>
          <div className="input-group">
            <input className="input-group-field" type="text" label="Enter your API key"/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Validate" onClick={this.getValidate} />
            </div>
          </div>
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
    )
  }
})

export default PublisherApiKey
