

import React, { PropTypes } from 'react'
import { browserHistory, withRouter } from "react-router"
import { Link } from 'react-router'
import fetchJSON from '../app/utils/fetch'

import Social from './Social'
import getHeaders from './headers'

import { RenderErrors, ValidationErrors } from './Error'

class EmailConfirmation extends React.Component {
    static propTypes = {
        router: PropTypes.object.isRequired, // react-router
        oauthMessage: PropTypes.string,
        oauthTwitter: PropTypes.bool.isRequired,
        oauthGitHub: PropTypes.bool.isRequired,
        oauthFacebook: PropTypes.bool.isRequired,
        oauthGoogle: PropTypes.bool.isRequired,
        oauthTumblr: PropTypes.bool.isRequired,
    };

    state = {
        errors: [],
        validationErrors: {},
    };

    handleResponse = (json, response) => {
        if (Object.keys(json.errfor).length) {
          return this.setState({validationErrors: json.errfor})
        }
        if (json.errors.length) {
          return this.setState({errors: json.errors})
        }

        window.location = '/'

        // this.props.router.push('/auth/login/forgot/success')
        // this.props.router.push('/auth/login/forgot/success')
    };

    handleError = (error) => {
        console.error(error);
    };

    render() {
      const {
        oauthTwitter,
        oauthGitHub,
        oauthFacebook,
        oauthGoogle,
        oauthTumblr,
      } = this.props

      const {
          errors,
          validationErrors,
      } = this.state

      return (
        
            <div className="interact panel with-logo">
              <div className="logo"></div>
              <h3>Email confirmation</h3>
              <p>Enter your email address in the form below to get started</p>
              <EmailConfirmationForm 
                handleError={this.handleError}
                handleResponse={this.handleResponse}
                validationErrors={validationErrors}
                renderErrors={errors}
              />
              { /*validationErrors ? <ValidationErrors errors={validationErrors} /> : null */}
              { /*errors ? <RenderErrors errors={errors} /> : null */}
            </div>

      )
    }
}

export default withRouter(EmailConfirmation)

export const ForgotPassword = (props) => (
    <Link to='/login/forgot'>Forgot your password?</Link>
)

export class EmailConfirmationForm extends React.Component {
    static propTypes = {
          handleError: PropTypes.func.isRequired,
          handleResponse: PropTypes.func.isRequired,
          validationErrors: PropTypes.object,
          renderErrors: PropTypes.array,
    };

    handleSubmit = (e) => {
        e.preventDefault()

        fetchJSON('/auth/signup/social', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                email: this._email.value,
            })
        })
        .then(this.props.handleResponse)
        .catch(this.props.handleError)
    };

    render() {
      
      return (
          <form id="email_confirmation-form" ref={c => this._form = c}>
              <input 
                  type="email" 
                  ref={c => this._email = c}
                  placeholder="Email address"
              />
              { this.props.validationErrors.email ? <ValidationErrors errors={this.props.validationErrors.email} /> : null }

              { this.props.renderErrors ? <RenderErrors errors={this.props.renderErrors} /> : null }

            <button onClick={this.handleSubmit} className="button input-height">Confirm your email address</button>
          </form>

      )
    }
}

export const EmailConfirmationSuccess = (props) => (
  <div>
    <h2>Succesfully registered</h2>
    <Link to="/">Click here to go to the app</Link>
  </div>
)

