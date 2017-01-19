import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {getCodeListItems, createActivity, addPerformanceResult} from '../../../../actions/activity'

const renderResult = ({fields, resultOptions, languageOptions, indicatorMeasureOptions, indicatorVocabularyOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
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
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${result}.indicator`}
                                textName={`${result}.indicator`}
                                label="Measure"
                                selectOptions={indicatorMeasureOptions}
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

    static contextTypes = {
        router: PropTypes.object,
    };

    /**
     * Submit performance's comment data and redirect to comment form
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        this.props.dispatch(addPerformanceResult(formData, this.props.activity));
        this.context.router.push('/publisher/activities/performance/comment');
    }

    componentWillMount() {
        this.props.getCodeListItems('ResultType');
        this.props.getCodeListItems('Language');
        this.props.getCodeListItems('IndicatorMeasure');
        this.props.getCodeListItems('IndicatorVocabulary');
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


function mapStateToProps(state) {
    return {
        activity: state.activity,
        codelists: state.codelists,
    }
}

PerformanceResultForm = reduxForm({
    form: 'performance-result',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(PerformanceResultForm);


PerformanceResultForm = connect(mapStateToProps, {getCodeListItems, createActivity})(PerformanceResultForm);
export default PerformanceResultForm;

