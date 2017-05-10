import React, {render, PureComponent, Component, PropTypes} from 'react'
import {GeneralLoader} from '../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Link} from 'react-router';
import {getActivity} from '../../actions/activity'

const navigation = [
    {
        form: 'identification',
        navHeading: 'Identification',
        link: (id) => `/publisher/activities/${id}/identification/identification`,
        subHeading: [
            {
                form: '',
                title: "identification",
                link: (id) => `/publisher/activities/${id}/identification/identification`,
                requires: ['iati_identifier', 'hierarchy'],
            }
        ]
    },
    {
        form: 'basic-info',
        navHeading: 'Basic information',
        link: (id) => `/publisher/activities/${id}/basic-info/basic-info`,
        subHeading: [
            {
                title: "description",
                requires: ['descriptions.length'],
                link: (id) => `/publisher/activities/${id}/basic-info/description`
            },
            {
                title: "status",
                requires: ['activity_status'],
                link: (id) => `/publisher/activities/${id}/basic-info/status`
            },
            {
                title: "date",
                requires: [],
                data: ['actual_start', 'actual_end', 'planned_start', 'planned_end'],
                link: (id) => `/publisher/activities/${id}/basic-info/date`},
            {
                title: "contact",
                requires: [],
                data: ['contact_info.length'],
                link: (id) => `/publisher/activities/${id}/basic-info/contact`
            }
        ],
    },
    {
        navHeading: 'Participating organisations',
        link: (id) => `/publisher/activities/${id}/participating-organisation/participating-organisation`,
        form: 'participating-organisation',
        subHeading: [
            {
                title: "participating-organisation",
                requires: ['participating_organisations.length'],
                link: (id) => `/publisher/activities/${id}/participating-organisation/participating-organisation`
            }
        ]
    },
    {
        navHeading: 'Geopolitical information',
        link: (id) => `/publisher/activities/${id}/geopolitical-information/geopolitical-information`,
        form: 'geopolitical-information',
        subHeading: [
            {
                title: "country",
                requires: ['recipient_countries.length'],
                link: (id) => `/publisher/activities/${id}/geopolitical-information/country`
            },
            {
                title: "region",
                requires: ['recipient_regions.length'],
                link: (id) => `/publisher/activities/${id}/geopolitical-information/region`
            },
            {
                title: "location",
                requires: ['locations.length'],
                link: (id) => `/publisher/activities/${id}/geopolitical-information/location`
            }
        ]
    },
    {
        navHeading: 'Classifications',
        link: (id) => `/publisher/activities/${id}/classifications/classifications`,
        form: 'classifications',
        subHeading: [
            {
                title: "sector",
                requires: ['sectors.length'],
                link: (id) => `/publisher/activities/${id}/classifications/sector`
            },
            {
                title: "policy",
                data: ['policy_markers.length'],
                link: (id) => `/publisher/activities/${id}/classifications/policy`
            },
            {
                title: "select",
                data: ['collaboration_type', 'default_flow_type', 'default_finance_type', 'default_aid_type', 'default_tied_status'],
                link: (id) => `/publisher/activities/${id}/classifications/select`
            },
            {
                title: "country",
                data: ['country_budget_items.length'],
                link: (id) => `/publisher/activities/${id}/classifications/country`
            },
            {
                title: "humanitarian",
                data: ['humanitarian_scope.length'],
                link: (id) => `/publisher/activities/${id}/classifications/humanitarian`
            }
        ]
    },
    {
        navHeading: 'Financial',
        link: (id) => `/publisher/activities/${id}/financial/financial`,
        form: 'financial',
        subHeading: [
            {
                title: "budget",
                link: (id) => `/publisher/activities/${id}/financial/budget`,
                data: ['budgets.length']
            },
            {
                title: "planned-disbursement",
                link: (id) => `/publisher/activities/${id}/financial/planned-disbursement`,
                data: ['planned_disbursements']
            },
            {
                title: "transaction",
                link: (id) => `/publisher/activities/${id}/financial/transaction`,
                requires: ['transactions.length']
            },
            {
                title: "capital",
                link: (id) => `/publisher/activities/${id}/financial/capital`,
                data: ['capital_spend']
            }
        ]
    },
    {
        navHeading: 'Documents',
        link: (id) => `/publisher/activities/${id}/document-link/document-link`,
        form: 'document-link',
        subHeading: [
            {
                title: "documentLink",
                link: (id) => `/publisher/activities/${id}/document-link/document-link`,
                data: ['document_links.length']
            }
        ]
    },
    {
        navHeading: 'Relations',
        link: (id) => `/publisher/activities/${id}/relations/relations`,
        form: 'relations',
        subHeading: [
            {
                title: "relations",
                link: (id) => `/publisher/activities/${id}/relations/relations`,
                data: ['related_activities.length']
            }
        ]
    },
    {
        navHeading: 'Performance',
        link: (id) => `/publisher/activities/${id}/performance/performance`,
        form: 'performance',
        subHeading: [
            {
                title: "condition",
                link: (id) => `/publisher/activities/${id}/performance/condition`,
                data: ['conditions.length']
            },
            {
                title: "result",
                link: (id) => `/publisher/activities/${id}/performance/result`,
                data: ['results.length']
            },
            {
                title: "comment",
                link: (id) => `/publisher/activities/${id}/performance/comment`,
                data: ['legacy_data.length']
            }
        ]
    }
]


class ActivitySidebar extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== 'identification') {
            if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
                this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
            }
        }
    }

    render() {
        const {activityId, activity} = this.props;

        const page = 1;

        if (!activity) {
            return <GeneralLoader/>
        }

        return (
            <div className="helpdesk pushed">
                <div className="nav-field-list">
                    {navigation && navigation.map((i, index) => (
                        <NavItem
                            key={index}
                            navHeading={i.navHeading}
                            navLink={i.link(activityId)}
                            subHeadings={i.subHeading}
                            isActive={page == index}
                            className={page == index ? 'active' : ''}
                            activity={activity}
                            activityId={activityId}
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

function navItemIsValid(activityState, requires) {
    return (requires || [])
        .map(key => resolve(activityState, key))
        .reduce((acc, val) => acc && val, true)
}

function navItemHasData(activityState, keys) {
    return _(keys || [])
        .some(key => resolve(activityState, key))
}

const NavItem = ({activityId, activity, navLink, navHeading, subHeadings, isActive, className}) => {
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
                        link={subHeading.link(activityId)}
                        activity={activity}
                        isValid={navItemIsValid(activity, subHeading.requires)}
                        hasData={navItemHasData(activity, subHeading.data || subHeading.requires)}
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

import {publisherSelector} from '../../reducers/createActivity'

function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];

    return {
        form: state.form,
        activity: currentActivity,
        publisher: publisherSelector(state),
        // navigation: sidebar.navigation,
        // page: sidebar.page,
    };
}

export default connect(mapStateToProps, {
    getActivity,
})(ActivitySidebar);
