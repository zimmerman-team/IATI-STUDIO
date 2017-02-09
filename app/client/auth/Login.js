
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
      isSubmitting: false
  };

  handleResponse = (json, response) => {
      this.setState({
        errors: [],
        validationErrors: {},
        isSubmitting: false
      });
      if (Object.keys(json.errfor).length) {
        return this.setState({validationErrors: json.errfor})
      }
      if (json.errors.length) {
        return this.setState({errors: json.errors})
      }
      window.location = '/auth/login'
  };

  handleError = (error) => {
      this.setState({
          isSubmitting: false
      });
      throw error
  };

    handleFieldChange = (field) => {
        let validationErrors = this.state.validationErrors;
        validationErrors[field] = '';
        this.setState({validationErrors: validationErrors});
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
              handleFieldChange={this.handleFieldChange}
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
      e.preventDefault();

      this.setState({isSubmitting: true});
      const {handleResponse, handleError} = this.props;

      fetchJSON('/auth/login', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({
            username: this._username.value,
            password: this._password.value,
          })
      })
      .then(handleResponse)
      .catch(handleError);
  };

  render() {
      const {validationErrors, isSubmitting, renderErrors, handleError, handleFieldChange} = this.props;
      const hasValidationError = ((validationErrors.email && validationErrors.email.length)
            || (validationErrors.password && validationErrors.password.length) || (validationErrors.username && validationErrors.username.length));


      return (
        <form id="signup-form" ref={c => this._form = c}>
            <input 
                type="text" 
                name="username"
                ref={c => this._username = c}
                placeholder="Username or e-mail address"
                onChange={() => handleFieldChange("username")}
            />
            { validationErrors.username ? <ValidationErrors errors={validationErrors.username} /> : null }
            <input 
                type="password" 
                name="password"
                ref={c => this._password = c}
                placeholder="Password"
                onChange={() => handleFieldChange("password")}
            />
            { validationErrors.password ? <ValidationErrors errors={validationErrors.password} /> : null }

            { renderErrors ? <RenderErrors errors={renderErrors} /> : null }
            
          <button className="button input-height" disabled={isSubmitting || hasValidationError}  onClick={this.handleSubmit}>Log In</button>
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
