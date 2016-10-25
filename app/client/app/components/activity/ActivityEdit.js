import React from 'react'
import {connect}            from 'react-redux'
import _                      from 'lodash'
import {toggleMainMenu} from '../../actions/sync'
import {publishActivity}       from '../../actions/async'
import store from '../../app'
import IdentificationForm from './forms/IdentificationForm'
import BasicInformationForm from './forms/BasicInformationForm'


class ActivityEdit extends React.Component {

  constructor(props) {
    super(props);

    this.prepareActivityData = this.prepareActivityData.bind(this);
  }

  handleSubmit(data) {
    const formData = this.prepareActivityData(data);
    this.props.publishActivity(formData);
  }

  /**
   * Prepare data (formatting) of identification form
   * for POST.
   *
   * @param data
   * @returns {*}
   */
  prepareActivityData(data) {
    const title = {
      text: data.textTitle,
      language: data.titleLanguage
    };
    const narrativesItems = [];
    narrativesItems.push(title);
    if (data.additionalTitles) {
      data.additionalTitles.map((title, index) => narrativesItems.push(title));
    }

    data.title = {narratives: narrativesItems};

    return data;
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(false))
  }

  render() {
    return (
      <IdentificationForm onSubmit={this.handleSubmit.bind(this)}/>
      //<BasicInformationForm onSubmit={this.handleSubmit.bind(this)}/>
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