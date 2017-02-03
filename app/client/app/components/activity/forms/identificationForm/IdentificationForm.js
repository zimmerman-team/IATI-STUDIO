import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {renderField, renderSelectField, renderNarrativeFields} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {getActivity, updateActivity, getCodeListItems} from '../../../../actions/activity'
import ActivityTooltip from '../../ActivityTooltip'

const validate = values => {
    const errors = {};
    if (values.activity) {
        const activityData = values.activity;

        if (!activityData.iati_identifier) {
            errors.iati_identifier = 'Required'
        }

        const narratives = (activityData.title && activityData.title.narratives) || [];

        errors.title = {};
        errors.title.narratives = narratives.map(narrative => {
            let narrativeErrors = {};

            if (!narrative.text) {
                narrativeErrors.text = 'Required'
            }

            if (!narrative.language) {
                narrativeErrors.language = {code: 'Required'}
            }

            return narrativeErrors
        });
    }

    return {activity: errors};
};


class IdentificationForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            iatiIdentifier: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getCodeListItems('Language');
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
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

    render() {
        const {submitting, activity, handleSubmit, codeLists, isFetching} = this.props;

        if (isFetching || !activity && !codeLists["Language"]) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <ActivityTooltip
                    text="An IATI Activity"
                />
                <form onSubmit={handleSubmit(this.handleFormSubmit)} name="identification">
                    <div className="columns small-6">
                        <Field
                            name="activity.iati_identifier"
                            type="text"
                            id="iati_identifier"
                            component={renderField}
                            label="IATI Identifier"
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
                        languageOptions={codeLists["Language"]}
                        narrativeLabel={false}
                        textName="textTitle"
                        textLabel="Title"
                    />
                    <div className="columns small-12">
                        <button className="button" type="submit" disabled={submitting}>
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
    const isFetching = state.activity.isFetching;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];

    return {
        isFetching: isFetching,
        submitting: state.activity.submitting,
        activity: state.activity.activity,
        codeLists: state.codeLists,
        initialValues: {"activity": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

IdentificationForm = connect(mapStateToProps, {
    getActivity,
    updateActivity,
    getCodeListItems
})(IdentificationForm);

export default withRouter(IdentificationForm)
