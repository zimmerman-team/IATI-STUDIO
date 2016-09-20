"use strict"

import React, { PropTypes }         from 'react'
import { connect }                  from 'react-redux'
import _                            from 'lodash'
import classNames                   from 'classnames'
import { browserHistory }           from 'react-router'
import { toggleMainMenu }           from '../../actions/sync'
import PublisherMenuList            from './PublisherMenuList'
import { formApiAdapter }           from '../../middleware/formApiAdapter'

import ActivitiesDefaults           from './ActivitiesDefaults'
import ActivitiesIdentifier         from './ActivitiesIdentifier'
import ActivitiesParticipatOrg      from './ActivitiesParticipatOrg'
import ActivitiesBasicInfo          from './ActivitiesBasicInfo'
import ActivitiesList               from './ActivitiesList'

import { fetchPublisher, submitActivityDefaultsForm }     from '../../actions/async'
import { PageTitle, PageTitleButtonsGroup1 }              from './PublisherElements'

function loadData(props) {
    props.fetchPublisher()
}

let PublisherSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() {

    this.props.toggleMainMenu(false)
    loadData(this.props)
  },

  render: function() {
    return (
      <div id="publisherWrapper">
        <div className="rowPub">

          <PageTitleButtonsGroup1 pageTitleContent="IATI activity" />

          <div className="row">

            <div className="columns small-12 medium-8">

              <div className="columns small-12">
                <PageTitle pageTitleContent="Activities defaults" />
                <ActivitiesDefaults onSubmit={this.props.onSubmit} />
              </div>

              <div className="columns small-12">
                <PageTitle pageTitleContent="Activities identifier" />
                <ActivitiesIdentifier onSubmit={this.props.onSubmit} />
              </div>

              <div className="columns small-12">
                <PageTitle pageTitleContent="Basic information" />
                <ActivitiesBasicInfo onSubmit={this.props.onSubmit} />
              </div>

              <div className="columns small-12">
                <PageTitle pageTitleContent="Participating organisation" />
                <ActivitiesParticipatOrg onSubmit={this.props.onSubmit} />
              </div>

              <div className="columns small-12">
                <PageTitle pageTitleContent="Activities list" />
                <ActivitiesList onSubmit={this.props.onSubmit} />
              </div>

            </div>

            <div className="columns small-12 medium-4">
              <PublisherMenuList />
            </div>

          </div>

        </div>
      </div>
    )
  }
})

function mapStateToProps(state, props) {

    const { publisher, form } = state
    return {
        form: form,
        publisher: publisher,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: formApiAdapter(dispatch, submitActivityDefaultsForm),
    toggleMainMenu,
    fetchPublisher
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherSettings)
