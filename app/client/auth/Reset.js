

import React, { PropTypes } from 'react'
import fetchJSON from '../app/utils/fetch'
import { withRouter } from "react-router"
import { Link } from 'react-router'

import { RenderErrors, ValidationErrors } from './Error'
import getHeaders from './headers'

const Reset = React.createClass({

  PropTypes: {
    
  },

  handleResponse: function(json, response) {
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

      this.props.router.push('/auth/login/reset/success')
  },

  handleError: function(error) {
    console.error(error)
  },

  getInitialState: function() {
      return {
          errors: [],
          validationErrors: {},
      }
  },

  render: function() {
    const {
        params: {
            email,
            token,
        }
    } = this.props


    const {
        errors,
        validationErrors,
    } = this.state
    
    return (
        <div>
          <ResetForm 
            email={email}
            token={token}
            handleError={this.handleError}
            handleResponse={this.handleResponse}
            validationErrors={validationErrors}
            renderErrors={errors}
          />

          { /*validationErrors ? <ValidationErrors errors={validationErrors} /> : null */}
          { /*errors ? <RenderErrors errors={errors} /> : null*/ }
        </div>
      
    )
  }
})

export default withRouter(Reset)

export const ResetForm = React.createClass({

    propTypes: {
        email: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        handleError: PropTypes.func.isRequired,
        handleResponse: PropTypes.func.isRequired,
        validationErrors: PropTypes.object,
        renderErrors: PropTypes.array,
    },

  handleSubmit: function(e) {
      e.preventDefault()

      const { email, token } = this.props

      const path = `/auth/login/reset/${email}/${token}`

      fetchJSON(path, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify({
              password: this._password.value,
              confirm: this._confirm.value,
          })
      })
      .then(this.props.handleResponse)
      .catch(this.props.handleError)
  },


  render: function() {
    console.log(this.props.validationErrors)
    return (
      <div className="interact panel with-logo">
        <div className="logo"></div>
        <h3>Reset your password</h3>
        <p>Enter a new password in the fields below.</p>
        <form id="signup-form" ref={c => this._form = c}>
            <input 
                type="password" 
                ref={c => this._password = c}
                placeholder="Password"
            />
            { this.props.validationErrors.password ? <ValidationErrors errors={this.props.validationErrors.password} /> : null }

            <input 
                type="password" 
                ref={c => this._confirm = c}
                placeholder="Confirm password"
            />
            { this.props.validationErrors.confirm ? <ValidationErrors errors={this.props.validationErrors.confirm} /> : null }

            { this.props.renderErrors ? <RenderErrors errors={this.props.renderErrors} /> : null }
            
          <button className="button input-height" onClick={this.handleSubmit}>Confirm Reset</button>
        </form>
      </div>
    )
  }
})

export const ResetSuccess = (props) => (
  <div>
    <h2>Your password has succesfully been reset.</h2>
    <Link to='/auth/login'>Back to login</Link>
  </div>
)
