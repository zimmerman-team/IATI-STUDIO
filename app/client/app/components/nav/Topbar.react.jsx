"use strict"

import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../../app'
import classNames from 'classnames'

import { AddButton, SearchBox, UserBox } from './TopbarElements.react.jsx'
import MainMenu from './MainMenu.react.jsx'
import { Notification } from '../general/Notification.react.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import is_logo from '../../../img/is-logo.svg'
import avatar_default from '../../../img/avatar.svg'

const Topbar = React.createClass({

    toggleNav: function(menuState) {
        this.props.toggleMainMenu(!this.props.menuState)
    },

    render: function() {
        let {
            menuState,
            notificationCenter,
            firstName,
            lastName,
            avatar,
            visualizations,
        } = this.props

        let navClass = classNames('nav-toggle', {
            'closed' : !menuState
        })

        if (typeof avatar === 'undefined') { avatar = avatar_default }

        return (
            <div className="top-bar">
              <div className="top level row expanded">
                <div className="columns">
                    <Link to="/" className="logo">
                        <img src={is_logo} />
                    </Link>
                  <div className="title">IATI Studio</div>
                  <div className="release">beta release 1.1</div>
                  <UserBox
                      firstName={firstName}
                      lastName={lastName}
                      avatar={avatar} />
                  {/*<SearchBox />*/}
                </div>
              </div>
              <MainMenu
                  active={menuState}
                  toggleNav={this.toggleNav}
                  createVisualization={this.props.createVisualization}
                  visualisations={this.props.visualizations}
                  publisherStatus={this.props.publisherStatus}
              />
              <div className="notifications">
              <ReactCSSTransitionGroup transitionName="slide" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                { notificationCenter.map( (item, i) => {
                return (
                     <Notification
                         key={item.id}
                         className={item.type}
                         text={item.text} />
                     )
                 })}
               </ReactCSSTransitionGroup>
            </div>
          </div>
        )
    }
})

function mapStateToProps(state, props) {
    const {
      entities: { visualizations, },
      navState,
      notificationCenter,
      publisher,
      user } = state

    let viz = _.map(visualizations, x => x)

    return {
        visualizations: viz,
        menuState: navState.menuState,
        notificationCenter: notificationCenter,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        publisherStatus: publisher.validationStatus,
        //user: user
    }
}

import { toggleMainMenu } from '../../actions/sync'
import { createVisualization } from '../../actions/async'

export default connect(mapStateToProps, {
    toggleMainMenu,
    createVisualization,
})(Topbar)
