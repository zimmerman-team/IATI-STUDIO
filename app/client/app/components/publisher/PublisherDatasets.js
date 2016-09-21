'use strict'

import React, { PropTypes }     from 'react'
import _ from 'lodash'


let PublisherDatasets = React.createClass({
  render: function () {

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
        <td>TO DO: If non IATI Studio, have import link. Else checkmark; &#x2713;</td>
      </tr>
    })

    return (
      <div>
        <div className="row">
          <div className="columns small-12 medium-12">
            <div>
              <h6>Datasets on IATI Registry</h6>
              <a href='#'><i className="material-icons iH6">info</i></a>
            </div>
            <p>
              We see you're already have datasets published to the IATI registry outside of IATI Studio. 
              Do you want to manage these datasets from IATI Studio? If so hit the import button. (TODO : decide if this is the correct flow)
            </p>
          </div>
        </div>
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

export default PublisherDatasets
