
"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'

import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import { toggleMainMenu } from '../actions/sync'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const faq = [{
	question: 'What is this app all about?',
	answer: '<p>IATI Studio gives you access to the entire <a href="http://www.iatiregistry.org/" target="_blank">IATI Registry</a> and enables you to visualise its data. </p>'
	},
	{
	question: 'Can I access everything in the IATI Registry?',
	answer: '<p>Yes you can. We pull the data straight from the registry using our <a href="https://www.oipa.nl/" target="_blank">OIPA data engine</a> every night, so the data in IATI Studio is always up to date.</p>'
	},
	{
	question: 'Can I publish my own IATI data using IATI Studio?',
	answer: '<p>Not yet, but we\'re working hard to make this possible soon, using the same easy to use interface as our chart builder.</p>'
	},
	{
	question: 'When will your micro site builder be ready?',
	answer: '<p>We\'re aiming for a release in the autumn of 2016.</p>'
	},
	{
	question: 'Is there a limit to how many charts I can build?',
	answer: '<p>Yes there is, we\'ve currently set this at 20 charts. The charts residing in your trash also count towards this limit, so if you\'re having trouble, be sure to empty the trash regularly.</p><p>For the paid versions that we\'ll release later this year, this limit will be different of course. See our <a href="https://www.iatistudio.com/membership/" target="_blank">pricing page</a> for details.</p>'
	},
	{
	question: 'I don\'t get the chart embedding feature',
	answer: '<p>You can embed charts using the iframe HTML code we provide on your chart\'s public page. You can copy this iframe code into your own website\'s HTML. If you\'re using a CMS like WordPress, be sure to paste the code in the <i>code</i> view of the page editor.</p><p>Unfortunately iframe heights are not really responsive for mobile viewing, so you might see a scrollbar sometimes. You can play around with the <i>width</i> and <i>height</i> settings in the embed code to see what works best for you.</p>'
	},
	{
	question: 'How does the community feed work?',
	answer: '<p>The community feed consists of all the charts that have been published. As soon as you hit <i>publish</i> in your chart, it will appear in the public feed. For a quick overview of which charts you have published, have a look in your library. Public charts are flagged with a globe icon.</p>'
	},
	{
	question: 'Can I share my unpublished charts with someone else?',
	answer: '<p>No you can\'t. You have to publish your chart to enable sharing, otherwise only you are the only one with access.</p>'
	},
	{
	question: 'I\'ve found a bug!',
	answer: '<p>Oh no! Good thing we\'re still in beta. Please let us know what happened and when it happened, what you were doing, and anything else you might find relevant, on <a href="mailto:enquiry@iatistudio.com">enquiry@iatistudio.com</a> and we\'ll try and fix it as soon as possible.</p>'
	},
	{
	question: 'Your question not here?',
	answer: '<p>You can also reach us by email on <a href="mailto:enquiry@iatistudio.com">enquiry@iatistudio.com</a>.</p>'
	},
]

const Helpdesk = React.createClass({
	getInitialState: function() {
        return {
            question: -1,
        }
    },
	componentDidMount: function() {
        store.dispatch(toggleMainMenu(true))
    },
    toggleQuestion: function(q) {
    	if (q == this.state.question) {
    		this.setState({
	    		question: -1
	    	})
    	}
    	else {
    		this.setState({
	    		question: q
	    	})
    	}
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
						<HelpItem key={index} question={i.question} className={this.state.question == index ? 'active' : ''} onClick={this.toggleQuestion.bind(this, index)}>{this.state.question == index ? i.answer : null}</HelpItem>
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

const MailForm = React.createClass({
	sendEmail: function() {
		
	},
	render: function() {
		return (
			<form>
				<label>Your name</label>
				<input />
				<label>Your email address</label>
				<input />
				<label>Your message</label>
				<textarea />
			</form>
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
