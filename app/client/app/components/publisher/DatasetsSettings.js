"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import DatasetsPublisher        from './DatasetsPublisher'
import DatasetsCreate           from './DatasetsCreate'
import PublisherSettings        from './PublisherSettings'
import { PublisherButton }      from '../general/List.react.jsx'
import { Link }                 from 'react-router'
import { fetchPublisher, updatePublisher, publishDataset } from '../../actions/async'
import { PageTitle, PageTitleButtonsGroup1, OrgIdentifier, OrgName, PublisherMenuList } from './PublisherElements'



function getBasicDataset(name, title, filetype, ownerOrg){
  let today = new Date();
  today = today.toISOString().substring(0, 10);
  return {
    "resources": [
      {"url": "https://www.iatistudio.com/files/"+name+".xml"}
    ],
    "name": name,
    "filetype": filetype,
    "data_updated": today,
    "activity_count": "0",
    "title": title,
    "owner_org": ownerOrg
  }
}

let DatasetsSettings = React.createClass({ // A stateful container all children are stateless

  updatePublisherOnclick: function (name, title, filetype){

    let dataset = getBasicDataset(name, title, filetype, this.props.publisher.ownerOrg)

    this.props.publishDataset(this.props.publisher, dataset)

  },

  publishDatasetOnclick: function (index){
    let dataset = this.props.publisher.datasets[index]
    this.props.publishDataset(this.props.publisher, dataset)
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

    let datasetsPublisher;
    if(this.props.publisher.validationStatus){
      datasetsPublisher = <DatasetsPublisher onPublishDataset={this.publishDatasetOnclick} datasets={this.props.publisher.datasets} />
    } else {
      datasetsPublisher =
      (
        <div className="row">
          <PageTitle pageTitleContent="Datasets" />
          <div className="row">
            <div className="columns small-12">
              <p><Link to="/publisher/settings/">Click here to go settings </Link>and get your User and API key validate</p>
            </div>
          </div>
        </div>
      )
    }

    let datasetsCreate;
    if(this.props.publisher.validationStatus){
      datasetsCreate = <DatasetsCreate createDataset={this.updatePublisherOnclick} publisher={this.props.publisher} />

    } else {
      datasetsCreate = <div></div>
    }

    return (
      <div id="orgWrapper">
        <div className="rowPub">
          {datasetsPublisher}
          {datasetsCreate}
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
