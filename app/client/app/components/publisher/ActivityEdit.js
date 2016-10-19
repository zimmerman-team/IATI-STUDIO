import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import {Tooltip } from '../general/Tooltip.react.jsx'
import { toggleMainMenu } from '../../actions/sync'
import { publishActivity }       from '../../actions/async'
import store from '../../app'
import ActivityForm from './ActivityForm'


class ActivityEdit extends React.Component {

  constructor(props){
    super(props)
  }

  handleSubmit(data) {
    this.props.publishActivity(data); // clear form
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(false))
  }

  render() {
    return (
      <ActivityForm onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    // publisher: state.publisher,
    // navState: state.navState
  }
}

export default connect(mapStateToProps, {
  publishActivity
})(ActivityEdit);