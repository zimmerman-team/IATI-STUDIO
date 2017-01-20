import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
    getCodeListItems,
    getHumanitarianScopes,
    createHumanitarianScope,
    updateHumanitarianScope,
    deleteHumanitarianScope
} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {humanitarianScopesSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderHumanitarianScopeForm = ({fields, vocabularyOptions, scopeOptions, languageOptions, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }
    return (
        <div>
            {fields.map((humanitarianScope, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${humanitarianScope}.type[code]`}
                                textName={`${humanitarianScope}.type[code]`}
                                label="Type"
                                selectOptions={scopeOptions}
                                defaultOption="Select one of the following options"
                            />
                            <Field
                                component={renderSelectField}
                                name={`${humanitarianScope}.vocabulary[code]`}
                                textName={`${humanitarianScope}.vocabulary[code]`}
                                label="Vocabulary"
                                selectOptions={vocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${humanitarianScope}vocabulary_uri`}
                                    type="text"
                                    component={renderField}
                                    label="Vocabulary URI"
                                />
                            </div>
                            <div className="columns small-6">
                                <Field
                                    name={`${humanitarianScope}code`}
                                    type="number"
                                    component={renderField}
                                    label="Code"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${humanitarianScope}.narratives`}
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
    if (!values.code) {
        errors.code = 'Required'
    }

    return errors
};

class HumanitarianScopeForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit classification's humanitarian data.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        const humanitarianScopes = formData.humanitarian_scope;

        handleSubmit(
            publisher.id,
            'humanitarian_scope',
            activityId,
            data,
            humanitarianScopes,
            this.props.createHumanitarianScope,
            this.props.updateHumanitarianScope,
            this.props.deleteHumanitarianScope,
        )
        this.props.router.push(`/publisher/activities/${this.props.activityId}/financial/financial`);
    }

    componentWillMount() {
        this.props.getCodeListItems('HumanitarianScopeType');
        this.props.getCodeListItems('HumanitarianScopeVocabulary');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('humanitarianScopes', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`humanitarian_scope[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('humanitarian_scope', i)
            }
        }

        if ((nextProps.publisher && nextProps.publisher.id) && (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher
                || !(this.props.data && this.props.data.length))) {
            this.props.getHumanitarianScopes(nextProps.publisher.id, nextProps.activityId)
        }
    }


    render() {
        const {codelists, handleSubmit, submitting, activityId} = this.props;

        if (!codelists['HumanitarianScopeType'] || !codelists['HumanitarianScopeVocabulary'] || !codelists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Humanitarian Scope</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="humanitarian_scope"
                        component={renderHumanitarianScopeForm}
                        vocabularyOptions={codelists["HumanitarianScopeVocabulary"]}
                        scopeOptions={codelists["HumanitarianScopeType"]}
                        languageOptions={codelists["Language"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/classifications/country`}>Back to
                            Country</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Financial
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const humanitarian_scope = humanitarianScopesSelector(state);

    return {
        data: humanitarian_scope,
        codelists: state.codelists,
        initialValues: {"humanitarian_scope": humanitarian_scope},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

HumanitarianScopeForm = reduxForm({
    form: 'classifications-humanitarian-scope',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(HumanitarianScopeForm);


HumanitarianScopeForm = connect(mapStateToProps, {
    getCodeListItems, getHumanitarianScopes, createHumanitarianScope, updateHumanitarianScope, deleteHumanitarianScope
})(HumanitarianScopeForm);

export default withRouter(HumanitarianScopeForm);
