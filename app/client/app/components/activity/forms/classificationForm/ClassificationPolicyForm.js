import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {getCodeListItems, getPolicy, createPolicy, updatePolicy, deletePolicy} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {policySelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter, Link} from 'react-router'

const renderPolicy = ({fields, languageOptions, policyMakerOptions, policySignificanceOptions, policyVocabularyOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({});
    }

    return (
        <div>
            {fields.map((policy, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${policy}.vocabulary[code]`}
                                textName={`${policy}.vocabulary[code]`}
                                label="Vocabulary"
                                selectOptions={policyVocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${policy}.vocabulary_uri`}
                                    type="text"
                                    component={renderField}
                                    label="Vocabulary URI"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${policy}.significance[code]`}
                                textName={`${policy}.significance[code]`}
                                label="Significance"
                                selectOptions={policySignificanceOptions}
                                defaultOption="Select one of the following options"
                            />
                            <Field
                                component={renderSelectField}
                                name={`${policy}.policy_marker[code]`}
                                textName={`${policy}.policy_marker[code]`}
                                label="Policy Marker"
                                selectOptions={policyMakerOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${policy}.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                            />
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button type="button" title="Remove Title" className="control-button remove float-right"
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

const validate = values => {
    const errors = {};

    if (!values.vocabulary_uri) {
        errors.vocabulary_uri = 'Required'
    }

    return errors
};

class PolicyMakerForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit classification's policy data.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        console.log('<<<handleFormSubmit', formData);
        const {activityId, publisher, data} = this.props;
        const policy = formData.policy;

        handleSubmit(
            publisher.id,
            'policy',
            activityId,
            data,
            policy,
            this.props.createPolicy,
            this.props.updatePolicy,
            this.props.deletePolicy,
        );
        this.props.router.push(`/publisher/activities/${this.props.activityId}/classifications/select`);
    }

    componentWillMount() {
        this.props.getCodeListItems('PolicyMarker');
        this.props.getCodeListItems('PolicyMarkerVocabulary');
        this.props.getCodeListItems('PolicySignificance');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('policy', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`policy[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('policy', i)
            }
        }

        if ((nextProps.publisher && nextProps.publisher.id) && (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher
                || !(this.props.data && this.props.data.length))) {
            this.props.getPolicy(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting, activityId} = this.props;

        if (!codelists['PolicyMarker'] || !codelists['PolicyMarkerVocabulary'] || !codelists['PolicySignificance'] || !codelists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Policy Makers</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="policy"
                        component={renderPolicy}
                        narrativeAddMore={false}
                        languageOptions={codelists["Language"]}
                        policyMakerOptions={codelists["PolicyMarker"]}
                        policyVocabularyOptions={codelists["PolicyMarkerVocabulary"]}
                        policySignificanceOptions={codelists["PolicySignificance"]}
                        textName="textPolicyTitle"
                        textLabel="Title"
                    />
                    <div className="row no-margin">
                        <div className="columns small-12">
                            <Link className="button" to={`/publisher/activities/${activityId}/classifications/sector`}>Back to sector</Link>
                            <button className="button float-right" type="submit" disabled={submitting}>
                                Continue to Selection
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    const policy = policySelector(state);

    return {
        data: policy,
        codelists: state.codelists,
        initialValues: {"policy": policy},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

PolicyMakerForm = reduxForm({
    form: 'classifications-policy-maker',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(PolicyMakerForm);

PolicyMakerForm = connect(mapStateToProps, {
    getCodeListItems,
    getPolicy,
    createPolicy,
    updatePolicy,
    deletePolicy
})(PolicyMakerForm);

export default withRouter(PolicyMakerForm);