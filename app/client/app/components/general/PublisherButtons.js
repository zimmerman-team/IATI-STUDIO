'use strict'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

let PublisherButtons = React.createClass({
  render: function () {

    let buttonType = this.props.type

    return (
      <div className="row">
        <div className="columns small-12">
          <div className="button-group">

            <div >
              <a href="#" className="button" {type:delete} >Save draft</a>
              <a href="#" className="button stateIncomplete">Validation state: incomplete</a>
              <a href="#" className="button statePublish">Publish</a>
            </div>

            <div>
              <a href="#" className="button">Save draft</a>
              <a href="#" className="button">Duplicate</a>
              <a href="#" className="button alert">Validation state: incomplete</a>
              <a href="#" className="button">Publish</a>
              <a href="#" className="button alert">Delete</a>
            </div>

            <div>
              <a href="#" className="button">Duplicate selected</a>
              <a href="#" className="button">Unpublish selected</a>
              <a href="#" className="button">Publish selected</a>
              <a href="#" className="button alert">Delete selected</a>
            </div>

          </div>
        </div>
      </div>
    )
  }
})

export default PublisherButtons
