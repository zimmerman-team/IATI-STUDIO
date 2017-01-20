import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import Tooltip from '../../../general/Tooltip.react.jsx'
import {renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {
    getCodeListItems,
    getPerformanceCondition,
    createPerformanceCondition,
    updatePerformanceCondition,
    deletePerformanceCondition
} from '../../../../actions/activity'
import {conditionsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import { Link } from 'react-router';
import { withRouter } from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'


const renderCondition = ({fields, conditionOptions, meta: {touched, dirty, error}}) => {
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
                                name={`${conditions}.attached`}
                                textName={`${conditions}.attached`}
                                label="Condition Attached"
                                selectOptions={[{code: '1', name: 'Yes'}, {code: '0', name: 'No'}]}
                                defaultOption="Select one of the following options"
                            />
                            <Field
                                component={renderSelectField}
                                name={`${conditions}.type`}
                                textName={`${conditions}.type`}
                                label="Condition Type"
                                selectOptions={conditionOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
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
                </div>
            )}
        </div>
    )
};

const validate = values => {
    const errors = {};

    if (!values.type) {
        errors.type = 'Required'
    }
    return errors
};

class PerformanceConditionForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object,
    };

    /**
     * Submit performance's comment data and redirect to result form
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data, router} = this.props;
        const conditions = formData.conditions;

        handleSubmit(
            publisher.id,
            'conditions',
            activityId,
            data,
            conditions,
            this.props.createPerformanceCondition,
            this.props.updatePerformanceCondition,
            this.props.deletePerformanceCondition,
        ).then((result) => {
            if (!result.error) {
                router.push(`/publisher/activities/${activityId}/performance/result`)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    componentWillMount() {
        this.props.getCodeListItems('ConditionType');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('descriptions', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`conditions[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('conditions', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher || !(this.props.data && this.props.data.length)) {
            //this.props.getPerformanceCondition(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {handleSubmit, submitting, codelists, activityId} = this.props;

        if (!codelists.ConditionType || !codelists.Language) {
            return <GeneralLoader/>
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Condition</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="conditions"
                        component={renderCondition}
                        conditionOptions={codelists.ConditionType}
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
    const conditions = conditionsSelector(state);
    return {
        data: conditions,
        codelists: state.codelists,
        initialValues: {"conditions": conditions},  // populate initial values for redux form
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
    getPerformanceCondition,
    createPerformanceCondition,
    updatePerformanceCondition,
    deletePerformanceCondition
})(PerformanceConditionForm);

export default withRouter(PerformanceConditionForm);

