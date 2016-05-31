"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import store from '../../app'
import { Link } from 'react-router'

import { toggleMainMenu } from '../../actions/sync'

export const AddButton = React.createClass({
    getInitialState: function() {
        return {
            addActive: false,
        }
    },
    toggleAdd: function(e) {
        this.setState({ addActive: !this.state.addActive })
    },
    render: function() {
        let toggleClass = classNames('add-wrap', {
            'open' : this.state.addActive,
        })
        return (
            <div className={toggleClass}>
                <button className="add-button" onClick={this.toggleAdd}>
                    <i className="material-icons">add</i>
                </button>
                <div className="add-menu">
                    <ul>
                        <li>
                            <Link to="app#/chartbuilder/123" onClick={this.toggleAdd}><span className="img-wrap chart"><img src="img/chart.svg" /></span>Create chart</Link>
                        </li>
                        <li><a onClick={this.toggleAdd}><span className="img-wrap theme"><img src="img/theme.svg" /></span>Create data theme</a></li>
                        <li><a onClick={this.toggleAdd}><span className="img-wrap data"><img src="img/iatidata.svg" /></span>Create IATI activity</a></li>
                    </ul>
                </div>
            </div>
        )
    }
})

export const SearchBox = React.createClass({
    render: function() {
        return (
            <div className="searchbox">
                <input type="text" placeholder="Search through your library" />
            </div>
        )
    }
})

export const UserBox = React.createClass({
    mixins: [
        require('react-onclickoutside')
    ],
    getInitialState: function() {
        return {
            expanded: false,
        }
    },
    expandMenu: function(e) {
        e.preventDefault()
        this.setState({ expanded: !this.state.expanded })
    },
    handleClickOutside: function(evt) {
        this.setState({ expanded: false })
    },
    render: function() {
        let menuClass = classNames('userbox', {
            'expanded' : this.state.expanded,
        })
        return (
            <div className={menuClass}>
                <a onClick={this.expandMenu}>
                    <span className="message">{this.props.firstName} {this.props.lastName}</span>
                    <img src={this.props.avatar} />
                    <i className="material-icons">keyboard_arrow_down</i>
                </a>
                <div className="user-menu">
                    <ul>
                        {/*<li><a href="#/user/settings" onClick={this.handleClickOutside}>Settings</a></li>*/}
                        <li><Link to="/user/profile" onClick={this.handleClickOutside}>Profile</Link></li>
                        <li><a href="/auth/logout">Logout</a></li>
                        <li><a href="https://www.iatistudio.com">Back to the shop</a></li>
                    </ul>
                </div>
            </div>
        )
    }
})
