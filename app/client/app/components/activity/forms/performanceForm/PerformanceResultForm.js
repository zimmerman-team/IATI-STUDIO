import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderSelectField, renderField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router';

import {
    getCodeListItems,
    createPerformanceResult,
    updatePerformanceResult,
    deletePerformanceResult
} from '../../../../actions/activity'
import {publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const renderResult = ({fields, resultOptions, languageOptions, indicatorMeasureOptions, indicatorVocabularyOptions, meta: {touched, dirty, error}}) => {
    if (fields && !fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((result, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${result}.type[code]`}
                                textName={`${result}type.code`}
                                label="Type"
                                selectOptions={resultOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${result}.aggregation_status`}
                                textName={`${result}.aggregation_status`}
                                label="Condition Attached"
                                selectOptions={[{code: '1', name: 'True'}, {code: '0', name: 'False'}]}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${result}.title[narratives]`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textLabel="Title"
                                narrativeLabel={false}
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${result}.description[narratives]`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textLabel="Description"
                                narrativeLabel={false}
                            />
                        </div>
                        {/*
                         <div className="row no-margin">
                         <FieldArray
                         component={renderIndicator}
                         name={`${result}.indicator`}
                         textName={`${result}.indicator`}
                         textLabel="Measure"
                         indicatorMeasureOptions={indicatorMeasureOptions}
                         indicatorVocabularyOptions={indicatorVocabularyOptions}
                         defaultOption="Select one of the following options"
                         />
                         </div>*/}
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

/**
 * Prepare render indicator fields html.
 *
 * @param {object} fields
 * @param {object} indicatorMeasureOptions
 * @param {string} textName
 * @param {string} mainLabel
 * @param touched
 * @param error
 */
export const renderIndicator = ({fields, indicatorVocabularyOptions, indicatorMeasureOptions, textName = "", mainLabel = "", meta: {touched, error}}) => {
    if (fields && !fields.length) {
        fields.push({})
    }
    return (
        <div>
            {fields && fields.map((title, index) =>
                <div key={index}>
                    {mainLabel ? <div className="columns"><h6>{mainLabel}</h6></div> : "Indicator"}
                    <div className="row no-margin">
                        <Field
                            component={renderSelectField}
                            name={`${title}.vocabulary`}
                            textName={`${title}.vocabulary`}
                            label="Vocabulary"
                            selectOptions={indicatorVocabularyOptions}
                            defaultOption="Select one of the following options"
                        />
                    </div>
                    <div className="row no-margin">
                        <Field
                            component={renderSelectField}
                            name={`${title}.indicatorURI`}
                            textName={`${title}.indicatorURI`}
                            label="Indicator URI"
                            selectOptions={indicatorMeasureOptions}
                            defaultOption="Select one of the following options"
                        />
                    </div>

                    <div className="row no-margin">
                        <div className="columns small-centered small-12">
                            <h2 className="page-title">Baseline</h2>
                            <div className="row no-margin">
                                <div className="columns small-6">
                                    <Field
                                        name={`${title}.baseline.year`}
                                        type="text"
                                        component={renderField}
                                        label="Year"
                                    />
                                </div>
                                <div className="columns small-6">
                                    <Field
                                        name={`${textName}.value`}
                                        type="text"
                                        component={renderField}
                                        label="Value"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Title"
                            className="control-button remove float-right"
                            onClick={() => fields.pop()}>Delete
                        </button>
                        {touched && error && <span className="error">{error}</span>}
                    </div>
                </div>
            )}
        </div>
    )
};

const validate = values => {
    const errors = {};

    if (!values.ref) {
        errors.ref = 'Required'
    }

    return errors
};

class PerformanceResultForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit performance's result data and redirect to comment form
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data} = this.props;

        const lastResults = data;
        let results = formData.results;

        handleSubmit(
            publisher.id,
            'results',
            activityId,
            lastResults,
            results,
            this.props.createPerformanceResult,
            this.props.updatePerformanceResult,
            this.props.deletePerformanceResult
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/performance/comment`)
            }
        }).catch((e) => {
            console.log(e)
        })
    }


    componentWillMount() {
        this.props.getCodeListItems('ResultType');
        this.props.getCodeListItems('Language');
        this.props.getCodeListItems('IndicatorMeasure');
        this.props.getCodeListItems('IndicatorVocabulary');
    }

    componentWillReceiveProps(nextProps) {
        //if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher)
        if (this.props.activityId && this.props.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {handleSubmit, submitting, codelists, activityId} = this.props;

        if (!codelists.ResultType || !codelists.Language || !codelists.IndicatorMeasure || !codelists.IndicatorVocabulary) {
            return <GeneralLoader/>
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Result</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="results"
                        component={renderResult}
                        resultOptions={codelists.ResultType}
                        languageOptions={codelists.Language}
                        indicatorMeasureOptions={codelists.IndicatorMeasure}
                        indicatorVocabularyOptions={codelists.IndicatorVocabulary}
                    />
                    {/*<div className="field-list">*/}
                    {/*<RenderPerformanceResultForm*/}
                    {/*resultOptions={codelists.ResultType}*/}
                    {/*languageOptions={codelists.Language}*/}
                    {/*indicatorMeasureOptions={codelists.IndicatorMeasure}*/}
                    {/*indicatorVocabularyOptions={codelists.IndicatorVocabulary}*/}
                    {/*/>*/}
                    {/*</div>*/}
                    {/*<FieldArray*/}
                    {/*name="additionalHumanitarianScope"*/}
                    {/*component={renderAdditionalRenderPerformanceResultForm}*/}
                    {/*resultOptions={codelists.ResultType}*/}
                    {/*languageOptions={codelists.Language}*/}
                    {/*/>*/}
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/performance/condition`}>
                            Back to performance condition
                        </Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to performance comment
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

PerformanceResultForm = reduxForm({
    form: 'performance-result',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(PerformanceResultForm);

function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let results = currentActivity && currentActivity.results;

    return {
        data: results,
        activity: state.activity.activity,
        codelists: state.codelists,
        initialValues: {"results": results},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

PerformanceResultForm = connect(mapStateToProps, {
    getCodeListItems,
    createPerformanceResult,
    updatePerformanceResult,
    deletePerformanceResult
})(PerformanceResultForm);
export default withRouter(PerformanceResultForm);

