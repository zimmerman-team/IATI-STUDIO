'use strict'

import React, { PropTypes }     from 'react'
import { PublisherButton }      from '../general/List.react.jsx'
import { PageTitle } from './PublisherElements'
import moment from 'moment'


let DatasetsPublisher = React.createClass({
  propTypes: {
    datasets: PropTypes.array.isRequired,
    deleteDataset: PropTypes.func.isRequired,
    generateXmlFile: PropTypes.func.isRequired
  },

  updateDataset: function(i) {
    this.props.updateDataset(this.props.datasets[i])
  },

  deleteDataset: function(i) {
    this.props.deleteDataset(this.props.datasets[i])
  },

  generateXmlFile: function(i) {
    this.props.generateXmlFile(this.props.datasets[i])
  },

  render: function () {

    const datasets = this.props.datasets.map((dataset, index) => {

      const ftIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'filetype'; });
      const ftValue = dataset.extras[ftIndex].value;

      const acIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'activity_count'; });
      const acValue = dataset.extras[acIndex].value;

      const duIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'data_updated'; });
      const duValue = moment(dataset.extras[duIndex].value).format("ddd MMM D YYYY HH:mm");


      // let urlValue = ;
      // // if(dataset.resources[0].url.indexOf("iatistudio.com") > -1){
      // //   urlValue = <a><i className="material-icons">done</i></a>
      // // }
      // // else {
      // //   urlValue = <PublisherButton value="Import" />
      // // }

      // let urlValue = <a href={dataset.resources[0].url} target="_blank">Click to open</a>

      let urlValue = <a href={"/static/iati-xml/"+dataset.name+".xml"} target="_blank">Click to open</a>

      return <tr key={index}>
        <td>{dataset.name}</td>
        <td>{dataset.title}</td>
        <td>{ftValue}</td>
        <td>{acValue}</td>
        <td>{duValue}</td>
        <td>{urlValue}</td>
        <td><a onClick={this.generateXmlFile.bind(null, index)}><i className="material-icons">create</i></a></td>
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
                  <th>File type</th>
                  <th>Activity count</th>
                  <th>Date updated</th>
                  <th>Managed from IATI Studio</th>
                  <th>Create XML</th>
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
