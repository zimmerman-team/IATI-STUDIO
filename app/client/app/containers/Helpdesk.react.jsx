
"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'

import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import { toggleMainMenu } from '../actions/sync'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const q1 = {
	question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
	answer: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a justo mauris. Etiam elit ligula, porttitor quis ultricies in, malesuada sed justo. Sed congue justo non orci efficitur, sit amet convallis odio volutpat. Praesent auctor suscipit sagittis. Praesent sit amet ultricies arcu. Aliquam ligula ligula, egestas id rhoncus sed, dignissim vel sem. Nullam a turpis eu sapien suscipit elementum. Vivamus sit amet congue mi. Sed pharetra massa sit amet sem feugiat, vitae finibus diam interdum.</p>'
}
const q2 = {
	question: 'Borem ipsum dolor sit amet, consectetur adipiscing elit?',
	answer: '<p>Curabitur sed faucibus mi. Nulla id felis sit amet purus dictum vulputate vel quis metus. Sed massa dolor, condimentum eget sagittis ut, varius sit amet ex. Quisque vulputate gravida magna, sit amet laoreet ipsum vulputate nec. Praesent mauris nisl, pellentesque et scelerisque eget, sodales maximus leo. Pellentesque vehicula aliquam varius. Maecenas gravida auctor nisl euismod egestas.</p><p>Aliquam erat volutpat. Nullam euismod, enim eget dapibus tincidunt, dolor dui gravida erat, et rutrum leo lacus vitae est. Proin dignissim velit eget ornare scelerisque.</p>'
}
const q3 = {
	question: 'Lipsum dolor sit amet, consectetur adipiscing elit?',
	answer: '<p>Curabitur sed faucibus mi. Nulla id felis sit amet purus dictum vulputate vel quis metus. Sed massa dolor, condimentum eget sagittis ut, varius sit amet ex. Quisque vulputate gravida magna, sit amet laoreet ipsum vulputate nec. Praesent mauris nisl, pellentesque et scelerisque eget, sodales maximus leo. Pellentesque vehicula aliquam varius. Maecenas gravida auctor nisl euismod egestas.</p><p>Aliquam erat volutpat. Nullam euismod, enim eget dapibus tincidunt, dolor dui gravida erat, et rutrum leo lacus vitae est. Proin dignissim velit eget ornare scelerisque.</p>'
}
const faq = [q1,q2,q3]

const Helpdesk = React.createClass({
	getInitialState: function() {
        return {
            question: 0,
        }
    },
	componentDidMount: function() {
        store.dispatch(toggleMainMenu(true))
    },
    openQuestion: function(q) {
    	this.setState({
    		question: q
    	})
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
        			<div className="columns small-centered small-12 medium-10 large-8 xlarge-7 xxlarge-6">
        				<h1>Frequently asked questions</h1>
						{faq.map( (i,index) => (
						<HelpItem key={index} question={i.question} className={this.state.question == index ? 'active' : ''} onClick={this.openQuestion.bind(this, index)}>{this.state.question == index ? i.answer : null}</HelpItem>
						))}
        			</div>
        		</div>
        	</div>
		)
	}
})

const HelpItem = React.createClass({
	createMarkup: function() {
		return {__html: this.props.children}
	},
	render: function() {
		let questionClass = classNames('question-wrap',this.props.className)
		return (
			<div className={questionClass}>
				<h5 onClick={this.props.onClick}>{this.props.question}</h5>
				<ReactCSSTransitionGroup transitionName="drop" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{this.props.children ? 
					<div className="answer" dangerouslySetInnerHTML={this.createMarkup()} />
					: null }
				</ReactCSSTransitionGroup>
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
