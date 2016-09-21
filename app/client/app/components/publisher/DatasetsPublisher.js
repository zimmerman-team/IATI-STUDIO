'use strict'

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import { PublisherButton }      from '../general/List.react.jsx'

import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchPublisher }       from '../../actions/async'
import SplashScreen             from '../../components/collections/PublisherSplash'
import PublisherApiKey          from './PublisherApiKey'
import PublisherImport          from './PublisherImport'
import PublisherOptionsCheck    from './PublisherOptionsCheck'
import { Link }                 from 'react-router'
import { PageTitle, PublisherMenuList } from './PublisherElements'


let DatasetsPublisher = React.createClass({

  getInitialState: function() { return {} },

  render: function () {

    if (this.props.datasets.length == 0){
      return (<div></div>)
    }

    const datasets = this.props.datasets.map((dataset, i) => {

      const ftIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'filetype'; });
      const ftValue = dataset.extras[ftIndex].value;

      const acIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'activity_count'; });
      const acValue = dataset.extras[acIndex].value;

      const duIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'data_updated'; });
      const duValue = dataset.extras[duIndex].value;

      let urlValue;
        if(dataset.resources[0].url.includes("iatistudio.com") || dataset.resources[0].url.includes("aidstream.org")){
          urlValue = <i className="material-icons">done</i>
        }
        else {
          urlValue = <PublisherButton value="Import" />
        }

      console.log(dataset.resources[0].url)
      console.log(dataset.resources[0].url.length)

      return <tr key={i}>
        <td>{dataset.title}</td>
        <td>{ftValue}</td>
        <td>{acValue}</td>
        <td>{duValue}</td>
        <td>{urlValue}</td>
      </tr>
    })

    return (
      <div>
        <div className="row">
          <div className="columns small-12 medium-12">
            <table>
              <thead>
                <tr>
                  <th>Dataset title</th>
                  <th>Filetype</th>
                  <th>Activity count</th>
                  <th>Data updated</th>
                  <th>Managed from IATI Studio</th>
                </tr>
              </thead>
              <tbody>
                {datasets}
              </tbody>
            </table>
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
})(DatasetsPublisher)
