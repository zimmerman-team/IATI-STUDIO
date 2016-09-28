'use strict'

import React, { PropTypes }     from 'react'
import { PublisherButton }      from '../general/List.react.jsx'

let DatasetsPublisher = React.createClass({

  onPublishDataset: function(i) {
    this.props.onPublishDataset(i)
  },

  render: function () {
    console.log(this.props.datasets)
    const datasets = this.props.datasets.map((dataset, index) => {
      console.log(index)

      const ftIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'filetype'; });
      const ftValue = dataset.extras[ftIndex].value;

      const acIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'activity_count'; });
      const acValue = dataset.extras[acIndex].value;

      const duIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'data_updated'; });
      const duValue = dataset.extras[duIndex].value;

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
        <td><a onClick={this.onPublishDataset.bind(null, index)}>Publish {ftValue.slice(0, 3)}</a></td>
      </tr>
    })

    return (
      <div>
        <div className="row">
          <div className="columns small-12 medium-12">
            <table>
              <thead>
                <tr>
                  <th>Dataset name</th>
                  <th>Dataset title</th>
                  <th>Filetype</th>
                  <th>Activity count</th>
                  <th>Data updated</th>
                  <th>Managed from IATI Studio</th>
                  <th>Publish to IATI</th>
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
