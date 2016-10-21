import React from 'react'
import {connect}            from 'react-redux'
import _                      from 'lodash'
import {toggleMainMenu} from '../../actions/sync'
import {publishActivity}       from '../../actions/async'
import store from '../../app'
import IdentificationForm from './IdentificationForm'


class ActivityEdit extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSubmit(data) {
    //console.log(JSON.stringify(data))
    this.props.publishActivity(data);
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(false))
  }

  render() {
    return (
      <IdentificationForm onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    navState: state.navState
  }
}

export default connect(mapStateToProps, {
  publishActivity
})(ActivityEdit);