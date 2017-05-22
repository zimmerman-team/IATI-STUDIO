"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import store from '../../app'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { browserHistory } from 'react-router'

const default_viz = {
    name: "",
    description: "",
}

let SplashScreen = React.createClass({
    contextTypes: {
	router: React.PropTypes.object.isRequired
    },

    toggleSplash: function() {
		this.props.updateUserUI({
		    splashScreen: !this.props.uiState.splashScreen,
		    joyride:this.props.uiState.joyride,
		})
    },

    newChart: function() {
        this.props.createVisualization(default_viz)
            .then(action => action.response.result)
            .then(viz_id => this.context.router.push(`/chartbuilder/${viz_id}`))
    },
    render: function() {
		let splashClass = classNames({'hidden' : this.props.uiState.splashScreen })
		return (
		    <div id="splashscreen" className={splashClass}>
				<div className="row">
				    <div className="columns small-12 medium-10 large-8 small-centered">
						<a className="close"><i className="material-icons" onClick={this.toggleSplash}>{this.props.uiState.splashScreen ? "expand_more" : "close"}</i></a>
						<h1>Welcome to IATI Studio</h1>
						<h4>Visualise, analyse and produce IATI data</h4>
						{/*<ReactCSSTransitionGroup transitionName="drop-top-right" transitionEnterTimeout={500} transitionLeaveTimeout={500}> */}
						    {this.props.uiState.splashScreen ? null :
							<div>
								<ul>
								    <li>Produce custom charts based on +600K activities from the IATI registry</li>
				
								    <li>Produce IATI activities and report your projects online (May 2017)</li>
								    <li>Build IATI MicroSites (2017)</li>
								</ul>
							</div>
							}
							{/*</ReactCSSTransitionGroup>*/}
						<a className="button" onClick={this.newChart}>Build your chart</a>
					</div>
		    	</div>
			</div>
		)
    }
})

import { updateUserUI } from '../../actions/async'

const mapStateToProps = function(state, props) {

    return {
		uiState: state.user.uiState /*&& state.user.uiState.splashScreen*/
    }
}

import { createVisualization } from '../../actions/async'

SplashScreen = connect(mapStateToProps, {
	createVisualization,
    updateUserUI
})(SplashScreen)

export default SplashScreen
