"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import classNames             from 'classnames'
import { toggleMainMenu }     from '../../actions/sync'

import { Link } from 'react-router'


export const ActivityListItem = ({ publisher, activity, deleteActivity }) => (
    <tr>
        <td>{ activity.iati_identifier }</td>
        <td>{ activity.title && activity.title.narratives && activity.title.narratives[0] && activity.title.narratives[0].text }</td>
        <td>{ (activity.published_state && activity.published_state.published) ? 'Published': 'Not Published' }</td>
        <td>{ (activity.published_state && activity.published_state.ready_to_publish) ? 'Ready to Publish': 'Not Ready to Publish' }</td>
        <td><Link
                to={`/publisher/activities/${activity.id}/identification/`}
                className={'button'}
            >Edit</Link></td>
        <td><a 
                href="#" 
                className="button alert"
                onClick={() => deleteActivity(publisher.id, activity.id)}
            >Delete</a></td>
    </tr>

);

export const ActivityTypeSelector = props => {
    return  (
        <div>
            <select onChange={props.onChange}>
                <option value="">All</option>
                <option value="true">Published</option>
                <option value="false">Not published</option>
            </select>
        </div>
    )
};

class OrderBySelector extends React.Component {
    constructor(props) {
        super(props);
        this.onOrderClick = this.onOrderClick.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.isReversed = this.isReversed.bind(this);
    }

    isSelected(option) {
        return this.props.orderBy.indexOf(option) >= 0
    }

    isReversed() {
        return this.props.orderBy.charAt(0) === '-'
    }

    onOrderClick(value, e) {
        e.preventDefault();
        if (this.isSelected(value)) {
            return this.props.handleActivityFilter((this.isReversed() ? '' : '-') + value)
        } else {
            return this.props.handleActivityFilter(value);
        }
    }

    render() {
        const { options } = this.props;

        const orderByButtons = options.map( (option, index, array) => (
            <span key={index}>
                <button
                    className={classNames({
                        active: this.isSelected(option.value),
                        reverse: this.isReversed()
                    })}
                    onClick={this.onOrderClick.bind(this, option.value)}>
                    {option.name}
                </button>
                { index === array.length-1 ? null : <span className="separator">|</span> }
            </span>
        ));

        return (
            <div className="order-by">
                <span className="label">Sort by</span>
                { orderByButtons }
            </div>

        )
    }
}

OrderBySelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
    })).isRequired, // the available order by's
    orderBy: PropTypes.string.isRequired, // the query param
}

class ActivityList extends React.Component {

    constructor(props) {
        super(props);

        this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
        this.handleChangeActivitySearch = this.handleChangeActivitySearch.bind(this);
        this.handleActivitySearch = this.handleActivitySearch.bind(this);
        this.handleActivityFilter = this.handleActivityFilter.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);

        this.state = {
            activitySearch: '',
            activeFilter: 'title',
            publishedStatusFilter: '',
        }
    }

    componentWillMount() {
        this.props.toggleMainMenu(true);

        if (this.props.publisher.id) {
            this.props.getActivities(this.props.publisher.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.publisher !== nextProps.publisher) {
            this.props.getActivities(nextProps.publisher.id)
        }
    }

    onTypeChange(e) {
        const publishedStatus = e.target.value;
        this.setState({publishedStatusFilter: publishedStatus});
        this.props.filterActivities(this.props.publisher.id, {published: publishedStatus})
    }

    onLoadMoreClick() {
        this.props.getActivities(this.props.publisher.id, this.state.activitySearch)
    }

    handleChangeActivitySearch(e) {
        this.setState({ activitySearch: e.target.value })
    }

    handleActivitySearch() {
        this.props.filterActivities(this.props.publisher.id, {q: this.state.activitySearch})
    }

    handleActivityFilter(filter) {
        this.setState({activeFilter: filter});
        this.props.filterActivities(this.props.publisher.id, {ordering: filter})
    }

    render() {
        const { pagination } = this.props;

        let wrapClass = classNames('pusher',{
            'pushed' : this.props.navState.menuState
        });
        return (
            <div className={wrapClass}>
                <div className="row controls">
                    <div className="columns small-12">

                        <div className="row controls">
                            <div className="columns small-2">
                                <h2 className="page-title">List of your activities</h2>
                            </div>

                            <div className="columns small-3">
                                <input
                                    placeholder="User ID"
                                    type="text"
                                    value={this.state.activitySearch}
                                    onChange={this.handleChangeActivitySearch}
                                    disabled={pagination.isFetching}/>
                            </div>
                            <div className="columns small-1">
                                <button className="button large"
                                    onClick={this.handleActivitySearch}
                                    disabled={pagination.isFetching}>
                                    Search
                                </button>
                            </div>

                            <div className="columns small-4">
                                <OrderBySelector
                                    orderBy={this.state.activeFilter}
                                    options={[
                                        { name: 'Title', value: 'title', asc: true },
                                        { name: 'Start Date', value: 'start_date', asc: true  },
                                        { name: 'End Date', value: 'end_date', asc: true  },
                                    ]}
                                    handleActivityFilter={(value) => this.handleActivityFilter(value)}
                                />
                            </div>

                            <div className="columns small-2">
                                <ActivityTypeSelector
                                    value={this.state.publishedStatusFilter}
                                    onChange={this.onTypeChange }
                                />
                            </div>
                        </div>
                        <hr/>

                        <table>
                            <thead>
                                <tr>
                                    <th width="200">IATI identifier</th>
                                    <th>Title</th>
                                    <th>Publish Status</th>
                                    <th>Ready to Publish Status</th>
                                    <th width="150">Edit</th>
                                    <th width="150">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.activities.map((a, index) => (
                                    <ActivityListItem key={index}
                                        activity={a}
                                        publisher={this.props.publisher}
                                        deleteActivity={this.props.deleteActivity}
                                    />
                                    ))}
                                </tbody>
                            </table>
                            {
                                pagination.pageCount === 1 || pagination.next ?
                                    <button className="button"
                                            onClick={this.onLoadMoreClick}
                                            disabled={pagination.isFetching}>
                                        { pagination.isFetching ? "Loading..." : "Load More" }
                                    </button>
                                    :
                                    null
                            }
                            <hr />
                        </div>
                    </div>
                </div>
        )
    }
}

import { activitiesSelector, publisherSelector } from '../../reducers/createActivity'

function mapStateToProps(state) {

    return {
        navState: state.navState,
        pagination: state.pagination.activities,
        activities: activitiesSelector(state),
        publisher: publisherSelector(state),
    } 
}

import { getActivities, filterActivities, deleteActivity } from '../../actions/activity'

export default connect(mapStateToProps, {
    getActivities,
    filterActivities,
    deleteActivity,
    toggleMainMenu
})(ActivityList)
