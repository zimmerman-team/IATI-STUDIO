"use strict"

import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'
import _                        from 'lodash'
import classNames               from 'classnames'
import { browserHistory }       from 'react-router'
import { toggleMainMenu }       from '../../actions/sync'
import { fetchPublisher, updatePublisher, verifyApiKey, removeApiKey, deletePublisher }       from '../../actions/async'
import SplashScreen             from './PublisherSplash'
import { Link }                 from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Tooltip} from '../general/Tooltip.react.jsx'

let PublisherSettings = React.createClass({ // A stateful container all children are stateless

    getInitialState: function() { return {} },

    componentDidMount: function() {
        this.props.toggleMainMenu(true)
    },

    componentWillMount: function() {
        this.props.toggleMainMenu(false)

        console.log("here we need to fetch the correct publisher?");
        // this.props.fetchPublisher()
    },

    render: function() {
        const { oipaUser } = this.props

        let wrapClass = classNames('pusher',{
            'pushed' : this.props.navState.menuState
        })

        const isValidated = oipaUser && oipaUser.is_validated

        console.log(isValidated);

        return (
            <div className={wrapClass}>
                <div id="publisherWrapper">
                    <SplashScreen />

                    <div className="row controls">
                        <div className="columns small-centered small-12 large-10 xlarge-8">
                            <h2 className="page-title">Setup your IATI publishing settings</h2>
                            <hr />
                        </div>
                    </div>

                    <div className="row">

                        <div className="columns small-centered small-12 large-10 xlarge-8">
                            {
                                !isValidated ?
                                    <PublisherApiKeyForm
                                        formStatus={this.props.formStatus}
                                        removeApiKey={this.props.removeApiKey}
                                        verifyApiKey={this.props.verifyApiKey}
                                        isValidated={ isValidated }
                                    />
                                    :
                                    <PublisherApiKeyUnlink
                                        removeApiKey={this.props.removeApiKey}
                                        formStatus={this.props.formStatus}
                                    />
                            }
                            <PublisherApiKeyStatus
                                isValidated={ isValidated }
                            />
                                
                            <h6 className="with-tip">Datasets on the IATI Registry</h6>
                            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
                            { isValidated ? 
                                <p>We found {this.props.publisher.datasets.length} datasets on the IATI Registry linked to your account. Please go to the <Link to="/publisher/datasets/">datasets page</Link> to view your existing activities.</p>
                                :
                                    <p>Please validate your IATI Registry settings first.</p>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
        )
    }
})

function mapStateToProps(state, props) {

    return {
        oipaUser: state.user && state.user.oipaUser,
        publisher: state.publisher,
        formStatus: state.apiKeyValidationForm,
        navState: state.navState,
    }
}

const PublisherApiKeyStatus = ({ isValidated }) => {
        let validationClass = classNames('validation-status margin-bottom-2',{
            valid: isValidated,
            invalid: !isValidated
        })

        return (
            <div>
                <h6 className="with-tip">Current validation status</h6>
                <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
                <div className={validationClass}>
                    {isValidated ? "VALIDATED" : "NOT VALIDATED"}
                </div>
            </div>
            )
}

export default connect(mapStateToProps, {
    toggleMainMenu,
    fetchPublisher,
    updatePublisher,
    verifyApiKey, 
    removeApiKey, 
    deletePublisher,
    toggleMainMenu,
})(PublisherSettings)


const PublisherOptionsCheck = React.createClass({

    updatePublisherOnclick: function (){
        this.props.updatePublisher({
            ...this.props.publisher,
        autoPublish: !this.props.publisher.autoPublish
        })
    },

    render: function () {

        let autoPublishValue = this.props.publisher.autoPublish ? true : false
        let autoPublishName = "Automatically publish activities to the IATI registry"

        return (

            <div className="margin-bottom-2">
                <h6 className="with-tip">Publishing options</h6>
                <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
                <div>
                    <input type="checkbox" checked={autoPublishValue} />
                    <label onClick={this.updatePublisherOnclick}>{autoPublishName}</label>
                </div>
            </div>
        )
    }
})

class PublisherApiKeyUnlink extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { removeApiKey, formStatus } = this.props

        const fetching = formStatus.fetchingResponse

        return (
            <button
                className="button alert"
                onClick={removeApiKey}
                disabled={fetching}
            >{ fetching ? "Unlinking..." : "Unlink API Key" }</button>
            
        )
    }
}

