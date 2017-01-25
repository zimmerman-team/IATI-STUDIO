import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {renderField, renderSelectField, renderNarrativeFields} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {getActivity, updateActivity} from '../../../../actions/activity'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ActivityTooltip from '../../ActivityTooltip'

const validate = values => {
    const activity = {};
    if (values.activity) {
        const activityData = values.activity;

        if (!activityData.iati_identifier) {
            activity.iati_identifier = 'Required'
        }
    }

    return {activity};
};


class IdentificationForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            iatiIdentifier: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createActivity = this.createActivity.bind(this);
    }

    componentWillMount() {
        this.props.getCodeListItems('Language');
        if (this.props.publisher && this.props.activityId !== 'identification') {
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillUpdate(nextProps) {
        if ((this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) && this.props.activityId !== 'identification') {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
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
        }).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/basic-info/description`)
            }
        });


    }

    createActivity() {
        // just generate something random
        if (this.state.iatiIdentifier !== '') {
            this.props.createActivity(this.props.publisher.id, {
                iati_identifier: this.state.iatiIdentifier,
            }).then((action) => {
                this.props.router.push(`/publisher/activities/${action.response.result}/identification`)
            });
        }
    }

    render() {
        const {submitting, activity, handleSubmit, activityId, codelists} = this.props;
        const blankIdentificationForm = (activityId !== 'identification');

        if (blankIdentificationForm && !activity &&  !codelists["Language"]) {
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
                    <Field
                        component={renderSelectField}
                        name="activity.hierarchy"
                        textName="activity.hierarchy"
                        label="Hierarchy"
                        selectOptions={[{code: "1", name: "1"}, {code: "2", name: "2"}]}
                        defaultOption="Select one of the following options"
                    />
                    <FieldArray
                        name="activity.title.narratives"
                        component={renderNarrativeFields}
                        languageOptions={codelists["Language"]}
                        narrativeLabel={false}
                        textName="textTitle"
                        textLabel="Title"
                    />
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
        codelists: state.codelists,
        initialValues: {"activity": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

IdentificationForm = connect(mapStateToProps, {
    getActivity,
    updateActivity,
})(IdentificationForm);

export default withRouter(IdentificationForm)
