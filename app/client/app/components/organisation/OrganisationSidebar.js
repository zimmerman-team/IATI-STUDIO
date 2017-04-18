
import React, {render, PureComponent, Component, PropTypes} from 'react'
import {GeneralLoader} from '../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Link} from 'react-router';
import {getOrganisation} from '../../actions/organisation'

const navigation = [
    {
        navHeading: 'Identification',
        link:  `/publisher/organisation/identification/`,
        subHeading: [
            {
                title: "Reporting organisation",
                link:  `/publisher/organisation/identification/reporting-organisation`,
                requires: ['reporting_organisations.length'],
            },
            {
                title: "Identification",
                link:  `/publisher/organisation/identification/identification`,
                requires: ['organisation_identifier', 'name'],
            }
        ]
    },
    {
        navHeading: 'Budgets',
        link:  `/publisher/organisation/budget/`,
        subHeading: [
            {
                title: "Total Budget",
                link:  `/publisher/organisation/budget/total-budget`,
                data: ['total_budgets.length']
            },
            {
                title: "Recipient Organisation Budget",
                link:  `/publisher/organisation/budget/recipient-org-budget`,
                data: ['recipient_org_budgets.length']
            },
            {
                title: "Recipient Region Budget",
                link:  `/publisher/organisation/budget/recipient-region-budget`,
                data: ['recipient_region_budgets.length']
            },
            {
                title: "Recipient Country Budget",
                link:  `/publisher/organisation/budget/recipient-country-budget`,
                data: ['recipient_country_budgets.length']
            },
            {
                title: "Total Expenditure",
                link:  `/publisher/organisation/budget/total_expenditure`,
                data: ['total_expenditures.length']
            },
        ]
    },
    {
        navHeading: 'Documents',
        link:  `/publisher/organisation/documents/document-link`,
        form: 'document-link',
        subHeading: [
            {
                title: "Document Links",
                link:  `/publisher/organisation/documents/document-link`,
                data: ['document_links.length']
            }
        ]
    }
]


class OrganisationSidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { organisation } = this.props;

        // TODO: get organisation from publisher object - 2017-04-18

        const page = 1;

        return (
            <div className="helpdesk pushed">
                <div className="nav-field-list">
                    {navigation && navigation.map((i, index) => (
                        <NavItem
                            key={index}
                            navHeading={i.navHeading}
                            navLink={i.link}
                            subHeadings={i.subHeading}
                            isActive={page == index}
                            className={page == index ? 'active' : ''}
                            organisation={organisation}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

function resolve(cur, ns) {

    var undef;

    ns = ns.split('.');

    while (cur && ns[0])
        cur = cur[ns.shift()] || undef;

    return cur;

}

function navItemIsValid(organisationState, requires) {
    return (requires || [])
        .map(key => resolve(organisationState, key))
        .reduce((acc, val) => acc && val, true)
}

function navItemHasData(organisationState, keys) {
    return _(keys || [])
        .some(key => resolve(organisationState, key))
}

const NavItem = ({organisation, navLink, navHeading, subHeadings, isActive, className}) => {
    return (
        <div className={classNames('question-wrap', className)}>
            <Link to={navLink}>
                <h5>{navHeading} </h5>
            </Link>
            <ul className="answer nav-list">
                { subHeadings.map((subHeading, subIndex) => (
                    <SubNavItem
                        key={subIndex}
                        navValidationClass={subHeading.navValidationClass}
                        canNavigate={subHeading.canNavigate}
                        title={subHeading.title}
                        link={subHeading.link}
                        organisation={organisation}
                        isValid={navItemIsValid(organisation, subHeading.requires)}
                        hasData={navItemHasData(organisation, subHeading.data || subHeading.requires)}
                    />
                ))
                }
            </ul>
        </div>
    )
};

export const NAV_VALIDATION_CLASS = 'fa fa-check valid-nav';
export const NAV_INVALIDATION_CLASS = 'fa fa-times invalid-nav';
export const NAV_NODATA_CLASS = 'fa fa-times nodata-nav';

const SubNavItem = ({isValid, hasData, navValidationClass, canNavigate, title, link}) => (
    <li className="capitalize">
        <i className={isValid ? (hasData ? NAV_VALIDATION_CLASS : NAV_NODATA_CLASS) : NAV_INVALIDATION_CLASS}/>
        <Link to={link}>{title}</Link>
        <span>
            {
                /*
                 <Tooltip className="inline" tooltip="Fill previous forms first">
                 <i className="material-icons">info</i>
                 </Tooltip>
                 */
            }
        </span>
    </li>
)

import { publisherSelector } from '../../reducers/publisher'

function mapStateToProps(state, props) {
    return {
        form: state.form,
        publisher: publisherSelector(state),
    };
}

export default connect(mapStateToProps, {
    getOrganisation,
})(OrganisationSidebar);
