import { PropTypes } from 'react'
import React, {render} from 'react'

import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router';

import { navigation, getBasicInformationData } from '../../actions/formSidebar'

class ActivitySidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navHeading: -1,
    }
  }

  componentDidMount() {
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

    if (nextProps.form) {
      const form = Object.assign({}, nextProps.form);
      getBasicInformationData(Object.assign({}, form));
    }
  }

  render() {
    const {navState} = this.props;

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
    navState: state.navState,   //not required right now
    form: state.form
  }
}

export default connect(mapStateToProps)(ActivitySidebar)
