'use strict'

import React, { PropTypes } from 'react'

let PublisherPageTitle = React.createClass({

  render: function () {
    return (
      <div className='row'>
        <div className='columns small-12'>
          <h2 className="title-page">{this.props.pageTitleContent}</h2>
          <hr />
        </div>
      </div>
    )
  }
})

export default PublisherPageTitle
