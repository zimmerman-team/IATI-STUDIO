
import React, { PropTypes } from 'react'
import { withRouter } from "react-router"
import { Link } from "react-router"
import fetchJSON from '../app/utils/fetch'

import Social from './Social'
import getHeaders from './headers'

import { RenderErrors, ValidationErrors } from './Error'
import { ForgotPassword } from './Forgot'

class Signup extends React.Component {
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

      console.log(response);
      console.log(json);

      window.location = '/'

      // this.props.router.push('/auth/login/forgot/success')
      // this.props.router.push('/auth/login/forgot/success')
  };

    handleFieldChange = (field) => {
        let validationErrors = this.state.validationErrors;
        validationErrors[field] = '';
        this.setState({validationErrors: validationErrors});
    };

  handleError = (error) => {
      this.setState({
          isSubmitting: false
      });
      console.error(error);
  };

  render() {
    const {
      oauthTwitter,
      oauthGitHub,
      oauthFacebook,
      oauthGoogle,
      oauthTumblr,
    } = this.props;

    const {
        errors,
        validationErrors,
    } = this.state;

    return (

        <div>
          <div className="interact panel with-logo">
            <div className="logo"></div>
              <h3>Sign up</h3>
              <p>For the IATI Studio community edition</p>
              <Social {...this.props} />

              <div className="divider"><span>Or</span></div>
              <SignupForm 
                handleError={this.handleError}
                handleResponse={this.handleResponse}
                validationErrors={validationErrors}
                renderErrors={errors}
                isSubmitting={this.state.isSubmitting}
                handleFieldChange={this.handleFieldChange}
              />
              <p>By signing up, you agree to our <a href="https://www.iatistudio.com/terms-of-use/" target="_blank">terms & conditions</a></p>
              <ForgotPassword />
            </div>
            <div className="panel">
              <Link to='/auth/login'>Back to login</Link>
            </div>
            { /*validationErrors ? <ValidationErrors errors={validationErrors} /> : null*/ }
            { /*errors ? <RenderErrors errors={errors} /> : null*/ }
          </div>

    )
  }
}

export default withRouter(Signup)

export class SignupForm extends React.Component {
  static propTypes = {
        handleError: PropTypes.func.isRequired,
        handleResponse: PropTypes.func.isRequired,
        validationErrors: PropTypes.object,
        renderErrors: PropTypes.array,
  };

  state = {
    email: '',
    username: '',
    password: '',
  };

  handleSubmit = (e) => {
      e.preventDefault();

      this.setState({isSubmitting: true});
      const {handleResponse, handleError} = this.props;

      fetchJSON('/auth/signup', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({
              email: this._email.value,
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
                type="email" 
                ref={c => this._email = c}
                placeholder="Email"
                onChange={() => handleFieldChange("email")}
            />
            { validationErrors.email ? <ValidationErrors errors={validationErrors.email} /> : null }
            <input 
                type="text" 
                ref={c => this._username = c}
                placeholder="User name"
                onChange={() => handleFieldChange("username")}
            />
            { validationErrors.username ? <ValidationErrors errors={validationErrors.username} /> : null }
            <input 
                type="password" 
                ref={c => this._password = c}
                placeholder="Password"
                onChange={() => handleFieldChange("password")}
            />
            { validationErrors.password ? <ValidationErrors errors={validationErrors.password} /> : null }

            { renderErrors ? <RenderErrors errors={renderErrors} /> : null }
            
          <button className="button input-height" disabled={isSubmitting || hasValidationError} onClick={this.handleSubmit}>Create Account</button>
        </form>

    )
  }
}

export const SignupVerificationSuccess = (props) => (
      <div className="interact panel with-logo">
        <div className="logo"></div>
        <h3>A verification email has been sent to your email address, click on the link in the email to activate your account</h3>
      </div>
)

export const SignupSuccess = (props) => (
      <div className="interact panel with-logo">
        <div className="logo"></div>
        <h3>Sign up success!</h3>
        <p>Succesfully signed up, <Link to='/auth/login'>log in here</Link></p>
      </div>
)

export const SignupError = (props) => (

      <div className="interact panel with-logo">
        <div className="logo"></div>
        <h3>Error</h3>
        <p>Something went wrong, please try again.</p>
        <Link to='/auth/login'>Back to login</Link>
      </div>

)
