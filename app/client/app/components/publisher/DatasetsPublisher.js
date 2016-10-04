'use strict'

import React, { PropTypes }     from 'react'
import { PublisherButton }      from '../general/List.react.jsx'
import { PageTitle } from './PublisherElements'
import moment from 'moment'


let DatasetsPublisher = React.createClass({
  propTypes: {
    datasets: PropTypes.array.isRequired,
    deleteDataset: PropTypes.func.isRequired
  },

  updateDataset: function(i) {
    this.props.updateDataset(this.props.datasets[i])
  },

  deleteDataset: function(i) {
    this.props.deleteDataset(this.props.datasets[i])
  },

  render: function () {

    const datasets = this.props.datasets.map((dataset, index) => {

      const ftIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'filetype'; });
      const ftValue = dataset.extras[ftIndex].value;

      const acIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'activity_count'; });
      const acValue = dataset.extras[acIndex].value;

      const duIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'data_updated'; });
      const duValue = moment(dataset.extras[duIndex].value).format("ddd MMM D YYYY HH:mm");


      let urlValue;
      if(dataset.resources[0].url.includes("iatistudio.com")){
        urlValue = <i className="material-icons">done</i>
      }
      else {
        urlValue = <PublisherButton value="Import" />
      }

      return <tr key={index}>
        <td>{dataset.name}</td>
        <td>{dataset.title}</td>
        <td>{ftValue}</td>
        <td>{acValue}</td>
        <td>{duValue}</td>
        <td>{urlValue}</td>
        <td><a onClick={this.updateDataset.bind(null, index)}><i className="material-icons">update</i></a></td>
        <td><a onClick={this.deleteDataset.bind(null, index)}><i className="material-icons">delete</i></a></td>
      </tr>
    })

    return (
      <div className="row">
        <PageTitle pageTitleContent="Datasets" />

        <div className="row">
          <div className="columns small-12">

            <table>
              <thead>
                <tr>
                  <th>Dataset name</th>
                  <th>Dataset title</th>
                  <th>Filetype</th>
                  <th>Activity count</th>
                  <th>Updated (yyyy-mm-dd hh:mm:ss)</th>
                  <th>Managed from IATI Studio</th>
                  <th>Update</th>
                  <th>Delete</th>
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

export default DatasetsPublisher