const PublisherApiKeyForm = React.createClass({

    getInitialState: function () {
        return {
            userId: '',
            apiKey: '',
            userIdError: false,
            userIdErrorPopup: false,
            apiKeyError: false,
            apiKeyErrorPopup: false,
        }
    },

    componentWillReceiveProps(nextProps){
        if (nextProps.formStatus && nextProps.formStatus.message && typeof nextProps.formStatus.message.error !== 'undefined') {
            this.setState({
                userIdError: nextProps.formStatus.message.error.type === 'user_id',
                userIdErrorPopup: nextProps.formStatus.message.error.type === 'user_id',
                apiKeyError: nextProps.formStatus.message.error.type === 'api_key',
                apiKeyErrorPopup: nextProps.formStatus.message.error.type === 'api_key',
            })
        }
        else {
            this.setState({
                userIdError: false,
                userIdErrorPopup: false,
                apiKeyError: false,
                apiKeyErrorPopup: false,
            })
        }
    },

    handleSubmit: function (e) {
        e.preventDefault()

        this.props.verifyApiKey(this.state.userId, this.state.apiKey)
    },

    handleChangeUserId: function(e){
        this.setState({userId: e.target.value})
    },

    handleChangeApiKey: function(e){
        this.setState({apiKey: e.target.value})
    },

    closeErrorPopup: function(type){
        if (type === 'userId') {
            this.setState({
                userIdErrorPopup: false,
            })
        }
        if (type === 'apiKey') {
            this.setState({
                apiKeyErrorPopup: false,
            })
        }
    },

    render: function () { 
        const { isValidated, formStatus } = this.props

        const fetching = formStatus.fetchingResponse

        const buttonTxt = fetching ? "Validating..." : "Validate"

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="margin-bottom-1">
                    <div className="row">
                        <div className="columns medium-4">
                            <h6 className="with-tip">IATI Registry user ID</h6>
                            <Tooltip className="inline" tooltip="Use: zimmzimm"><i className="material-icons">info</i></Tooltip>
                            <input placeholder="User ID" type="text" value={this.state.userId} onChange={this.handleChangeUserId} className={this.state.userIdError && 'has-errors'} disabled={isValidated}/>
                            <ReactCSSTransitionGroup transitionName="fade-slow" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                {this.state.userIdErrorPopup && <span className="form-error is-visible" onClick={this.closeErrorPopup.bind(null, 'userId')}>This field is invalid <i className="material-icons">close</i></span>}
                            </ReactCSSTransitionGroup>
                        </div>
                        <div className="columns medium-8">
                            <h6 className="with-tip">IATI Registry API key</h6>
                            <Tooltip className="inline" tooltip="Use: 42664fcd-2494-4bab-92fe-5af6113d55a6"><i className="material-icons">info</i></Tooltip>
                            <input placeholder="API Key" type="text" value={this.state.apiKey} onChange={this.handleChangeApiKey} className={this.state.apiKeyError && 'has-errors'} disabled={isValidated}/>
                            <ReactCSSTransitionGroup transitionName="fade-slow" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                                {this.state.apiKeyErrorPopup && <span className="form-error is-visible" onClick={this.closeErrorPopup.bind(null, 'apiKey')}>This field is invalid <i className="material-icons">close</i></span>}
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                    <input value={buttonTxt} type="submit" className="button" disabled={formStatus.fetchingResponse}/>
                </form>


            </div>
        )
    }
})
