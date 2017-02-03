import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {Link} from 'react-router';
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {
    getCodeListItems,
    getDescriptions,
    createDescription,
    updateDescription,
    deleteDescription
} from '../../../../actions/activity'
import {descriptionsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

import handleSubmit from '../../helpers/handleSubmit'

const renderDescription = ({fields, languageOptions, descriptionTypes, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((description, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${description}.type[code]`}
                                textName={`${description}type.code`}
                                label="Type"
                                selectOptions={descriptionTypes}
                                defaultOption="Select one of the following options"
                            />
                            <FieldArray
                                name={`${description}.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                            />
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Title"
                            className="control-button remove float-right"
                            onClick={() => fields.remove(index)}>Delete
                        </button>
                        {touched && error && <span className="error">{error}</span>}
                    </div>
                    <br/><br/>
                </div>
            )}
        </div>
    )
};

const validate = (values, dispatch) => {
    let errors = {};

    const descriptions = values.descriptions || []

    errors.descriptions = descriptions.map(description => {
        let descriptionErrors = {}

        if (!description.type) {
            descriptionErrors.type = {code: 'Required'}
        }

        const narratives = description.narratives || []

        descriptionErrors.narratives = narratives.map(narrative => {
            let narrativeErrors = {}

            if (!narrative.text) {
                narrativeErrors.text = 'Required'
            }

            if (!narrative.language) {
                narrativeErrors.language = {code: 'Required'}
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
    }

    /**
     * Submit basic information's description data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data} = this.props;
        const descriptions = formData.descriptions;

        handleSubmit(
            publisher.id,
            'descriptions',
            activityId,
            data,
            descriptions,
            this.props.createDescription,
            this.props.updateDescription,
            this.props.deleteDescription,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/basic-info/status`)
            }
        });
    }

    componentWillMount() {
        this.props.getCodeListItems('DescriptionType');
        this.props.getCodeListItems('Language');
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getDescriptions(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('descriptions', newData);

            // change each item 
            newData.forEach((d, i) => this.props.change(`descriptions[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('descriptions', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getDescriptions(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {data, codeLists, handleSubmit, submitting, activityId, isFetching} = this.props;

        if (!data || isFetching || !codeLists.DescriptionType || !codeLists.Language) {
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
                            languageOptions={codeLists["Language"]}
                            descriptionTypes={codeLists["DescriptionType"]}
                        />

                        <div className="columns small-12">
                            <Link className="button"
                                  to={`/publisher/activities/${activityId}/identification/identification`}>Back to
                                identification</Link>
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

function mapStateToProps(state, props) {
    const descriptions = descriptionsSelector(state);
    const isFetching = state.activity.isFetching;
    return {
        data: descriptions,
        isFetching: isFetching,
        codeLists: state.codeLists,
        initialValues: {"descriptions": descriptions},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

BasicInformationDescriptionForm = reduxForm({
    form: 'basic-info-description',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(BasicInformationDescriptionForm);


BasicInformationDescriptionForm = connect(mapStateToProps, {
    getCodeListItems,
    getDescriptions,
    createDescription,
    updateDescription,
    deleteDescription
})(BasicInformationDescriptionForm);

export default withRouter(BasicInformationDescriptionForm)

