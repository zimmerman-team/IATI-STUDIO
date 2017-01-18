import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import Tooltip from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {getCodeListItems, createActivity, addPerformanceCondition} from '../../../../actions/activity'

const renderAdditionalRenderPerformanceConditionForm = ({
    fields, conditionOptions, languageOptions,
    meta: {touched, error}
}) => (
    <div>
        {fields.map((description, index) =>
            <div className="field-list" key={index}>
                <RenderPerformanceConditionForm
                    conditionOptions={conditionOptions}
                    languageOptions={languageOptions}
                />
            </div>
        )}
        <div className="columns">
            <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
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


const RenderPerformanceConditionForm = ({conditionOptions, languageOptions}) =>
    (
        <div>
            <div className="row no-margin">
                <Field
                    component={renderSelectField}
                    name="attached"
                    label="Condition Attached"
                    selectOptions={[{code: '0', name: 'False'}, {code: '1', name: 'True'}]}
                    defaultOption="Select one of the following options"
                />
            </div>
            <div className="row no-margin">
                <Field
                    component={renderSelectField}
                    name="type"
                    label="Condition Type"
                    selectOptions={conditionOptions}
                    defaultOption="Select one of the following options"
                />
            </div>
            <div className="row no-margin">
                <FieldArray
                    name="additionalTitles"
                    component={renderNarrativeFields}
                    languageOptions={languageOptions}
                    textName="textTitle"
                    textLabel="Text"
                    narrativeLabel="Description"
                />
            </div>
        </div>
    );

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
        this.props.dispatch(addPerformanceCondition(formData, this.props.activity));
        this.context.router.push('/publisher/activities/performance/result');
    }

    componentWillMount() {
        this.props.getCodeListItems('ConditionType');
        this.props.getCodeListItems('Language');
    }

    render() {
        const {handleSubmit, submitting, codelists} = this.props;

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
                    <div className="field-list">
                        <RenderPerformanceConditionForm
                            conditionOptions={codelists.ConditionType}
                            languageOptions={codelists.Language}
                        />
                    </div>
                    <FieldArray
                        name="additionalHumanitarianScope"
                        component={renderAdditionalRenderPerformanceConditionForm}
                        conditionOptions={codelists.ConditionType}
                        languageOptions={codelists.Language}
                    />
                    <div className="columns small-12">
                        <Link className="button" to="/publisher/activities/relation/relation">Back to relation</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to performance result
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

PerformanceConditionForm = reduxForm({
    form: 'performance-condition',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(PerformanceConditionForm);


PerformanceConditionForm = connect(mapStateToProps, {getCodeListItems, createActivity})(PerformanceConditionForm);
export default PerformanceConditionForm;

