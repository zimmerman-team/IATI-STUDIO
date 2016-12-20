import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import { Link } from 'react-router';
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import { getCodeListItems, getDescriptions, createDescription, updateDescription, deleteDescription } from '../../../../actions/activity'
import { withRouter } from 'react-router'

const renderDescriptionTypeSelect = ({name, label, meta: {touched, error}}) => (
    <div className="columns small-6">
        <div>
            <label>{label}</label>
            <div>
                <Field name={name} component="select">
                    <option></option>
                    <option value="1">General</option>
                </Field>
            </div>
            {touched && error && <span className="error">{error}</span>}
        </div>
    </div>
);

const renderDescription = ({fields, languageOptions, meta: {touched, error}}) => (
    <div>
        {fields.map((description, index) =>
            <div className="field-list" key={index}>
                <div className="row no-margin">
                    <Field
                        name={`${description}.type[code]`}
                        component={renderDescriptionTypeSelect}
                        label="Type"
                    />
                    <hr/>
                    <FieldArray
                        name={`${description}.additionalTitles`}
                        component={renderNarrativeFields}
                        languageOptions={languageOptions}
                        textName={`${description}.narrativeText`}
                        textLabel="Title"
                    />
                </div>
            </div>
            )}
            <div className="columns">
                <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
                <button
                    type="button"
                    title="Remove Title"
                    className="control-button remove float-right"
                    onClick={() => fields.pop()}>Delete
                </button>
                {touched && error && <span className="error">{error}</span>}
            </div>
        </div>
);

const validate = (values, dispatch) => {
    const errors = {};
    // dispatch.dispatch(validateForm());   @TODO for async validation

    console.log('validating...');
    console.log(values);

    if (!values.type) {
        const descriptionTypeObj = {};
        descriptionTypeObj.code = 'Required';
        errors.type = descriptionTypeObj
    }

    if (!values.textTitle) {
        errors.textTitle = 'Required';
    }

    if (!values.titleLanguage) {
        const typeLanguageObj = {};
        typeLanguageObj.code = 'Required';
        errors.titleLanguage = typeLanguageObj
    }

    if (values.additionalTitles) {
        const narrativeArrayErrors = [];

        values.additionalTitles.forEach((title, titleIndex) => {
            const titleErrors = {};
            if (!title || !title.text) {
                titleErrors.text = 'Required';
                narrativeArrayErrors[titleIndex] = titleErrors
            }
            if (!title || !title.language) {
                const codeObj = {};
                codeObj.code = 'Required';
                titleErrors.language = codeObj;
                narrativeArrayErrors[titleIndex] = titleErrors
            }
        });

        if (narrativeArrayErrors.length) {
            errors.additionalTitles = narrativeArrayErrors
        }
    }

    return errors
};

class BasicInformationDescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit basic information's description data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        console.log(formData);
        formData.forEach(description => {
            this.props.createDescription(formData, this.props.activity)
        })

        this.props.router.push(`/publisher/activities/${activityId}/basic-info/status`)
    }

    componentWillMount() {
        this.props.getCodeListItems('DescriptionType');
        this.props.getCodeListItems('Language');
        this.props.getDescriptions(this.props.activityId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== nextProps.activityId) {
            this.props.getActivity(nextProps.activityId)
        }
    }

    render() {
        const {data, codelists, handleSubmit, submitting, previousPage} = this.props;

        if (!data || !codelists.DescriptionType || !codelists.Language) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Descriptions</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                        <i className="material-icons">info</i>
                    </Tooltip>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <FieldArray
                            name="descriptions"
                            component={renderDescription}
                            languageOptions={codelists["Language"]}
                        />

                    <div className="columns small-12">
                        <Link className="button" to="/publisher/activity/identification/identification">Back to identification</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Status
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}


BasicInformationDescriptionForm = reduxForm({
    form: 'basic-info-description',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(BasicInformationDescriptionForm);

function mapStateToProps(state) {
    return {
        // initialValues: state.activity.descriptions,
        data: state.activity.descriptions,
        codelists: state.codelists,
    }
}

BasicInformationDescriptionForm = connect(mapStateToProps, {
    getCodeListItems,
    getDescriptions,
    createDescription,
    updateDescription,
    deleteDescription
})(BasicInformationDescriptionForm);
export default withRouter(BasicInformationDescriptionForm)

