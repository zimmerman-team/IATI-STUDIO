"use strict"

import _                        from 'lodash'
import React, { PropTypes }     from 'react'
import classNames               from 'classnames'
import store                    from '../../app'
import { connect }              from 'react-redux'
import { browserHistory }       from 'react-router'
import { createVisualization }  from '../../actions/async'
import { updateUserUI }         from '../../actions/async'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'

let SplashScreen = React.createClass({

    getInitialState: function () {
      return {
        splashScreen: true
      }
    },

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    toggleSplash: function() {
  		this.setState({
        splashScreen: !this.state.splashScreen
      })
    },

    importSettings: function() {
    	alert('to do');
    },
    setupOrganisation: function() {
    	alert('to do');
    },
    goToFAQ: function() {
    	alert('to do');
    },

    render: function() {
		let splashClass = classNames({'puf' : !this.state.splashScreen })
		return (
      <div id="splashscreen" className={splashClass}>
        {/*<ReactCSSTransitionGroup transitionName="drop-top-right" transitionEnterTimeout={500} transitionLeaveTimeout={500}> */}

        <div className="row">
          <div className="columns small-12 medium-10 large-8 small-centered">
            <h2 className="title-splashscreen">Welcome to IATI Studio publisher</h2>
          </div>
        </div>

				<div className="row">

          <div className="columns small-12 medium-4 large-4">
            <a className="close"><i className="material-icons" onClick={this.toggleSplash}>close</i></a>
            <h4>Published IATI before?</h4>
              <div>
                <p>
                User alessandrozimmermanzimmermannl 0acb3e0a-8729-4524-99a2-aa35d77acb12 bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel.
                </p>
							</div>
						<a className="button" onClick={this.importSettings}>Import your settings</a>
					</div>

					<div className="columns small-12 medium-4 large-4">
						<h4>Want to start out with IATI?</h4>
							<div>
								<p>
                User zimmzimm 42664fcd-2494-4bab-92fe-5af6113d55a6 elit. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel.
                </p>
							</div>
						<a className="button" onClick={this.setupOrganisation}>Set up your organisation</a>
					</div>

					<div className="columns small-12 medium-4 large-4">
						<h4>What's IATI all about?</h4>
							<div>
								<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel.
								</p>
							</div>
						<a className="button" onClick={this.goToFAQ}>Read the FAQ</a>
					</div>

		    	</div>

          {/*</ReactCSSTransitionGroup>*/}
			</div>
		)
    }
})

const mapStateToProps = function(state, props) {
    return {}
}

SplashScreen = connect(mapStateToProps, { createVisualization }) (SplashScreen)

export default SplashScreen
