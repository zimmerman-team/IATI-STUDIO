import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCodeListItems, getActivity, getCountryBudgetItems, createCountryBudgetItem, updateCountryBudgetItem, deleteCountryBudgetItem,} from '../../../../actions/activity'
import {publisherSelector, countryBudgetItemSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const validate = values => {
    let errors = {};

    const countryBudgetItems = values.country_budget_items || {};
    errors.country_budget_items = {};

    if (!countryBudgetItems.vocabulary) {
        errors.vocabulary = {code:'Required'}
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
        let countryBudgetItems = formData.country_budget_items;
        countryBudgetItems.activity = activityId;

        handleSubmit(
            publisher.id,
            'country_budget_items',
            activityId,
            [data],
            [countryBudgetItems],
            this.props.createCountryBudgetItem,
            this.props.updateCountryBudgetItem,
            this.props.deleteCountryBudgetItem,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/classifications/humanitarian`)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
        //if (this.props.activityId && this.props.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    componentWillMount() {
        this.props.getCodeListItems('BudgetIdentifier');
        this.props.getCodeListItems('BudgetIdentifierVocabulary');
        this.props.getCodeListItems('Language');
    }

    render() {
        const {codeLists, handleSubmit, submitting, activityId} = this.props;

        if (!codeLists['BudgetIdentifier'] || !codeLists['BudgetIdentifierVocabulary'] || !codeLists['Language']) {
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
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name="country_budget_items.vocabulary.code"
                                textName="country_budget_items.vocabulary.code"
                                label="Vocabulary"
                                selectOptions={codeLists['BudgetIdentifierVocabulary']}
                                defaultOption="Select one of the following options"
                            />
                        </div>

                        {/* @TODO uncomment when these fields are added in API
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name="country_budget_items.item[code]"
                                textName="country_budget_items.item[code]"
                                label="Budget Item Code"
                                selectOptions={codeLists['BudgetIdentifier']}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name="country_budget_items.percentage"
                                    type="number"
                                    component={renderField}
                                    label="Percentage"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <h2 className="page-title with-tip">Description</h2>
                            <FieldArray
                                name="country_budget_items.narratives"
                                component={renderNarrativeFields}
                                narrativeAddMore={false}
                                languageOptions={codeLists['Language']}
                                textName="textPolicyTitle"
                                textLabel="Title"
                            />
                        </div>
                        */}
                    </div>
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/classifications/select`}>
                            Back to Selection
                        </Link>
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
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let country_budget_items = currentActivity && currentActivity.country_budget_items;
    if (currentActivity && !country_budget_items) {
        country_budget_items = {};
    }

    return {
        data: country_budget_items,
        activity: state.activity.activity,
        codeLists: state.codeLists,
        initialValues: {"country_budget_items": country_budget_items},  // populate initial values for redux form
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
    getCountryBudgetItems,
    createCountryBudgetItem,
    updateCountryBudgetItem,
    deleteCountryBudgetItem,
})(CountryBudgetForm);

export default withRouter(CountryBudgetForm);
