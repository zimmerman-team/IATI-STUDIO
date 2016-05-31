
"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'

import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import { toggleMainMenu } from '../actions/sync'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Scroll from 'react-scroll' 
var ScrollLink    = Scroll.Link
var ScrollElement = Scroll.Element
var ScrollEvents  = Scroll.Events
var scroll  = Scroll.animateScroll

//onzin
const lorem = "Oio nisl feugiat orci, nec euismod massa diam at metus. In pretium elementum tellus ut mollis. Nulla mattis luctus ex ut tempus. Maecenas vitae neque eu odio varius egestas vel nec augue. Maecenas massa diam, semper id efficitur in, fringilla eget est. Integer tincidunt sit amet nunc id auctor. Sed feugiat ante ligula, sit amet euismod odio hendrerit sed. Proin euismod felis felis, nec facilisis nulla laoreet a. Sed sagittis mauris ipsum, non varius orci sagittis in."
const lorem2 = "In scelerisque purus dui, nec tincidunt enim condimentum in. Morbi ac vulputate magna. Vestibulum gravida est a euismod mollis.Duis tempor tristique lorem in elementum. Phasellus in sodales mi, quis venenatis justo. Mauris semper aliquet libero, eu commodo neque viverra in. Aliquam erat volutpat. Quisque augue diam, tempor a aliquam et, venenatis sed sapien. Vivamus dictum, nunc nec iaculis fermentum!"

const Helpdesk = React.createClass({
	componentDidMount: function() {
        store.dispatch(toggleMainMenu(true))
    },
	render: function() {
		const {
            navState,
        } = this.props
		let wrapClass = classNames('helpdesk pusher',{
            'pushed' : navState.menuState
        })
		return (
			<div className={wrapClass}>
	        	<div className="row">
        			<div className="columns small-12 large-8">
        				<h2 className="page-title">Need help?</h2>
        				<p>Check out some of our most frequently asked questions below.</p>
        				<ScrollElement name="q1">
        					<h5>General help</h5>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p></div></HelpItem>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p></div></HelpItem>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p></div></HelpItem>
						</ScrollElement>
						<ScrollElement name="q2">
							<h5>Chart help</h5>
							<HelpItem question="Questionus"><div><p>{lorem}</p></div></HelpItem>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p></div></HelpItem>
						</ScrollElement>
						<ScrollElement name="q3">
							<h5>Website help</h5>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p></div></HelpItem>
						</ScrollElement>
						<ScrollElement name="q4">
							<h5>Activity help</h5>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p><p>{lorem}</p></div></HelpItem>
							<HelpItem question="Questionus"><div><p>{lorem}</p><p>{lorem2}</p></div></HelpItem>
						</ScrollElement>
        			</div>
        			<div className="columns small-12 large-4">
        				<FollowBar />
        			</div>
        		</div>
        	</div>
		)
	}
})

const FollowBar = React.createClass({
	render: function() {
		return (
			<div className="navbox">
				<h6>Quick topic navigation</h6>
				<ul className="list">
					<li><ScrollLink to="q1" spy={true} smooth={true} offset={-150} duration={500} >General help</ScrollLink></li>
					<li><ScrollLink to="q2" spy={true} smooth={true} offset={-50} duration={500} >Chart builder help</ScrollLink></li>
					<li><ScrollLink to="q3" spy={true} smooth={true} offset={-50} duration={500} >Website builder help</ScrollLink></li>
					<li><ScrollLink to="q4" spy={true} smooth={true} offset={-50} duration={500} >Activity help</ScrollLink></li>
				</ul>
			</div>
		)
	}
})

const HelpItem = React.createClass({
	render: function() {
		return (
			<div className="help-item">
				<h6>{this.props.question}</h6>
				{this.props.children}
			</div>
		)
	}
})

function mapStateToProps(state, props) {

    const { navState } = state

    return {
        navState: navState
    }
}

export default connect(mapStateToProps)(Helpdesk)
