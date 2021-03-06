import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'

import {ModalButton} from '../general/Modal.react.jsx'
import {ContactForm} from './ContactForm.react.jsx'

const HelpBar = withRouter(class extends React.Component {
    gotoFAQ = () => {
		this.props.router.push('/help')
	};

    render() {
		return (
			<div id="help-bar">
				<div id="feedback" className="bar">
					<ModalButton name="Please provide feedback" minWidth="30rem" closeTop={true}>
						<iframe src="https://www.surveymonkey.com/r/BZSG87X" width="800" height="600" frameborder="0" style={{
							border: "1px solid #ccc",
							width: "100%"
						}}></iframe>
					</ModalButton>
				</div>
				<div id="support" className="bar">
					<ModalButton name="Support" extraClass="form" closeTop={true}>
						<ContactForm 
							className="modal-form" 
							firstName={typeof this.props.firstName == "string" ? this.props.firstName : ''} 
							lastName={typeof this.props.lastName == "string" ? this.props.lastName : ''} 
							email={this.props.email}
							gotoFAQ={this.gotoFAQ}/>
					</ModalButton>
				</div>
			</div>
		)
	}
})


function mapStateToProps(state, props) {
	const { user } = state
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
}

export default connect(mapStateToProps)(HelpBar)