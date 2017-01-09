import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { InputText, InputTextArea } from '../general/Input.react.jsx'
import fetchJSON from '../../utils/fetch'
import getHeaders from '../../../auth/headers'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export class ContactForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);
        var fullname = props.firstName + ' ' + props.lastName

        this.state = {
            name: fullname.length > 3 ? fullname : '',
            email: props.email,
            message: '',
            nameError: false,
            emailError: false,
            messageError: false,
            formSending: false,
            formSent: false,
            formError: false,
            serverResponse: ''
        };
    }

    handleResponse = (response) => {
		console.log(response)
		if (response.success) {
			this.setState({
				formSent: true,
				serverResponse: response.message,
				formSending: false,
				formError: false,
			})
		}
		else {
			this.setState({
				formSent: false,
				serverResponse: response.message,
				formSending: false,
				formError: true,
			})
		}
		//console.log(json);
		// if (Object.keys(json.errfor).length) {
		// 	console.log(json.errfor)
		// 	return this.setState({validationErrors: json.errfor})
		// }
		// if (json.errors.length) {
		// 	console.log(json.errors)
		// 	return this.setState({errors: json.errors})
		// }
	};

    handleError = (response) => {
		if (response) {
			console.error(response)
		}
	};

    handleSubmit = (e) => {
    	e.preventDefault()
    	var name = this.state.name.trim()
	    var email = this.state.email.trim()
	    var message = this.state.message.trim()
	    if (!name) {
	    	this.setState({nameError: true})
	    }
	    if (!email) {
	    	this.setState({emailError: true})
	    }
	    if (!message) {
	    	this.setState({messageError: true})
	    }
	    if (!name || !email || !message) { return }
	    this.setState({formSending: true})
	    //submit the form to the server
		fetchJSON('/send', {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				message: this.state.message,
	        })
	    })
	    .then(this.handleResponse)
	    .catch(this.handleError)
    };

    changeName = (e) => {
        this.setState({ name: e.target.value })
        if (e.target.value.length < 3) {
        	this.setState({nameError: true})
        }
        else {
        	this.setState({nameError: false})
        }
    };

    changeEmail = (e) => {
        this.setState({ email: e.target.value })
        var emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailCheck.test(e.target.value)) {
        	this.setState({emailError: true})
        }
        else {
        	this.setState({emailError: false})
        }
    };

    changeMessage = (e) => {
        this.setState({ message: e.target.value })
        if (e.target.value.length < 10) {
        	this.setState({messageError: true})
        }
        else {
        	this.setState({messageError: false})
        }
    };

    render() {
		var nameClass = classNames({'error' : this.state.nameError})
		var emailClass = classNames({'error' : this.state.emailError})
		var messageClass = classNames({'error' : this.state.messageError})
		return (
			<div className="form-wrapper">
				<h4>We're here to help</h4>
					{this.state.formSent ? 
						<p className="success">{this.state.serverResponse}</p>
						: 
						<form className={this.props.className} onSubmit={this.handleSubmit}>
							<p>You've checked our <a onClick={this.props.gotoFAQ}>FAQ</a> and need some more help? Fill out the form below and we'll get back to you as soon as possible.</p>
							<InputText
					            placeholder="Enter your name" 
					            onChange={this.changeName} 
					            value={this.state.name}
					            className={nameClass}
					        />
							<InputText
					            placeholder="Enter your email address" 
					            onChange={this.changeEmail} 
					            value={this.state.email}
					            className={emailClass}
					        />
							<InputTextArea
					            placeholder="How can we help you?" 
					            onChange={this.changeMessage}
					            className={messageClass}
					        />
					        {this.state.formSending ?
					        	<input type="submit" value="Sending..." className="button secondary" disabled/>
						        :
						        <input type="submit" value="Send" className="button secondary"/>
						    }
						</form> 
					}
					{this.state.formError ? 
						<p className="error">{this.state.serverResponse}</p>
						: 
						null
					}
			</div>
		)
	}
}


