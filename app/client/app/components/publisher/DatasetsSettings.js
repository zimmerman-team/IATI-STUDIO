"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import DatasetsPublisher        from './DatasetsPublisher'
import PublisherSettings        from './PublisherSettings'
import { PublisherButton }      from '../general/List.react.jsx'
import { Link }                 from 'react-router'
import { fetchPublisher, updatePublisher, publishDataset } from '../../actions/async'
import { PageTitle, PageTitleButtonsGroup1, OrgIdentifier, OrgName, PublisherMenuList } from './PublisherElements'


function getDummyDataset(name, title, fileType){
  let today = new Date();
  today = today.toISOString().substring(0, 10);
  return {"resources": [
      {"url": "https://aidstream.org/files/xml/act4africa-activities.xml"}
    ],
    "name": name,
    "extras": [
      {"key": "activity_count", "value": "0"},
      {"key": "data_updated", "value": today},
      {"key": "filetype", "value": fileType},
    ],
    "title": title
  }
}

let DatasetsSettings = React.createClass({ // A stateful container all children are stateless

  updatePublisherOnclick: function (fileType){

    let dummy = ""
    if(fileType == "activity"){
      dummy = getDummyDataset(this.props.publisher.userId + "-activities", this.props.publisher.userId + " - activities file", "activity")
    } else {
      dummy = getDummyDataset(this.props.publisher.userId + "-organisation", this.props.publisher.userId + " - organisation file", "organisation")
    }

    this.props.updatePublisher({
      ...this.props.publisher,
      datasets: [
        ...this.props.publisher.datasets,
        dummy
      ]
    })
  },

  publishDatasetOnclick: function (fileType){
    let dummy = ""
    if(fileType == "activity"){
      dummy = getDummyDataset(this.props.publisher.userId + "-activities", this.props.publisher.userId + " - activities file", "activity")
    } else {
      dummy = getDummyDataset(this.props.publisher.userId + "-organisation", this.props.publisher.userId + " - organisation file", "organisation")
    }

    this.props.publishDataset({
      ...this.props.publisher,
      datasets: [
        ...this.props.publisher.datasets,
        dummy
      ]
    })
  },

  getInitialState: function(){
    return {
      showCreateActDatasetButton: false,
      showCreateOrgDatasetButton: false,
    }
  },

  componentWillMount: function() {
    this.props.toggleMainMenu(false)
    this.props.fetchPublisher()
  },

  componentWillReceiveProps: function(nextProps){
    let act = true
    let org = true

    nextProps.publisher.datasets.forEach((dataset) => {
      const filetypeIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'filetype'; });
      const filetypeValue = dataset.extras[filetypeIndex].value;

      if ( dataset.extras[filetypeIndex].value == 'activity' ){
        act = false
      }
      else if ( dataset.extras[filetypeIndex].value == 'organisation' ) {
        org = false
      }
    })
    if(this.state.showCreateActDatasetButton != act || this.state.showCreateOrgDatasetButton != org){
      this.setState({
        showCreateActDatasetButton: act,
        showCreateOrgDatasetButton: org,
      })
    }

    // this.props.updatePublisher({
    //   ...this.props.publisher,
    //   datasets: []
    // })

  },

  render: function() {
    const { showCreateActDatasetButton, showCreateOrgDatasetButton } = this.state

    let createActButton = showCreateActDatasetButton ? <PublisherButton value="Create Activities Dataset" onClick={this.updatePublisherOnclick.bind(null, "activity")} /> : ''
    let createOrgButton = showCreateOrgDatasetButton ? <PublisherButton value="Create Organisation Dataset" onClick={this.updatePublisherOnclick.bind(null, "organisation")} /> : ''

    let datasetsIndicator;
    if(this.props.publisher.validationStatus){
      datasetsIndicator = <DatasetsPublisher datasets={this.props.publisher.datasets} />
    } else {
      datasetsIndicator =
      (
        <p><Link to="/publisher/settings/">Click here to go settings </Link>and get your User and API key validate</p>
      )
    }

    return (
      <div>
        <div id="orgWrapper">
          <div className="rowPub">
            <PageTitle pageTitleContent="Datasets" />

            <div className="row">
              <div className="columns small-12">
                {datasetsIndicator}
                {createActButton}
                {createOrgButton}
                <a onClick={this.publishDatasetOnclick}>publishDatasetOnclick</a>
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
  fetchPublisher,
  updatePublisher,
  publishDataset
})(DatasetsSettings)
