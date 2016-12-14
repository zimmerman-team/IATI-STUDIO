import React from 'react'
import {connect}            from 'react-redux'
import {toggleMainMenu} from '../../actions/sync'
import { createActivity, getCodeListItems, addBasicInformation, addParticipatingOrganisation,
  addDocumentLink } from '../../actions/activity'
import store from '../../app'
import IdentificationForm from './forms/identificationForm/IdentificationForm'
import BasicInformationForm from './forms/basicInformationForm/BasicInformationForm'
import ParticipatingOrganisationForm from './forms/participatingOrganisationForm/ParticipatingOrganisationForm'
import GeopoliticalInformationForm from './forms/geopoliticalForm/GeopoliticalForm'
import ClassificationsForm from './forms/classificationForm/ClassificationsForm'
import DocumentLinkForm from './forms/documentLinkForm/DocumentLinkForm'
import RelationsForm from './forms/relationsForm/RelationsForm'
import FinancialForm from './forms/financialForm/FinancialForm'
import ActivitySidebar from './ActivitySidebar'
import PerformanceForm from './forms/performanceForm/PerformanceForm'
import {GeneralLoader} from '../general/Loaders.react.jsx'

class ActivityEdit extends React.Component {

  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleIdentificationFormSubmit = this.handleIdentificationFormSubmit.bind(this);
    this.handleBasicInformationFormSubmit = this.handleBasicInformationFormSubmit.bind(this);
    this.handleParticipatingOrganisationFormSubmit = this.handleParticipatingOrganisationFormSubmit.bind(this);
    this.getFormComponentFromRoute = this.getFormComponentFromRoute.bind(this);

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
    store.dispatch(createActivity(data));
    this.nextPage();
  }

  /**
   * Submit basic information data and redirect
   * to participating organisation form.
   *
   * @param data
   */
  handleBasicInformationFormSubmit(data) {
    store.dispatch(addBasicInformation(data));
    this.nextPage();
  }

  /**
   * Submit participating organisation data and redirect
   * to geopolitical information form.
   *
   * @param data
   */
  handleParticipatingOrganisationFormSubmit(data) {
    store.dispatch(addParticipatingOrganisation(data));
    this.nextPage();
  }


  /**
   * Submit participating organisation data and redirect
   * to geopolitical information form.
   *
   * @param data
   */
  handleRelationsFormSubmit(data) {
    //TODO fix this
    store.dispatch(addParticipatingOrganisation(data));
    this.nextPage();
  }

  /**
   * Submit participating organisation data and redirect
   * to geopolitical information form.
   *
   * @param data
   */
  handleDocumentLinkFormSubmit(data) {
    store.dispatch(addDocumentLink(data));
    this.nextPage();
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(false));

  }

  componentWillMount() {
    this.props.getCodeListItems('Language');
  }

  // render() {
  //   const {page} = this.state;
  //
  //   if (!this.props.activity.Language) {
  //     return <GeneralLoader/>
  //   }
  //
  //   return (
  //     <div>
  //       {page === 1 && <IdentificationForm onSubmit={this.handleIdentificationFormSubmit} {...this.props} />}
  //       {page === 2 &&
  //       <BasicInformationForm previousPage={this.previousPage}
  //                             onSubmit={this.handleBasicInformationFormSubmit} {...this.props}/>}
  //       {page === 3 &&
  //       <ParticipatingOrganisationForm previousPage={this.previousPage}
  //                                      onSubmit={this.handleSubmit.bind(this)} {...this.props}/>}
  //     </div>
  //
  //   )
  // }

  getFormComponentFromRoute(tab) {
    switch(tab) {
      case 'identification':
        return <IdentificationForm/>;
      case 'basic-info':
        return <BasicInformationForm onSubmit={this.handleBasicInformationFormSubmit} {...this.props} />;
      case 'participating-organisation':
        return <ParticipatingOrganisationForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;
      case 'geopolitical-information':
        return <GeopoliticalInformationForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;
      case 'classifications':
        return <ClassificationsForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;
      case 'document-link':
        return <DocumentLinkForm/>;
      case 'relations':
        return <RelationsForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;
      case 'financial':
        return <FinancialForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;
      case 'performance':
        return <PerformanceForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;

      default:
        return <IdentificationForm onSubmit={this.handleParticipatingOrganisationFormSubmit} {...this.props} />;
    }
  }

  render() {
    // const {activity} = this.props;
    // console.log(activity);
    const formTab = this.props.routeParams.tab;
    const formComponent = this.getFormComponentFromRoute(formTab);

    if (!this.props.activity || !this.props.activity["Language"]) {
      return <GeneralLoader/>
    }
    return (
      <div>
        <div className="row">
          <div className="columns small-9">
            {formComponent}
          </div>
          <div className="columns small-3 activity-nav-col">
            <ActivitySidebar formTab={formTab}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    navState: state.navState,
    page: state.page,
    activity: state.activity
  }
}

export default connect(mapStateToProps, {
  getCodeListItems,
})(ActivityEdit);
