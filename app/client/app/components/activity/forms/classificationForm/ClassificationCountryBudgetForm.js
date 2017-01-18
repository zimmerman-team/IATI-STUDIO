import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCodeListItems, createActivity, addClassificationCountryBudget} from '../../../../actions/activity'

const renderAdditionalRenderCountryBugetForm = ({fields, vocabularyOptions, codeOptions, languageOptions, meta: {touched, error}}) => (
    <div>
        {fields.map((description, index) =>
            <div className="field-list" key={index}>
                <RenderCountryBugetForm
                    vocabularyOptions={vocabularyOptions}
                    codeOptions={codeOptions}/>
                <div className="row no-margin">
                    <FieldArray
                        name={`${description}`}
                        component={renderNarrativeFields}
                        narrativeAddMore={false}
                        languageOptions={languageOptions}
                        textName="textPolicy"
                        textLabel="Title"
                    />
                </div>
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


const RenderCountryBugetForm = ({vocabularyOptions, codeOptions, languageOptions}) =>
    (
        <div>
            <div className="row no-margin">
                <Field
                    component={renderSelectField}
                    name="vocabulary"
                    label="Vocabulary"
                    selectOptions={vocabularyOptions}
                    defaultOption="Select one of the following options"
                />
            </div>
            <div className="row no-margin">
                <Field
                    component={renderSelectField}
                    name="item[code]"
                    label="Budget Item Code"
                    selectOptions={codeOptions}
                    defaultOption="Select one of the following options"
                />
                <div className="columns small-6">
                    <Field
                        name="percentage"
                        type="text"
                        component={renderField}
                        label="Percentage"
                    />
                </div>
            </div>
            <div className="row no-margin">
                <h2 className="page-title with-tip">Description</h2>
                <FieldArray
                    name="additionalTitles"
                    component={renderNarrativeFields}
                    narrativeAddMore={false}
                    languageOptions={languageOptions}
                    textName="textPolicyTitle"
                    textLabel="Title"
                />
            </div>
        </div>
    );

const validate = values => {
    const errors = {};

    if (!values.BudgetPercentage) {
        errors.BudgetPercentage = 'Required'
    }
    if (!values.BudgetIdentifierVocabulary) {
        errors.BudgetIdentifierVocabulary = 'Required'
    }

    return errors
};

class CountryBudgetForm extends Component {

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
        this.props.dispatch(addClassificationCountryBudget(formData, this.props.activity));
        this.context.router.push('/publisher/activities/classifications/humanitarian');
    }

    static contextTypes = {
        router: PropTypes.object,
    };

    componentWillMount() {
        this.props.getCodeListItems('BudgetIdentifier');
        this.props.getCodeListItems('BudgetIdentifierVocabulary');
        this.props.getCodeListItems('Language');
    }

    render() {
        const {codelists, handleSubmit, submitting} = this.props;

        if (!codelists['BudgetIdentifier'] || !codelists['BudgetIdentifierVocabulary'] || !codelists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Country Budget Item</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="field-list">
                        <RenderCountryBugetForm
                            vocabularyOptions={codelists["BudgetIdentifierVocabulary"]}
                            codeOptions={codelists["BudgetIdentifier"]}
                            languageOptions={codelists["Language"]}
                        />
                    </div>
                    <FieldArray
                        name="additionalCountryBuget"
                        component={renderAdditionalRenderCountryBugetForm}
                        vocabularyOptions={codelists["BudgetIdentifierVocabulary"]}
                        codeOptions={codelists["BudgetIdentifier"]}
                        languageOptions={codelists["Language"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to="/publisher/activities/classifications/select">Back to
                            Selection</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Humanitarian
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
        codelists: state.codelists
    }
}

CountryBudgetForm = reduxForm({
    form: 'classifications-country-budget',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(CountryBudgetForm);


CountryBudgetForm = connect(mapStateToProps, {getCodeListItems, createActivity})(CountryBudgetForm);
export default CountryBudgetForm;