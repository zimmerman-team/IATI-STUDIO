
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
	question: 'What is IATI Studio?',
	answer: '<p>IATI Studio provides you with direct access to the all the data published to the <a href="http://www.iatiregistry.org/" target="_blank">IATI Registry</a> and enables you to visualise and analyse those data.</p>'
	},
	{
	question: 'Can I access all data published in the IATI Registry?',
	answer: '<p>Yes. IATI Studio pulls data directly from the registry using the <a href="https://www.oipa.nl/" target="_blank">OIPA data engine</a> every night, so the data in IATI Studio is always up to date.</p>'
	},
	{
	question: 'Can I publish my own IATI data using IATI Studio?',
	answer: '<p>Not yet, but this will be operational this year. This Data Manager will be making use of the same easy to use interface as our chart builder.</p>'
	},
	{
		question:'I can not find my organisation',
		answer:'If your organisation is not listed, your IATI data is probably not up to date. IATI Studio can only show and use validated data. Please check the list or organisations that we can not process in IATI Studio and see if your organisation is on that list. Once you have fixed the issue - usually invalid transaction dates- IATI will pick up your data. If you are not on that list and not listed in IATI Studio either, please contact us for information at: <a href="mailto:enquiry@iatistudio.com">enquiry@iatistudio.com</a>.'
	},
	{
		question:'When will your Microsite Builder be ready?',
		answer:'IATI Studio aims for a release early 2017.'
	},
	{
	question: 'Is there a limit to how many charts I can build?',
	answer: '<p>For the Enterprise versions that will be released later this year, this limit will be different. See our pricing page for more details.</p><p>For the Enterprise versions that will be released later this year, this limit will be different. See our <a href="https://www.iatistudio.com/membership/" target="_blank">pricing page</a> for more details.</p>'
	},
	{
	question: 'I don\'t understand the chart embed feature',
	answer: '<p>You can embed charts using the iframe HTML code that\'s provided on your chart\'s public page. You can copy this iframe code into your personal or company website editor. If you\'re using a CMS like WordPress, make sure to paste the code in the <i>code</i> view of the page editor.</p><p>Unfortunately iframe heights are not really responsive for mobile viewing, so you may see a scrollbar sometimes. You can play around with the <i>width</i> and <i>height</i> settings in the embed code to see what works best for you.</p>'
	},
	{
	question: 'What is the Community Feed?',
	answer: '<p>The community feed consists of all the charts that have been published in IATI Studio. As soon as you hit <i>publish</i> in your chart, it will appear in the Community Feed. For a quick overview of which charts you have published, have a look in your library. Public charts are flagged with a green globe icon.</p>'
	},
	{
	question: 'Can I share my unpublished charts with someone else?',
	answer: '<p>No you can not. You must publish your chart to enable sharing or duplication.</p>'
	},
	{
	question: 'Something is not working!',
	answer: '<p>Oh no! Good thing IATI Studio is still in Beta. Please let us know what happened and when it happened, what you were doing, and anything else you might find relevant, on <a href="mailto:enquiry@iatistudio.com">enquiry@iatistudio.com</a> and we\'ll try and fix it as soon as possible.</p>'
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
