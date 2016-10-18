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
		let splashClass = classNames({'hidden' : !this.state.splashScreen })
		return (
      <div id="splashscreen" className={splashClass}>
        
        <h2>Welcome to IATI Studio publisher</h2>
        <a className="close"><i className="material-icons" onClick={this.toggleSplash}>{this.state.splashScreen ? "close" : "expand_more"}</i></a>

        {this.state.splashScreen &&
				<div className="row">

          <div className="columns small-12 medium-4 large-4">
            <h5>Published IATI before?</h5>
                <p>
                User alessandrozimmermanzimmermannl 3a965a26-6302-4f8d-b69d-26e7605bbfc4 bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus.
                </p>
						<a className="button" onClick={this.importSettings}>Import your settings</a>
					</div>

					<div className="columns small-12 medium-4 large-4">
						<h5>Want to start out with IATI?</h5>
								<p>
                User zimmzimm 42664fcd-2494-4bab-92fe-5af6113d55a6 elit. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel.
                </p>
						<a className="button" onClick={this.setupOrganisation}>Set up your organisation</a>
					</div>

					<div className="columns small-12 medium-4 large-4">
						<h5>What's IATI all about?</h5>
								<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel.
								</p>
						<a className="button" onClick={this.goToFAQ}>Read the FAQ</a>
					</div>

		    </div>
        }

			</div>
		)
    }
})

const mapStateToProps = function(state, props) {
    return {}
}

SplashScreen = connect(mapStateToProps, { createVisualization }) (SplashScreen)

export default SplashScreen
