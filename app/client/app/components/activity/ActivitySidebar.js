import React, {render, PureComponent, Component, PropTypes} from 'react'

import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router';
import {Tooltip} from '../general/Tooltip.react.jsx'

import { getBasicInformationData } from '../../actions/sidebar'

class ActivitySidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const {mainForm, subForm, dispatch} = nextProps;

    if (nextProps.form) {
      const reduxForms = Object.assign({}, nextProps.form);
      dispatch(getBasicInformationData(reduxForms, mainForm, subForm));
    }
  }

  render() {
    const {page, navigation} = this.props;
    const activeForm = navigation[page];

    let wrapClass = classNames('helpdesk', 'pushed');

    return (
      <div className={wrapClass}>
        <div className="nav-field-list">
          {navigation && navigation.map( (i,index) => (
            <NavItem key={index} navHeading={i.navHeading} navLink={i.link} activeForm={activeForm} isActive={page == index}
                className={page == index ? 'active' : ''} />
          ))}
        </div>
      </div>
    )
  }
}

const NavItem = ({navLink, navHeading, activeForm, isActive, className}) => (
  <div className={classNames('question-wrap', className)}>
    <Link to={navLink}>
      <h5>{navHeading} </h5>
    </Link>
    <ul className="answer nav-list">
      {isActive && activeForm.subHeading.map((subHeading, subIndex) => {
        return (
          <li key={subIndex} className="capitalize">
            {isActive && subHeading.navValidationClass &&
                <i className={subHeading.navValidationClass}/>
            }
            {subHeading.canNavigate &&
              <Link to={subHeading.link} >{subHeading.title}</Link>
            }
            {!subHeading.canNavigate &&
              <span>
                <Tooltip className="inline" tooltip="Fill previous forms first">
                  <i className="material-icons">info</i>
                </Tooltip>
                {subHeading.title}
              </span>
            }
          </li>
        )})
      }
    </ul>
  </div>
);

ActivitySidebar.propTypes = {
  page: PropTypes.number.isRequired,
  navigation: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { sidebar } = state;
  if (!sidebar) {
    return {
      form: state.form,
      page: 0,
      navigation: [],
    };
  }

  return {
    form: state.form,
    navigation: sidebar.navigation,
    page: sidebar.page,
  };
}

export default connect(mapStateToProps)(ActivitySidebar);
