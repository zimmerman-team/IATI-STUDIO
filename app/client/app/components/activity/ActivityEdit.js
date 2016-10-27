import React from 'react'
import {connect}            from 'react-redux'
import {toggleMainMenu} from '../../actions/sync'
import {createActivity, getLanguages}       from '../../actions/async'
import store from '../../app'
import IdentificationForm from './forms/IdentificationForm'
import BasicInformationForm from './forms/BasicInformationForm'
import ParticipatingOrganisationForm from './forms/ParticipatingOrganisationForm'


class ActivityEdit extends React.Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleIdentificationFormSubmit = this.handleIdentificationFormSubmit.bind(this);

    this.state = {
      page: 1
    }
  }

  handleSubmit(data) {
    console.log(JSON.stringify(data))
  }

  nextPage() {
    this.setState({page: this.state.page + 1})
  }

  previousPage() {
    this.setState({page: this.state.page - 1})
  }

  /**
   * Submit identification data and redirect
   * to basic information form.
   *
   * @param data
   */
  handleIdentificationFormSubmit(data) {
    this.props.createActivity(data);
    this.nextPage();
  }

  /**
   * Submit basic information data and redirect
   * to participating organisation form.
   *
   * @param data
   */
  handleBasicInformationFormSubmit(data) {
    //this.props.createActivity(data);
    this.nextPage();
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(false));

  }

  componentWillMount() {
    const languages = this.props.getLanguages();
    console.log(languages);
  }

  render() {
    const {page} = this.state;
    return (
      <div>
        {page === 1 && <IdentificationForm onSubmit={this.handleIdentificationFormSubmit}/>}
        {page === 2 && <BasicInformationForm previousPage={this.previousPage} onSubmit={this.handleBasicInformationFormSubmit}/>}
        {page === 3 &&
        <ParticipatingOrganisationForm previousPage={this.previousPage} onSubmit={this.handleSubmit.bind(this)}/>}
      </div>

    )
  }
}

function mapStateToProps(state, props) {
  return {
    navState: state.navState,
    page: state.page
  }
}

export default connect(mapStateToProps, {
  createActivity,
  getLanguages
})(ActivityEdit);