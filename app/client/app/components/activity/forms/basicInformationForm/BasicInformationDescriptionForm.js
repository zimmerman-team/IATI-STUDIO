import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import { Link } from 'react-router';
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import { getCodeListItems, getDescriptions, createDescription, updateDescription, deleteDescription } from '../../../../actions/activity'
import { withRouter } from 'react-router'

import uuidV4 from 'uuid/v4'

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
                        name={`${description}.narratives`}
                        component={renderNarrativeFields}
                        languageOptions={languageOptions}
                    />
                </div>
            </div>
            )}
            <div className="columns">
                <button className="control-button add" type="button" onClick={() => fields.push({ _id: uuidV4() })}>Add More</button>
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
    let errors = {};
    // dispatch.dispatch(validateForm());   @TODO for async validation

    const descriptions = values.descriptions || []

    errors.descriptions = descriptions.map(description => {
        let descriptionErrors = {}

        if (!description.type) {
            descriptionErrors.type = { code: 'Required' }
        }

        const narratives = description.narratives || []

        descriptionErrors.narratives = narratives.map(narrative => {
            let narrativeErrors = {}

            if (!narrative.text) {
                narrativeErrors.text = 'Required'
            }

            if (!narrative.language) {
                narrativeErrors.language = { code: 'Required' }
            }

            return narrativeErrors
        })

        if (!narratives.length) {
            descriptionErrors.narratives._error = 'At least one narrative must be entered'
        }

        return descriptionErrors
    })

    if (!descriptions.length) {
        errors.descriptions._error = 'At least one description must be entered'
    }

    return errors
};

class BasicInformationDescriptionForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {}
    }

    /**
     * Submit basic information's description data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const { activityId, initialValues, tab, subTab } = this.props
        const { lastSubmitted } = this.state

        const lastDescriptions = (lastSubmitted && lastSubmitted.descriptions) || initialValues.descriptions
        const descriptions = formData.descriptions

        console.log("SEPARATOR...");
        console.log(descriptions, lastDescriptions);

        const oldIds = lastDescriptions.map(d => d.id).filter(d => d !== undefined)
        const newIds = descriptions.map(d => d.id).filter(d => d !== undefined)

        console.log(oldIds, newIds);

        const toCreate = _.filter(descriptions, (d) => !('id' in d))
        const toUpdate = _.filter(descriptions, (d) => 'id' in d)
        const toDelete = _.difference(oldIds, newIds)

        console.log(toCreate, toUpdate, toDelete);

        const createPromises = toCreate.map(description => (
            this.props.createDescription(activityId, {
                activity: activityId,
                ...description,
            })
        ))

        toUpdate.forEach(description => {
            this.props.updateDescription(activityId, description.id, {
                activity: activityId,
                    ...description,
            })
        })

        toDelete.forEach(id => {
            this.props.deleteDescription(activityId, id)
        })

        Promise.all(createPromises).then(values => {
            console.log(values);
        })

        this.setState({ lastSubmitted: formData })

        // this.props.router.push(`/publisher/activities/${activityId}/basic-info/status`)
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

function mapStateToProps(state, props) {
    console.log('rendering...');
    return {
        initialValues: state.activity.descriptions ? {
            descriptions: state.activity.descriptions,
        } : null,
        data: state.activity.descriptions,
        codelists: state.codelists,
        ...props,
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

