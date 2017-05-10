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

class SplashScreen extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    state = {
      splashScreen: true
    };

    toggleSplash = () => {
  		this.setState({
        splashScreen: !this.state.splashScreen
      })
    };

    importSettings = () => {
    	alert('to do');
    };

    setupOrganisation = () => {
    	alert('to do');
    };

    goToFAQ = () => {
    	alert('to do');
    };

    render() {
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
                Some instructions here.
                </p>
						<a className="button" onClick={this.importSettings}>Import your settings</a>
					</div>

					<div className="columns small-12 medium-4 large-4">
						<h5>Want to start out with IATI?</h5>
								<p>
                Some instructions there.
                </p>
						<a className="button" onClick={this.setupOrganisation}>Set up your organisation</a>
					</div>

					<div className="columns small-12 medium-4 large-4">
						<h5>What is IATI?</h5>
								<p>
                Some instructions here as well.
								</p>
						<a className="button" onClick={this.goToFAQ}>Read the FAQ</a>
					</div>

		    </div>
        }

			</div>
		)
    }
}

const mapStateToProps = function(state, props) {
    return {}
}

SplashScreen = connect(mapStateToProps, { createVisualization }) (SplashScreen)

export default SplashScreen
