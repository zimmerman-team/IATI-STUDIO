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
import moment                   from 'moment'
import { fetchPublisher, publishDataset, deleteDataset, updateDataset, generateXmlFile } from '../../actions/async'
import { PageTitle, PageTitleButtonsGroup1, OrgIdentifier, OrgName } from './PublisherElements'


let DatasetsSettings = React.createClass({ // A stateful container all children are stateless

  publishDataset: function (name, title, filetype){
    this.props.publishDataset(this.props.publisher, name, title, filetype)
  },

  deleteDataset: function (dataset){
    this.props.deleteDataset(this.props.publisher, dataset)
  },

  updateDataset: function (dataset){
    this.props.updateDataset(this.props.publisher, dataset)
  },

  generateXmlFile: function (dataset){
    this.props.generateXmlFile(this.props.publisher, dataset)
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

  },

  render: function() {
    const { showCreateActDatasetButton, showCreateOrgDatasetButton } = this.state

    let datasetsPublisher;
    if(this.props.publisher.validationStatus){
      datasetsPublisher = <DatasetsPublisher
        updateDataset={this.updateDataset}
        deleteDataset={this.deleteDataset}
        generateXmlFile={this.generateXmlFile}
        datasets={this.props.publisher.datasets} />
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
      datasetsCreate = <DatasetsCreate createDataset={this.publishDataset} publisher={this.props.publisher} />

    } else {
      datasetsCreate = <div></div>
    }

    return (
      <div id="orgWrapper">
        <div className="rowPub">
          {datasetsPublisher}
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
  publishDataset,
  deleteDataset,
  updateDataset,
  generateXmlFile
})(DatasetsSettings)
