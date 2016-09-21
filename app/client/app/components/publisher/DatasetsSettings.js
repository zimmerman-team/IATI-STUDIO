"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchPublisher }       from '../../actions/async'
import DatasetsPublisher        from './DatasetsPublisher'
import PublisherSettings        from './PublisherSettings'
import { PublisherButton }      from '../general/List.react.jsx'
import { Link }                 from 'react-router'
import { PageTitle, PageTitleButtonsGroup1, OrgIdentifier, OrgName, PublisherMenuList } from './PublisherElements'

let DatasetsSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() { this.props.toggleMainMenu(false) },

  render: function() {

    let datasetsIndicator;
    if(!this.props.publisher.validationStatus){
      datasetsIndicator = <PublisherButton value="Import" />
    }

    return (
      <div>
        <div id="orgWrapper">
          <div className="rowPub">
            <PageTitle pageTitleContent="Datasets" />

            <div className="row">
              <div className="columns small-12">
                <DatasetsPublisher datasets={this.props.publisher.datasets} />
                {datasetsIndicator}
              </div>
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

export default connect(mapStateToProps, {
  toggleMainMenu,
  fetchPublisher
})(DatasetsSettings)
