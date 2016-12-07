import { PropTypes } from 'react'
import React, {render} from 'react'

import { connect } from 'react-redux'
import store from '../../app'

import classNames from 'classnames'
import { toggleMainMenu } from '../../actions/sync'
import { Link } from 'react-router';


const FIELD_BLANK = 'FIELD_BLANK';
const FIELD_VALID = 'FIELD_VALID';
const FIELD_INVALID = 'FIELD_INVALID';

const navigation = [{
    page: 0,
    navHeading: 'Identification',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/identification',
  },
  {
    page: 1,
    navHeading: 'Basic information',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/basic-info',
  },
  {
    page: 2,
    navHeading: 'Participating organisations',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/participating-organisation',
  },
  {
    page: 3,
    navHeading:'Geopolitical information',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/geopolitical-information',
  },
  {
    page: 4,
    navHeading:'Classifications',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/classifications',
  },
  {
    page: 5,
    navHeading: 'Financial',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/financial',
  },
  {
    page: 6,
    navHeading: 'Documents',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/document-link',
  },
  {
    page: 7,
    navHeading: 'Relations',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/relations',
  },
  {
    page: 8,
    navHeading: 'Performance',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: 'fa fa-times invalid-nav'}],
    link: '/publisher/activity/performance',
  }
];

class ActivitySidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navHeading: -1,
    }
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(true))
  }

  componentWillReceiveProps(nextProps) {
    const tab = nextProps.formTab;
    let match = '';

    navigation.map((nav) => {
      match = nav.link.indexOf(tab) > -1 ? nav : match;
    });

    const page = match.page;
    if (page == this.state.navHeading) {
      this.setState({
        navHeading: -1
      })
    }
    else {
      this.setState({
        navHeading: page
      })
    }
  }

  render() {
    const { navState } = this.props;
    let wrapClass = classNames('helpdesk  ', {
      'pushed' : navState.menuState
    });
    return (
      <div className={wrapClass}>
        <div className="nav-field-list">
          {navigation.map( (i,index) => (
            <NavItem key={index} navHeading={i.navHeading} navLink={i.link} navSubHeadings={i.subHeadings}
                className={this.state.navHeading == index ? 'active' : ''} isActive={this.state.navHeading == index}/>
          ))}
        </div>
      </div>
    )
  }
};

const NavItem = React.createClass({
  render: function() {
    let navHeadingClass = classNames('question-wrap',this.props.className);
    const {navLink, navHeading, navSubHeadings, isActive} = this.props;

    return (
      <div className={navHeadingClass}>
        <Link to={navLink}>
          <h5>{navHeading} </h5>
        </Link>
        <ul className="answer nav-list">
          {isActive && navSubHeadings.map((subHeading, subIndex) => {
            return (
              <li key={subIndex}>
                {subHeading.navValidationClass &&
                    <i className={subHeading.navValidationClass}/>
                }
                {subHeading.field}
              </li>
            )})
          }
        </ul>
      </div>
    )
  }
});


function mapStateToProps(state) {
  const { navState } = state;
  return {
    navState: navState
  }
}

export default connect(mapStateToProps)(ActivitySidebar)
