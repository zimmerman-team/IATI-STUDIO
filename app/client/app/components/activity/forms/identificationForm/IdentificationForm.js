import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Field, reduxForm} from 'redux-form'
import {renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {getActivity, updateActivity} from '../../../../actions/activity'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ActivityTooltip from '../../ActivityTooltip'

const validate = values => {
    const errors = {};

    if (!values.iati_identifier) {
        errors.iati_identifier = 'Required'
    }

    if (!values.hierarchy) {
        errors.hierarchy = 'Required'
    }

    return errors
};


class IdentificationForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            iatiIdentifier: 0
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createActivity = this.createActivity.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== 'identification') {
            if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
                this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
            }
        }
    }

    /*
     * Submit identification data and redirect
     * to basic information form.
     */
    handleFormSubmit(data) {
        const {activityId, publisher} = this.props;

        this.props.updateActivity(publisher.id, {
            id: activityId,
            ...data.activity,
        });

        this.props.router.push(`/publisher/activities/${activityId}/basic-info/description`)
    }

    createActivity() {
        // just generate something random
        if(this.state.iatiIdentifier !== 0){
            this.props.createActivity(this.props.publisher.id, {
                iati_identifier: this.state.iatiIdentifier,
            }).then((action) => {
                this.props.router.push(`/publisher/activities/${action.response.result}/identification`)
            })
        }
    }

    render() {
        const {submitting, activity, handleSubmit, activityId} = this.props;
        const blankIdentificationForm = (activityId !== 'identification');

        if (blankIdentificationForm && !activity) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <ActivityTooltip
                    text="An IATI Activity"
                />
                {!blankIdentificationForm ?
                    <div className="createActivityModal">
                        <ReactCSSTransitionGroup transitionName="fade-slow" transitionEnterTimeout={400}
                                                 transitionLeaveTimeout={400}>
                            <div className="modal-overlay createActivityModalOverlay"></div>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup transitionName="zoom" transitionEnterTimeout={600}
                                                 transitionLeaveTimeout={600}>
                            <div className="modal-container createActivityModal">
                                <div className="modal ignore-react-onclickoutside">
                                    <div className="modal-inside">
                                        <h6>Create an activity</h6>
                                        <p>Fill in a unique IATI identifier</p>
                                        <input name="createIatiIdentifier"
                                               type="text"
                                               onChange={(e) => this.setState({iatiIdentifier: e.target.value})}
                                               value={this.state.iatiIdentifier}
                                               required="required"
                                        />
                                        <button className="button" type="submit" onClick={this.createActivity}>
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                    : ''}
                <form onSubmit={handleSubmit(this.handleFormSubmit)} name="identification">
                    <div className="columns small-6">
                        <Field
                            name="activity.iati_identifier"
                            type="text"
                            id="iati_identifier"
                            component={renderField}
                            label="IATI Identifier"
                            disabled={!blankIdentificationForm}
                        />
                    </div>
                    <div className="columns small-6">
                        <Field
                            component={renderSelectField}
                            name="activity.hierarchy"
                            textName="activity.hierarchy"
                            label="Hierarchy"
                            selectOptions={[{code: "1", name: "1"}, {code: "2", name: "2"}]}
                            defaultOption="Select one of the following options"
                        />
                    </div>
                    <div className="columns small-12">
                        <button className="button" type="submit" disabled={submitting || !blankIdentificationForm}>
                            Continue to basic information
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

IdentificationForm = reduxForm({
    form: 'identification',     // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(IdentificationForm);


import {publisherSelector} from '../../../../reducers/createActivity'

function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];

    return {
        submitting: state.activity.submitting,
        activity: state.activity.activity,
        initialValues: {"activity": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

IdentificationForm = connect(mapStateToProps, {
    getActivity,
    updateActivity,
})(IdentificationForm);

export default withRouter(IdentificationForm)
