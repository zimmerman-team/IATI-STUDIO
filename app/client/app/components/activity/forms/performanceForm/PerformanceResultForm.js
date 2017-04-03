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
    deletePerformanceResult,
    createResultIndicator,
    updateResultIndicator,
    deleteResultIndicator,
} from '../../../../actions/activity'
import {publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const renderLocation = ({fields, meta: {touched, dirty, error}}) => {
    if (fields && !fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((location, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="columns"><h6>Location</h6></div>
                         <div className="row no-margin">
                             <div className="columns">
                                <Field
                                    name={`${location}.ref`}
                                    type="text"
                                    component={renderField}
                                    label="Location Ref"
                                />
                            </div>
                         </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Location"
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


const renderDimension = ({fields, meta: {touched, dirty, error}}) => {
    if (fields && !fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((dimension, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="columns"><h6>Dimension</h6></div>
                         <div className="row no-margin">
                             <div className="columns small-6">
                                <Field
                                    name={`${dimension}.name`}
                                    type="text"
                                    component={renderField}
                                    label="Dimension Name"
                                />
                            </div>
                             <div className="columns small-6">
                                <Field
                                    name={`${dimension}.value`}
                                    type="text"
                                    component={renderField}
                                    label="Dimension Value"
                                />
                            </div>
                         </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Dimension"
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

const renderPeriodTarget = ({name, textLabel, languageOptions, meta: {touched, error}}) => (
    <div>
        <div className="columns"><h6>{ textLabel }</h6></div>
        <div className="columns">
            <Field
                name={`${name}.value`}
                type="text"
                component={renderField}
                label="Value"
            />
        </div>
        <FieldArray
            component={renderLocation}
            name={`${name}.locations`}
            textName={`${name}.locations`}
            textLabel="Locations"
        />
        <FieldArray
            component={renderDimension}
            name={`${name}.dimensions`}
            textName={`${name}.dimensions`}
            textLabel="Dimensions"
        />
        <FieldArray
            name={`${name}.comment[narratives]`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textLabel="Comment"
            narrativeLabel={false}
        />
        {touched && error && <span className="error">{error}</span>}
    </div>
);

const renderPeriodActual = ({name, textLabel, languageOptions, meta: {touched, error}}) => (
    <div>
        <div className="columns"><h6>{ textLabel }</h6></div>
        <div className="columns">
            <Field
                name={`${name}.value`}
                type="text"
                component={renderField}
                label="Value"
            />
        </div>
        <FieldArray
            component={renderLocation}
            name={`${name}.locations`}
            textName={`${name}.locations`}
            textLabel="Locations"
        />
        <FieldArray
            component={renderDimension}
            name={`${name}.dimensions`}
            textName={`${name}.dimensions`}
            textLabel="Dimensions"
        />
        <FieldArray
            name={`${name}.comment[narratives]`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textLabel="Comment"
            narrativeLabel={false}
        />
        {touched && error && <span className="error">{error}</span>}
    </div>
);


const renderPeriod = ({fields, languageOptions, meta: {touched, dirty, error}}) => {
    if (fields && !fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((period, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="columns"><h6>Period</h6></div>
                         <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${period}.period_start`}
                                    type="date"
                                    component={renderField}
                                    label="Period Start"
                                />
                                <Field
                                    name={`${period}.period_end`}
                                    type="date"
                                    component={renderField}
                                    label="Period End"
                                />
                            </div>
                         </div>
                         <div className="row no-margin">
                             <div className="columns">
                                 <Field
                                     name={`${period}.target`}
                                     component={renderPeriodTarget}
                                     textLabel="Target"
                                     languageOptions={languageOptions}
                                 />
                            </div>
                         </div>
                         <div className="row no-margin">
                             <div className="columns">
                                 <Field
                                     name={`${period}.actual`}
                                     component={renderPeriodActual}
                                     textLabel="Actual"
                                     languageOptions={languageOptions}
                                 />
                            </div>
                         </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Period"
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

const renderReference = ({fields, indicatorVocabularyOptions, meta: {touched, dirty, error}}) => {
    if (fields && !fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((reference, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="columns"><h6>Reference</h6></div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${reference}.vocabulary[code]`}
                                textName={`${reference}vocabulary.code`}
                                label="Vocabulary"
                                selectOptions={indicatorVocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                         <div className="row no-margin">
                            <div className="columns small-6">
                                 <Field
                                     name={`${reference}.code`}
                                     type="text"
                                     component={renderField}
                                     label="Code"
                                 />
                            </div>
                            <div className="columns small-6">
                                 <Field
                                     name={`${reference}.indicatorUri`}
                                     type="url"
                                     component={renderField}
                                     label="Indicator uri"
                                 />
                             </div>
                         </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Reference"
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

const renderBaseline = ({name, textLabel, languageOptions, meta: {touched, error}}) => (
    <div>
        <div className="columns"><h6>{ textLabel }</h6></div>
        <div className="columns small-6">
            <Field
                name={`${name}.year`}
                type="text"
                component={renderField}
                label="Year"
            />
        </div>
        <div className="columns small-6">
            <Field
                name={`${name}.value`}
                type="text"
                component={renderField}
                label="Value"
            />
        </div>
        <FieldArray
            name={`${name}.comment[narratives]`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textLabel="Comment"
            narrativeLabel={false}
        />
        {touched && error && <span className="error">{error}</span>}
    </div>
);

const renderIndicator = ({fields, languageOptions, indicatorMeasureOptions, indicatorVocabularyOptions, meta: {touched, dirty, error}}) => {
    if (fields && !fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((indicator, index) =>
                <div key={index}>
                    <div className="field-list" key={index}>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${indicator}.measure[code]`}
                                textName={`${indicator}measure.code`}
                                label="Measure"
                                selectOptions={indicatorMeasureOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${indicator}.ascending`}
                                textName={`${indicator}ascending`}
                                label="Ascending"
                                selectOptions={[{code: 'True', name: 'True'}, {code: 'False', name: 'False'}]}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${indicator}.title[narratives]`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textLabel="Title"
                                narrativeLabel={false}
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${indicator}.description[narratives]`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textLabel="Description"
                                narrativeLabel={false}
                            />
                        </div>
                         <div className="row no-margin">
                             <div className="columns">
                                 <FieldArray
                                     component={renderReference}
                                     name={`${indicator}.reference`}
                                     textName={`${indicator}.reference`}
                                     textLabel="Reference"
                                     indicatorVocabularyOptions={indicatorVocabularyOptions}
                                     defaultOption="Select one of the following options"
                                 />
                             </div>
                         </div>
                         <div className="row no-margin">
                             <div className="columns">
                                 <Field
                                     name={`${indicator}.baseline`}
                                     component={renderBaseline}
                                     textLabel="Baseline"
                                     languageOptions={languageOptions}
                                 />
                            </div>
                         </div>
                         <div className="row no-margin">
                             <div className="columns">
                                 <FieldArray
                                     component={renderPeriod}
                                     name={`${indicator}.period`}
                                     textName={`${indicator}.period`}
                                     textLabel="Period"
                                     languageOptions={languageOptions}
                                     defaultOption="Select one of the following options"
                                 />
                             </div>
                         </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Indicator"
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
                                selectOptions={[{code: 'true', name: 'True'}, {code: 'false', name: 'False'}]}
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
                         <div className="row no-margin">
                             <FieldArray
                                 component={renderIndicator}
                                 name={`${result}.indicators`}
                                 textName={`${result}.indicators`}
                                 textLabel="Measure"
                                 indicatorMeasureOptions={indicatorMeasureOptions}
                                 indicatorVocabularyOptions={indicatorVocabularyOptions}
                                 defaultOption="Select one of the following options"
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


const validate = values => {
    let errors = {};

    const results = values.results || [];

    errors.results = results.map(resultData => {
        let resultErrors = {};

        if (!resultData.type) {
            resultErrors.type = {code:'Required'}
        }

        return resultErrors
    });

    return errors
};

class PerformanceResultForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    saveIndicators(resultId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        console.log(resultId, prevFormData, formData);

        handleSubmit(
            publisher.id,
            'results.indicators',
            [ activityId, resultId],
            prevFormData,
            formData,
            this.props.createResultIndicator,
            this.props.updateResultIndicator,
            this.props.deleteResultIndicator,
            'result'
        ).then((result) => {
            console.log('in indicator callback...');
            console.log(result);
        })
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

        console.log(lastResults, results);

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
            // if (!result.error) {
            //     this.props.router.push(`/publisher/activities/${activityId}/performance/comment`)
            // }

            const indicatorPromises = result.map((action, i) => {
                let prevIndicators = []
                if (lastResults && lastResults[i].indicators) {
                    prevIndicators = lastResults[i].indicators
                }
                const indicators = results[i].indicators

                console.log(prevIndicators, indicators);

                return this.saveIndicators(
                    action.response.result,
                    prevIndicators,
                    indicators
                )
            })

            return Promise.all(indicatorPromises)


        }).catch((e) => {
            console.log(e)
        })
    }

    componentWillMount() {
        this.props.getCodeListItems('ResultType');
        this.props.getCodeListItems('Language');
        this.props.getCodeListItems('IndicatorMeasure');
        this.props.getCodeListItems('IndicatorVocabulary');
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {handleSubmit, submitting, codeLists, activityId, isFetching} = this.props;

        if (isFetching || !codeLists.ResultType || !codeLists.Language || !codeLists.IndicatorMeasure || !codeLists.IndicatorVocabulary) {
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
                        resultOptions={codeLists.ResultType}
                        languageOptions={codeLists.Language}
                        indicatorMeasureOptions={codeLists.IndicatorMeasure}
                        indicatorVocabularyOptions={codeLists.IndicatorVocabulary}
                    />
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
    const isFetching = state.activity.isFetching;

    return {
        data: results,
        isFetching: isFetching,
        activity: state.activity.activity,
        codeLists: state.codeLists,
        initialValues: {"results": results},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

PerformanceResultForm = connect(mapStateToProps, {
    getCodeListItems,
    createPerformanceResult,
    updatePerformanceResult,
    deletePerformanceResult,
    createResultIndicator,
    updateResultIndicator,
    deleteResultIndicator,
})(PerformanceResultForm);
export default withRouter(PerformanceResultForm);

