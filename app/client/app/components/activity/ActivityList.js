"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { toggleMainMenu }     from '../../actions/sync'

import { Link } from 'react-router'


export const ActivityListItem = ({ publisher, activity, deleteActivity }) => (
    <tr>
        <td>{ activity.iati_identifier }</td>
        <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
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

)
ActivityListItem.propTypes = {

}

class ActivityList extends React.Component {

    constructor(props) {
        super(props);

        this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
    }

    componentDidMount() {
        this.props.toggleMainMenu(true)
    }

    componentWillMount() {
        if (this.props.publisher) {
            this.props.getActivities(this.props.publisher.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.publisher !== nextProps.publisher) {
            this.props.getActivities(nextProps.publisher.id)
        }
    }

    onLoadMoreClick() {
        this.props.getActivities(this.props.publisher.id)
    }

    render() {
        const {pagination } = this.props


        let wrapClass = classNames('pusher',{
            'pushed' : this.props.navState.menuState
        })
        return (
            <div className={wrapClass}>
                <div className="row controls">
                    <div className="columns small-12">
                        <h2 className="page-title">List of your activities</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th width="200">IATI identifier</th>
                                    <th>Table Header</th>
                                    <th width="150">Edit</th>
                                    <th width="150">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.activities.map(a => (
                                    <ActivityListItem 
                                        key={a.id}
                                        activity={a}
                                        publisher={this.props.publisher}
                                        deleteActivity={this.props.deleteActivity}
                                    />
                                    ))}
                                </tbody>
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

                            </table>
                            <hr />
                        </div>
                    </div>
                </div>
        )
    }
}

import { activitiesSelector, publisherSelector } from '../../reducers/createActivity'

function mapStateToProps(state, props) { 

    return {
        navState: state.navState,
        pagination: state.pagination.activities,
        activities: activitiesSelector(state),
        publisher: publisherSelector(state),
    } 
}

import { getActivities, deleteActivity } from '../../actions/activity'

export default connect(mapStateToProps, {
    getActivities,
    deleteActivity,
    toggleMainMenu
})(ActivityList)
