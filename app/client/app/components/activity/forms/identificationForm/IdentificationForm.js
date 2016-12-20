import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields} from '../../helpers/FormHelper'
import { GeneralLoader } from '../../../general/Loaders.react.jsx'

import ActivityTooltip from '../../ActivityTooltip'

const validate = values => {
    const errors = {};

    if (!values.activityIdentifier) {
        errors.activityIdentifier = 'Required'
    }

    if (!values.textTitle) {
        errors.textTitle = 'At least one title must be entered'
    }

    if (!values.titleLanguage) {
        const titleLanguageCodeObj = {};
        titleLanguageCodeObj.code = 'Required';
        errors.titleLanguage = titleLanguageCodeObj
    }

    if (!values.iati_identifier) {
        errors.iati_identifier = 'Required'
    }

    if (values.additionalTitles) {
        const titlesArrayErrors = [];

        values.additionalTitles.forEach((title, titleIndex) => {
            const titleErrors = {};
            if (!title || !title.text) {
                titleErrors.text = 'Required';
                titlesArrayErrors[titleIndex] = titleErrors
            }
            if (!title || !title.language) {
                const codeObj = {};
                codeObj.code = 'Required';
                titleErrors.language = codeObj;
                titlesArrayErrors[titleIndex] = titleErrors
            }
        });

        if (titlesArrayErrors.length) {
            errors.additionalTitles = titlesArrayErrors
        }
    }

    // if (/[^\/\&\|\?]+/g.test(values.iati_identifier)) {
    //   errors.iati_identifier = 'Invalid data entered'
    // }

    if (!values.hierarchy) {
        errors.hierarchy = 'Required'
    }

    return errors
};


class IdentificationForm extends PureComponent {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getCodeListItems('Language');
        this.props.getActivity(this.props.activityId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== nextProps.activityId) {
            this.props.getActivity(nextProps.activityId)
        }
    }

    /*
     * Submit identification data and redirect
     * to basic information form.
     */
    handleFormSubmit(data) {
        const { activityId, tab, subTab } = this.props

        console.log(data);

        this.props.updateActivity({
            id: activityId,
            ...data,
        })
        this.props.router.push(`/publisher/activities/${activityId}/basic-info`)
    }

    render() {
        const {submitting, activity, codelists, handleSubmit } = this.props;

        if (!activity || !codelists["Language"]) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <ActivityTooltip
                    text="An IATI Activity"
                />
                <form onSubmit={handleSubmit(this.handleFormSubmit)} name="identification">
                    <FieldArray
                        name="additionalTitles"
                        component={renderNarrativeFields}
                        languageOptions={codelists["Language"]}
                        narrativeLabel={false}
                        textName="textTitle"
                        textLabel="Title"
                    />
                    <div className="columns small-6">
                        <Field
                            name="iati_identifier"
                            type="text"
                            id="iati_identifier"
                            component={renderField}
                            label="IATI Identifier"
                        />
                    </div>
                    <div className="columns small-6">
                        <Field
                            name="hierarchy"
                            type="number"
                            id="hierarchy"
                            component={renderField}
                            label="Hierarchy"
                        />
                    </div>
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
    validate
})(IdentificationForm);

import { 
    getActivity,
    updateActivity,
    getCodeListItems,
} from '../../../../actions/activity'


function mapStateToProps(state, props) {
    return {
        submitting: state.activity.submitting,
        activity: state.activity.activity,
        initialValues: state.activity.activity,
        codelists: state.codelists,
    }
}

IdentificationForm = connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
    updateActivity,
})(withRouter(IdentificationForm));
export default IdentificationForm;
