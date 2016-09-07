'use strict'

import React, { PropTypes } from 'react'

let PublisherPageTitle = React.createClass({

  render: function () {
    return (
      <div className='row padRow'>
        <div className='columns small-12 padColumns'>
          <div>
            <h2 className="title-page">{this.props.pageTitleContent}</h2>
            <hr />
          </div>
        </div>
      </div>
    )
  }
})

export default PublisherPageTitle
