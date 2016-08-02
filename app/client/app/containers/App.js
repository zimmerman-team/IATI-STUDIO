import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { errorMessage } from '../reducers'
import { isLoggedIn } from '../utils/login.js'

import Topbar from "../components/nav/Topbar.react.jsx"
import PublicTopbar from "../components/public/Topbar"
import HelpBar from "../components/help/HelpBar.react.jsx"

import {PublicFooter} from "../components/public/Footer.react.jsx"

import DocumentTitle from "react-document-title"

import classNames from 'classnames'

import sadChart from '../../img/sad-chart.svg'

const App = React.createClass({

    renderError: function() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <div className="row">
                <div className="columns small-12 medium-10 large-8 small-centered error-page">
                    <img src={sadChart} />
                    <h4>Something went wrong</h4>
                    <p>This is the error code we got:</p>
                    <p>{errorMessage}</p>
                </div>
            </div>
        )
    },

    render: function() {
        const { isLoggedIn } = this.props
        //still to nicefy
        let publicClass = classNames({
            public : this.props.location.pathname.startsWith("/public") || this.props.location.pathname.endsWith("/preview"),
            embed : this.props.location.pathname.endsWith("/embed"),
            loggedin : isLoggedIn,
        })

        if (isLoggedIn) {
            document.cookie = "isAuthorized=1;path=/;domain=iatistudio.com;"
            document.cookie = "isAuthorized=1;path=/;domain=localhost;"
        }

        return (
            <DocumentTitle title='IATI Studio | Beta Release 1.1'>
                <div className={publicClass}>
                    { isLoggedIn  ? <Topbar /> : <PublicTopbar /> }
                    <div id="content-wrap">
                    { this.props.children }
                    {
                        //{ this.props.errorMessage === null ? 
                        //    this.props.children
                        //: this.renderError() }
                        //this.renderError()
                    }
                    </div>
                    { isLoggedIn  ? <HelpBar /> : null }
                    { (this.props.location.pathname.startsWith("/public") || this.props.location.pathname.endsWith("/preview")) && !this.props.location.pathname.endsWith("/embed") ?  <PublicFooter/> : null }
                </div>
            </DocumentTitle>
        )   
    }
})

function mapStateToProps(state, props) {
    return {
        errorMessage: state.errorMessage,
        isLoggedIn: isLoggedIn(state),
    }
}

export default connect(mapStateToProps, {
    errorMessage
})(App)

