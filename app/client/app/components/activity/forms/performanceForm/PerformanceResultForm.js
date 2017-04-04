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
    createIndicatorPeriod,
    updateIndicatorPeriod,
    deleteIndicatorPeriod,
    createIndicatorReference,
    updateIndicatorReference,
    deleteIndicatorReference,
    createIndicatorTargetLocation,
    updateIndicatorTargetLocation,
    deleteIndicatorTargetLocation,
    createIndicatorActualLocation,
    updateIndicatorActualLocation,
    deleteIndicatorActualLocation,
    createIndicatorTargetDimension,
    updateIndicatorTargetDimension,
    deleteIndicatorTargetDimension,
    createIndicatorActualDimension,
    updateIndicatorActualDimension,
    deleteIndicatorActualDimension,

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
                                    type="number"
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
                type="number"
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
                type="number"
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
                type="number"
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
                        <div className="row no-margin"><h6>Indicators</h6></div>
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
                                     name={`${indicator}.references`}
                                     textName={`${indicator}.references`}
                                     textLabel="References"
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
                                     name={`${indicator}.periods`}
                                     textName={`${indicator}.periods`}
                                     textLabel="Periods"
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
                                 textLabel="Indicators"
                                 languageOptions={languageOptions}
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


    saveTargetLocations(resultId, indicatorId, periodId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId, indicatorId, periodId ],
            prevFormData,
            formData,
            this.props.createIndicatorTargetLocation,
            this.props.updateIndicatorTargetLocation,
            this.props.deleteIndicatorTargetLocation,
            'result_indicator_period'
        ).then((result) => {
            console.log('in target_locations callback...');
            console.log(result);
        }).catch(e => {
            console.error(e)
        })
    }

    saveActualLocations(resultId, indicatorId, periodId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId, indicatorId, periodId ],
            prevFormData,
            formData,
            this.props.createIndicatorActualLocation,
            this.props.updateIndicatorActualLocation,
            this.props.deleteIndicatorActualLocation,
            'result_indicator_period'
        ).then((result) => {
            console.log('in actual_locations callback...');
            console.log(result);
        }).catch(e => {
            console.error(e)
        })
    }


    saveTargetDimensions(resultId, indicatorId, periodId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId, indicatorId, periodId ],
            prevFormData,
            formData,
            this.props.createIndicatorTargetDimension,
            this.props.updateIndicatorTargetDimension,
            this.props.deleteIndicatorTargetDimension,
            'result_indicator_period'
        ).then((result) => {
            console.log('in target_dimensions callback...');
            console.log(result);
        }).catch(e => {
            console.error(e)
        })
    }

    saveActualDimensions(resultId, indicatorId, periodId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId, indicatorId, periodId ],
            prevFormData,
            formData,
            this.props.createIndicatorActualDimension,
            this.props.updateIndicatorActualDimension,
            this.props.deleteIndicatorActualDimension,
            'result_indicator_period'
        ).then((result) => {
            console.log('in actual_dimensions callback...');
            console.log(result);
        }).catch(e => {
            console.error(e)
        })
    }

    savePeriods(resultId, indicatorId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId, indicatorId ],
            prevFormData,
            formData,
            this.props.createIndicatorPeriod,
            this.props.updateIndicatorPeriod,
            this.props.deleteIndicatorPeriod,
            'result_indicator'
        ).then((result) => {
            console.log('in periods callback...', result);
            // console.log(result);

            const targetLocationPromises = result.map((action, i) => {
                let prevTargetLocations = []
                if (prevFormData && prevFormData[i] && prevFormData[i].target.locations) {
                    prevTargetLocations = prevFormData[i].target.locations
                }
                const targetLocations = formData[i].target.locations

                return this.saveTargetLocations(
                    resultId,
                    indicatorId,
                    action.response.id,
                    prevTargetLocations,
                    targetLocations
                )
            })

            const actualLocationPromises = result.map((action, i) => {
                let prevActualLocations = []
                if (prevFormData && prevFormData[i] && prevFormData[i].actual.locations) {
                    prevActualLocations = prevFormData[i].actual.locations
                }
                const actualLocations = formData[i].actual.locations

                return this.saveActualLocations(
                    resultId,
                    indicatorId,
                    action.response.id,
                    prevActualLocations,
                    actualLocations
                )
            })

            const targetDimensionPromises = result.map((action, i) => {
                let prevTargetDimensions = []
                if (prevFormData && prevFormData[i] && prevFormData[i].target.dimensions) {
                    prevTargetDimensions = prevFormData[i].target.dimensions
                }
                const targetDimensions = formData[i].target.dimensions

                return this.saveTargetDimensions(
                    resultId,
                    indicatorId,
                    action.response.id,
                    prevTargetDimensions,
                    targetDimensions
                )
            })

            const actualDimensionPromises = result.map((action, i) => {
                let prevActualDimensions = []
                if (prevFormData && prevFormData[i] && prevFormData[i].actual.dimensions) {
                    prevActualDimensions = prevFormData[i].actual.dimensions
                }
                const actualDimensions = formData[i].actual.dimensions

                return this.saveActualDimensions(
                    resultId,
                    indicatorId,
                    action.response.id,
                    prevActualDimensions,
                    actualDimensions
                )
            })

            return Promise.all(_.flatten(targetLocationPromises, actualLocationPromises, targetDimensionPromises, actualDimensionPromises))

        }).catch(e => {
            console.error(e)
        })
    }

    saveReferences(resultId, indicatorId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        console.log(indicatorId, prevFormData, formData);

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId, indicatorId ],
            prevFormData,
            formData,
            this.props.createIndicatorReference,
            this.props.updateIndicatorReference,
            this.props.deleteIndicatorReference,
            'result_indicator'
        ).then((result) => {
            console.log('in references callback...');
            console.log(result);
        }).catch(e => {
            console.error(e)
        })
    }

    saveIndicators(resultId, prevFormData, formData) {
        const { activityId, publisher } = this.props;

        handleSubmit(
            publisher.id,
            'results',
            [ activityId, resultId],
            prevFormData,
            formData,
            this.props.createResultIndicator,
            this.props.updateResultIndicator,
            this.props.deleteResultIndicator,
            'result'
        ).then((result) => {
            console.log('in indicator callback...', formData);

            const periodPromises = result.map((action, i) => {
                let prevPeriods = []
                if (prevFormData && prevFormData[i] && prevFormData[i].periods) {
                    prevPeriods = prevFormData[i].periods
                }
                const periods = formData[i].periods

                return this.savePeriods(
                    resultId,
                    action.response.id,
                    prevPeriods,
                    periods
                )
            })

            const referencePromises = result.map((action, i) => {
                let prevReferences = []
                if (prevFormData && prevFormData[i] && prevFormData[i].references) {
                    prevReferences = prevFormData[i].references
                }
                const references = formData[i].references

                console.log(action);
                console.log(prevReferences, references);

                return this.saveReferences(
                    resultId,
                    action.response.id,
                    prevReferences,
                    references
                )
            })

            return Promise.all(_.flatten(periodPromises, referencePromises))


        }).catch(e => {
            console.error(e)
        })
    }

    /**
     * Submit performance's result data and redirect to comment form
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data} = this.props;

        const prevFormData = data;
        let results = formData.results;

        handleSubmit(
            publisher.id,
            'results',
            activityId,
            prevFormData,
            results,
            this.props.createPerformanceResult,
            this.props.updatePerformanceResult,
            this.props.deletePerformanceResult
        ).then((result) => {
            // if (!result.error) {
            //     this.props.router.push(`/publisher/activities/${activityId}/performance/comment`)
            // }
            //
            const indicatorPromises = result.map((action, i) => {
                let prevIndicators = []
                if (prevFormData && prevFormData[i].indicators) {
                    prevIndicators = prevFormData[i].indicators
                }
                const indicators = results[i].indicators

                // console.log(prevIndicators, indicators);

                return this.saveIndicators(
                    action.response.result,
                    prevIndicators,
                    indicators
                )
            })

            return Promise.all(indicatorPromises)


        }).catch((e) => {
            console.error(e)
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
    createIndicatorPeriod,
    updateIndicatorPeriod,
    deleteIndicatorPeriod,
    createIndicatorReference,
    updateIndicatorReference,
    deleteIndicatorReference,
    createIndicatorTargetLocation,
    updateIndicatorTargetLocation,
    deleteIndicatorTargetLocation,
    createIndicatorActualLocation,
    updateIndicatorActualLocation,
    deleteIndicatorActualLocation,
    createIndicatorTargetDimension,
    updateIndicatorTargetDimension,
    deleteIndicatorTargetDimension,
    createIndicatorActualDimension,
    updateIndicatorActualDimension,
    deleteIndicatorActualDimension,
})(PerformanceResultForm);
export default withRouter(PerformanceResultForm);

