'use strict'

import React, { PropTypes }     from 'react'
import { PublisherButton }      from '../general/List.react.jsx'



let DatasetsCreate = React.createClass({

  getInitialState: function() {
    return {
      name: "",
      title: "",
      fileType: "",
    }
  },

  createDataset: function() {
    this.props.createDataset(this.props.publisher.userId + "-" + this.state.name, this.state.title, this.state.fileType)
  },

  onChangeName: function(e) {
    this.setState({
      name: e.target.value
    })
  },

  onChangeTitle: function(e) {
    this.setState({
      title: e.target.value
    })
  },

  onChangeFiletype: function(e) {
    this.setState({
      fileType: e.target.value
    })
  },

  render: function () {
    let userId = this.props.publisher.userId == undefined ? "" : this.props.publisher.userId

    return (
      <div className="row">
        <div className="columns small-12 medium-12">
          <table>
            <thead>
              <tr>
                <th>Dataset name</th>
                <th>Dataset title</th>
                <th>Filetype</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userId}-<input style={{width:"100px", display: "inline-block"}} type="text" placeholder="dataset name" value={this.state.name} onChange={this.onChangeName} /></td>
                <td><input type="text" placeholder="dataset title" value={this.state.title} onChange={this.onChangeTitle} /></td>
                <td><input type="text" placeholder="filetype" value={this.state.fileType} onChange={this.onChangeFiletype} /></td>
                <td><a onClick={this.createDataset}>Create</a></td>
              </tr>
            </tbody>
          </table>
          </div>
      </div>
    )
  }
})

DatasetsCreate.propTypes = {
  publisher: PropTypes.object.isRequired,
  createDataset: PropTypes.func.isRequired
}

export default DatasetsCreate
