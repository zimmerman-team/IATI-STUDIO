import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import Tooltip from '../../../general/Tooltip.react.jsx'
import {renderSelectField, renderField, renderNarrativeFields} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {
    getCodeListItems,
    getPerformanceConditions,
    createPerformanceCondition,
    updatePerformanceCondition,
    deletePerformanceConditions,
    createPerformanceConditions,
    updatePerformanceConditions,
} from '../../../../actions/activity'
import { conditionSelector } from '../../../../reducers/createActivity.js'
import { publisherSelector } from '../../../../reducers/publisher.js'
import { Link } from 'react-router';
import { withRouter } from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'


const renderCondition = ({fields, conditionOptions, languageOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((conditions, index) =>
                <div key={index}>
                    <div className="field-list clearfix">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${conditions}type.code`}
                                textName={`${conditions}type.code`}
                                label="Condition Type"
                                selectOptions={conditionOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <FieldArray
                            name={`${conditions}.narratives`}
                            component={renderNarrativeFields}
                            languageOptions={languageOptions}
                        />
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>
                            Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Title"
                            className="control-button remove float-right"
                            onClick={() => fields.remove(index)}
                        >
                            Delete
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
    let errorsCondition = {};
    const conditions = values.conditions || [];

    let errorsConditions = conditions.map(conditionData => {
        let conditionErrors = {};

        if (!conditionData.type || !conditionData.type.code) {
            conditionErrors.type = {code: 'Required'}
        }

        return conditionErrors
    });

    if (!values.condition || !values.condition.attached || values.condition.attached == "Select one of the following options") {
        errorsCondition.attached = 'Required'
    }

    return {conditions: errorsConditions, condition: errorsCondition}
};

class PerformanceConditionForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit performance's comment data and redirect to result form
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data, router, parentCondition} = this.props;
        let formParentConditionData = formData.condition;
        let conditions = formData.conditions;
        formParentConditionData.activity = activityId;

        if (parentCondition && parentCondition.id) {
            conditions = conditions.map(function (conditionsFormData) {
                conditionsFormData.conditions = parentCondition.id;
                return conditionsFormData;
            });

            handleSubmit(
                publisher.id,
                'conditions',
                activityId,
                data,
                conditions,
                this.props.createPerformanceConditions,
                this.props.updatePerformanceConditions,
                this.props.deletePerformanceConditions,
            ).then((result) => {
                if (!result.error) {
                    router.push(`/publisher/activities/${activityId}/performance/result`)
                }
            }).catch((e) => {
                console.log(e)
            })
        } else {
            handleSubmit(
                publisher.id,
                'conditions',
                activityId,
                [data],
                [formParentConditionData],
                this.props.createPerformanceCondition,
                this.props.updatePerformanceCondition,
                this.props.deletePerformanceConditions,
            ).then((result) => {
                conditions = conditions.map(function (conditionsFormData) {
                    conditionsFormData.conditions = result[0].response.result;
                    return conditionsFormData;
                });
                handleSubmit(
                    publisher.id,
                    'conditions',
                    activityId,
                    data,
                    conditions,
                    this.props.createPerformanceConditions,
                    this.props.updatePerformanceConditions,
                    this.props.deletePerformanceConditions,
                    'result',
                ).then((result) => {
                    if (!result.error) {
                        router.push(`/publisher/activities/${activityId}/performance/result`)
                    }
                }).catch((e) => {
                    console.log(e)
                });
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    componentWillMount() {
        this.props.getCodeListItems('ConditionType');
        this.props.getCodeListItems('Language');
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId);

            if (this.props.parentCondition && this.props.parentCondition.id) {
                this.props.getPerformanceConditions(this.props.publisher.id, this.props.activityId)
            }
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId);

            if (this.props.parentCondition && this.props.parentCondition.id) {
                this.props.getPerformanceConditions(this.props.publisher.id, this.props.activityId)
            }
        }
    }

    render() {
        const {handleSubmit, submitting, codeLists, activityId, isFetching} = this.props;

        if (!codeLists.ConditionType || isFetching) {
            return <GeneralLoader/>
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Condition</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="field-list clearfix">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name="condition.attached"
                                textName="condition.attached"
                                label="Condition Attached"
                                selectOptions={[{code: 'True', name: 'True'}, {code: 'False', name: 'False'}]}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                    </div>
                    <h2 className="page-title with-tip">Conditions</h2>
                    <FieldArray
                        name="conditions"
                        component={renderCondition}
                        conditionOptions={codeLists.ConditionType}
                        languageOptions={codeLists["Language"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/relations/relations`}>Back to relation</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to performance result
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state, props) {

    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let parentCondition = currentActivity && currentActivity.conditions;
    let conditions = [];

    if (currentActivity && !parentCondition) {
        parentCondition = {};
    } else {
        conditions = conditionSelector(state);
    }
    const isFetching = state.activity.isFetching;

    return {
        data: conditions,
        isFetching: isFetching,
        parentCondition: parentCondition,
        codeLists: state.codeLists,
        initialValues: {"conditions": conditions, "condition": parentCondition},  // populate initial values for redux form for both child and parent conditions
        publisher: publisherSelector(state),
        ...props,
    }
}

PerformanceConditionForm = reduxForm({
    form: 'performance-condition',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(PerformanceConditionForm);

PerformanceConditionForm = connect(mapStateToProps, {
    getCodeListItems,
    getPerformanceConditions,
    createPerformanceCondition,
    updatePerformanceCondition,
    deletePerformanceConditions,
    createPerformanceConditions,
    updatePerformanceConditions,
})(PerformanceConditionForm);

export default withRouter(PerformanceConditionForm);

