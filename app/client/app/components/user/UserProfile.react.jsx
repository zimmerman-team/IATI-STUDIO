"use strict"

import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import store from '../../app'
import classNames from 'classnames'
import { toggleMainMenu } from '../../actions/sync'
import { InputText, InputTextArea } from '../general/Input.react.jsx'

const UserProfile = React.createClass({
    getInitialState: function() {
        //let profileBig = this.props.avatar ? this.props.avatar.replace("_normal", "_400x400") : ''
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            //avatar: profileBig,
        };
    },
	componentDidMount: function() {
        store.dispatch(toggleMainMenu(true))
    },
    saveProfile: function() {
        this.props.updateUserProfile({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            //avatar: this.props.avatar,
        })
    },
    changeFirstName: function(e) {
        this.setState({ firstName: e.target.value })
    },
    changeLastName: function(e) {
        this.setState({ lastName: e.target.value })
    },
    changeEmail: function(e) {
        this.setState({ email: e.target.value })
    },
	render: function() {
		const {
            navState,
        } = this.props
		let wrapClass = classNames('pusher',{
            'pushed' : navState.menuState
        })
        return (
        	<div className={wrapClass}>
	        	<div className="row">
        			<div className="columns small-centered small-12 medium-10 large-6 xlarge-5 xxlarge-4 user">
                        <div className="interact panel with-logo">
                            <div className="logo"></div>
                            <h3>Edit your profile</h3>
                            <p className="nospacing"><strong>IATI studio Community version</strong></p>
                            <p>Free-non-commercial IATI Chart builder</p>
                            <label><span className="label">User name</span>
                                <InputText
                                    readOnly
                                    value={this.props.username}
                                />
                                <span className="fake-line"></span>
                            </label>
                            <label><span className="label">First name</span>
                                <InputText
                                    placeholder="Enter your first name" 
                                    value={this.state.firstName}
                                    onChange={this.changeFirstName}
                                />
                                <span className="fake-line"></span>
                            </label>
                            <label><span className="label">Last name</span>
                                <InputText
                                    placeholder="Enter your last name" 
                                    value={this.state.lastName}
                                    onChange={this.changeLastName}
                                />
                                <span className="fake-line"></span>
                            </label>
                            <label><span className="label">Email address</span>
                                <InputText
                                    placeholder="Enter your email address" 
                                    value={this.state.email}
                                    onChange={this.changeEmail}
                                />
                                <span className="fake-line"></span>
                            </label>
                            <a className="button" onClick={this.saveProfile}>Save profile</a>
                        </div>   
                    </div>
                </div>
			</div>
        )
    }
})

import { updateUserProfile } from '../../actions/async'

function mapStateToProps(state, props) {

    const { navState } = state

    return {
        navState: navState,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        email: state.user.email,
        avatar: state.user.avatar,
        username: state.user.username,
    }
}

export default connect(mapStateToProps, {
    updateUserProfile
})(UserProfile)
