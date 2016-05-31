
"use strict"

import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import store from '../../app'
import classNames from 'classnames'

import { toggleMainMenu } from '../../actions/sync'

import is_logo from '../../../img/is-logo.svg'


const Topbar = React.createClass({

    toggleNav: function(menuState) {
        this.props.toggleMainMenu(!this.props.menuState)
    },

    render: function() {
	   return ( 
            <div className="top-bar">
                <div className="top level row expanded">
                    <div className="columns">
                        <a href="https://www.iatistudio.com" className="logo"><img src={is_logo} /></a>
                        <div className="title">Powered by IATI studio</div>
                        <div className="userbox public">
                            <a href="/auth/signup"><b>Sign up now</b></a>
                            <a href="/auth/login">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

function mapStateToProps(state, props) {
    const { navState, notificationCenter } = state

    return {
        menuState: navState.menuState,
        notificationCenter: notificationCenter
    }
}

export default connect(mapStateToProps, {
    toggleMainMenu
})(Topbar)
