import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { getCodeListItems, getActivity } from '../../../../actions/activity'
import { publisherSelector, countryBudgetItemSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const renderCountryBudgetItemForm = ({fields, vocabularyOptions, codeOptions, languageOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((countryBudget, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${countryBudget}vocabulary`}
                                label="Vocabulary"
                                selectOptions={vocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${countryBudget}item[code]`}
                                label="Budget Item Code"
                                selectOptions={codeOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${countryBudget}percentage`}
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
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
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
     * Submit form data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data} = this.props;

        const lastDates = data;
        let countryBudgetItems = formData.activity.country_budget_items;

        handleSubmit(
            publisher.id,
            'country_budget_items',
            activityId,
            lastDates,
            countryBudgetItems,
            this.props.createDate,
            this.props.updateDate,
            this.props.deleteDate,
        );

        this.props.router.push(`/publisher/activities/${activityId}/classifications/humanitarian`)
    }

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
                        <RenderCountryBudgetItemForm
                            vocabularyOptions={codelists["BudgetIdentifierVocabulary"]}
                            codeOptions={codelists["BudgetIdentifier"]}
                            languageOptions={codelists["Language"]}
                        />
                    </div>
                    <FieldArray
                        name="additionalCountryBudgetItem"
                        component={renderAdditionalRenderCountryBudgetItemForm}
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


function mapStateToProps(state, props) {
    // TODO country and financial budget are different
    const countryBudgetsItems = countryBudgetItemSelector(state);

    return {
        data: countryBudgetsItems,
        activity: state.activity.activity,
        codelists: state.codelists,
        initialValues: {"activity": countryBudgetsItems},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

CountryBudgetForm = reduxForm({
    form: 'classifications-country-budget',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(CountryBudgetForm);

CountryBudgetForm = connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
})(CountryBudgetForm);

export default withRouter(CountryBudgetForm);
