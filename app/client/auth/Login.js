
import React, { PropTypes } from 'react'
import { browserHistory } from "react-router"
import { Link } from "react-router"
import fetchJSON from '../app/utils/fetch'

import Social from './Social'
import getHeaders from './headers'

import { RenderErrors, ValidationErrors } from './Error'
import { ForgotPassword } from './Forgot'

export class Login extends React.Component {
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
      window.location = '/auth/login'
  };

  handleError = (error) => {
    throw error
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
          <div className="interact panel with-logo">
            <div className="logo"></div>
            <h3>Log in</h3>
            <p className=""><strong>To IATI Studio</strong></p>
            <Social {...this.props} />
            <div className="divider"><span>Or</span></div>
            <LoginForm
              handleError={this.handleError}
              handleResponse={this.handleResponse}
              validationErrors={validationErrors}
              renderErrors={errors}
            />
            <ForgotPassword />

          </div>
          <div className="panel">
            Not a member yet? <Link to='/auth/signup'>Sign up!</Link>
          </div>
          { /*validationErrors ? <ValidationErrors errors={this.state.validationErrors} /> : null*/ }
          { /*errors ? <RenderErrors errors={this.state.errors} /> : null*/ }
        </div>

    )
  }
}

export default Login

export class LoginForm extends React.Component {
  static propTypes = {
      handleError: PropTypes.func.isRequired,
      handleResponse: PropTypes.func.isRequired,
      validationErrors: PropTypes.object,
      renderErrors: PropTypes.array,
  };

  state = {
    username: '',
    password: '',
  };

  handleSubmit = (e) => {
      e.preventDefault()

      fetchJSON('/auth/login', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({
            username: this._username.value,
            password: this._password.value,
          })
      })
      .then(this.props.handleResponse)
      .catch(this.props.handleError)
  };

  render() {

    return (
        <form id="signup-form" ref={c => this._form = c}>
            <input 
                type="text" 
                name="username"
                ref={c => this._username = c}
                placeholder="Username or e-mail address"
            />
            { this.props.validationErrors.username ? <ValidationErrors errors={this.props.validationErrors.username} /> : null }
            <input 
                type="password" 
                name="password"
                ref={c => this._password = c}
                placeholder="Password"
            />
            { this.props.validationErrors.password ? <ValidationErrors errors={this.props.validationErrors.password} /> : null }

            { this.props.renderErrors ? <RenderErrors errors={this.props.renderErrors} /> : null }
            
          <button className="button input-height" onClick={this.handleSubmit}>Log In</button>
        </form>
    )
  }
}



/*export const LoginValidationError = (props) => {
  let errors = props.formatErrors

  return (
    <div>
      <h2>The following fields are required: {errors.keys().join(',')}</h2>
    </div>
  )
}

export const LoginError = (props) => {

  let errors = props.errors.map(error => (
    <li>{error}</li>
  ))

  return (
    <ul>
      {errors}
    </ul>
  )
}*/
