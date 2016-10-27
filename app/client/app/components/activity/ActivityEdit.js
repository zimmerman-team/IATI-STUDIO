import React from 'react'
import {connect}            from 'react-redux'
import {toggleMainMenu} from '../../actions/sync'
import {createActivity, getCodeListItems, addBasicInformation}       from '../../actions/async'
import store from '../../app'
import IdentificationForm from './forms/IdentificationForm'
import BasicInformationForm from './forms/BasicInformationForm'
import ParticipatingOrganisationForm from './forms/ParticipatingOrganisationForm'
import {GeneralLoader} from '../general/Loaders.react.jsx'

class ActivityEdit extends React.Component {

  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleIdentificationFormSubmit = this.handleIdentificationFormSubmit.bind(this);
    this.handleBasicInformationFormSubmit = this.handleBasicInformationFormSubmit.bind(this);
    this.handleParticipatingOrganisationFormSubmit = this.handleParticipatingOrganisationFormSubmit.bind(this);

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
    this.props.addBasicInformation(data);
    this.nextPage();
  }

  /**
   * Submit participating organisation data and redirect
   * to geopolitical information form.
   *
   * @param data
   */
  handleParticipatingOrganisationFormSubmit(data) {
    console.log(JSON.stringify(data))
    // this.props.addBasicInformation(data);
    // this.nextPage();
  }


  componentDidMount() {
    store.dispatch(toggleMainMenu(false));

  }

  componentWillMount() {
    this.props.getCodeListItems('Language');
  }

  render() {
    const {page} = this.state;

    if (!this.props.activity.languages) {
      return <GeneralLoader/>
    }

    return (
      <div>
        {page === 1 && <IdentificationForm onSubmit={this.handleIdentificationFormSubmit} {...this.props} />}
        {page === 2 &&
        <BasicInformationForm previousPage={this.previousPage}
                              onSubmit={this.handleBasicInformationFormSubmit} {...this.props}/>}
        {page === 3 &&
        <ParticipatingOrganisationForm previousPage={this.previousPage}
                                       onSubmit={this.handleSubmit.bind(this)} {...this.props}/>}
      </div>

    )
  }

  // render() {
  //   // const {activity} = this.props;
  //   // console.log(activity);
  //   return (
  //     <BasicInformationForm onSubmit={this.handleParticipatingOrganisationFormSubmit} />
  //   );
  // }
}

function mapStateToProps(state, props) {
  return {
    navState: state.navState,
    page: state.page,
    activity: state.activity
  }
}

export default connect(mapStateToProps, {
  createActivity,
  getCodeListItems,
  addBasicInformation
})(ActivityEdit);