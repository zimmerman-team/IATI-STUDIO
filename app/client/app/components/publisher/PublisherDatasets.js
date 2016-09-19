'use strict'

import React, { PropTypes }     from 'react'
import _ from 'lodash'


let PublisherDatasets = React.createClass({
  render: function () {
    console.log(this.props.datasets)

    const datasets = this.props.datasets.map((dataset, i) => {

    const ftIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'filetype'; });
    const ftValue = dataset.extras[ftIndex].value;

    const acIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'activity_count'; });
    const acValue = dataset.extras[acIndex].value;

    const duIndex = _.findIndex(dataset.extras, function(o) { return o.key == 'data_updated'; });
    const duValue = dataset.extras[duIndex].value;

      return <tr key={i}>
        <td>{dataset.title}</td>
        <td>{ftValue}</td>
        <td>{acValue}</td>
        <td>{duValue}</td>
      </tr>
    })

    return (
      <div>
        <table style={{marginTop: "40px"}}>
          <thead>
            <tr>
              <th>Dataset title</th>
              <th>Filetype</th>
              <th>Activity count</th>
              <th>Data updated</th>
            </tr>
          </thead>
          <tbody>
            {datasets}
          </tbody>
        </table>
      </div>
    )
  }
})

export default PublisherDatasets
