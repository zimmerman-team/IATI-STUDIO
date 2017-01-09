"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { toggleMainMenu }     from '../../actions/sync'

import { Link } from 'react-router'


export const ActivityListItem = ({ activity, deleteActivity }) => (
    <tr>
        <td>{ activity.iati_identifier }</td>
        <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
        <td><Link 
                to={`/app/publisher/activities/${activity.id}/`} 
                className={'button'}
            >Edit</Link></td>
        <td><a 
                href="#" 
                className="button alert"
                onClick={() => deleteActivity(activity.id)}
            >Delete</a></td>
    </tr>

)
ActivityListItem.propTypes = {

}

class ActivityList extends React.Component {

    componentDidMount() {
        this.props.toggleMainMenu(true)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.publisher !== nextProps.publisher) {
            this.props.getActivities(nextProps.publisher.id)
        }
    }

    render() {
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
                                        activity={a}
                                        deleteActivity={this.props.deleteActivity}
                                    />
                                    ))}
                                    <tr>
                                        <td>Content Goes Here</td>
                                        <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
                                        <td>Content Goes Here</td>
                                        <td>Content Goes Here</td>
                                    </tr>
                                    <tr>
                                        <td>Content Goes Here</td>
                                        <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                        <td>Content Goes Here</td>
                                        <td>Content Goes Here</td>
                                    </tr>
                                    <tr>
                                        <td>Content Goes Here</td>
                                        <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                                        <td>Content Goes Here</td>
                                        <td>Content Goes Here</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>
                    </div>
                </div>
        )
    }
}

import { activitiesSelector } from '../../reducers/createActivity'

function mapStateToProps(state, props) { 

    const publisher = state.user.oipaUser && state.user.oipaUser.admin_groups[0] && state.user.oipaUser.admin_groups[0].publisher

    return {
        navState: state.navState,
        activities: activitiesSelector(state),
        publisher,
    } 
}

import { getActivities, deleteActivity } from '../../actions/activity'

export default connect(mapStateToProps, {
    getActivities,
    deleteActivity,
    toggleMainMenu
})(ActivityList)
