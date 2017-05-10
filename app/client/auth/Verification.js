

import React, { PropTypes } from 'react'
import { withRouter } from "react-router"
import { Link } from "react-router"
import fetchJSON from '../app/utils/fetch'

import Social from './Social'
import getHeaders from './headers'

import { RenderErrors, ValidationErrors } from './Error'
import { ForgotPassword } from './Forgot'

class AccountVerification extends React.Component {
    static propTypes = {
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
        this.setState({
          errors: [],
          validationErrors: {},
        })
        if (Object.keys(json.errfor).length) {
            return this.setState({validationErrors: json.errfor})
        }
        if (json.errors.length) {
            return this.setState({errors: json.errors})
        }

        // console.log('called...');
        // // TODO: account verification - 2016-05-10
        window.location = '/'
        // this.props.router.push('/auth/account/verification/success')

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

        <div>
          <h3>An email has been sent to your email adress, follow the instructions in the mail to complete your sign-up</h3>
          <VerificationForm 
            handleError={this.handleError}
            handleResponse={this.handleResponse}
            validationErrors={validationErrors}
            renderErrors={errors}
          />

          { /*validationErrors ? <ValidationErrors errors={validationErrors} /> : null*/ }
          { /*errors ? <RenderErrors errors={errors} /> : null */}
        </div>

      )
    }
}

export default withRouter(AccountVerification)

export class VerificationForm extends React.Component {
    static propTypes = {
          handleError: PropTypes.func.isRequired,
          handleResponse: PropTypes.func.isRequired,
          validationErrors: PropTypes.object,
          renderErrors: PropTypes.array,
    };

    state = {
      email: '',
    };

    handleSubmit = (e) => {
        e.preventDefault()

        fetchJSON('/auth/account/verification', {
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
          <form id="verification-form" ref={c => this._form = c}>
              <input 
                  type="email" 
                  ref={c => this._email = c}
                  placeholder="Email"
              />
              { this.props.validationErrors.email ? <ValidationErrors errors={this.props.validationErrors.email} /> : null }
              
              { this.props.renderErrors ? <RenderErrors errors={this.props.renderErrors} /> : null }

            <button className="button input-height" onClick={this.handleSubmit}>Resend email</button>
          </form>

      )
    }
}

export const VerificationResendSuccess = (props) => (
      <div className="interact panel with-logo">
        <div className="logo"></div>
        <h3>Another verification email has been sent to your email address, click on the link in the email to activate your account</h3>
      </div>
)
