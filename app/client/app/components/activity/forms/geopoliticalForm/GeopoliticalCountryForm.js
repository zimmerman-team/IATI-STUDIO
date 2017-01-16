import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {
    getCodeListItems,
    getRecipientCountries,
    createRecipientCountry,
    updateRecipientCountry,
    deleteRecipientCountry
} from '../../../../actions/activity'
import {recipientCountriesSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

import handleSubmit from '../../helpers/handleSubmit'

const renderRecipientCountry = ({fields, codelists, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((recipientCountry, index) =>
                <div className="field-list" key={index}>
                    <div className="row no-margin">
                        <Field
                            name={`${recipientCountry}.country[code]`}
                            component={renderSelectField}
                            label="Country Code"
                            selectOptions={codelists['Country']}
                        />
                        <div className="columns small-6">
                            <Field
                                name={`${recipientCountry}.percentage`}
                                type="text"
                                component={renderField}
                                label="Percentage"
                            />
                        </div>
                    </div>
                    <div className="row no-margin">
                        <FieldArray
                            name={`${recipientCountry}.narratives`}
                            component={renderNarrativeFields}
                            languageOptions={codelists['Language']}
                            textName="text"
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
    )
};

const validate = values => {
    let errors = {};

    const recipientCountries = values.recipientCountries || []

    errors.recipientCountries = recipientCountries.map(recipientCountry => {
        let recipientCountryErrors = {}

        if (!recipientCountry.country) {
            recipientCountryErrors.country = {code: 'Required'}
        }

        if (!recipientCountry.percentage) {
            recipientCountryErrors.percentage = 'Required'
        }

        const narratives = recipientCountry.narratives || []

        recipientCountryErrors.narratives = narratives.map(narrative => {
            let narrativeErrors = {}

            if (!narrative.text) {
                narrativeErrors.text = 'Required'
            }

            if (!narrative.language) {
                narrativeErrors.language = {code: 'Required'}
            }

            return narrativeErrors
        })

        if (!narratives.length) {
            recipientCountryErrors.narratives._error = 'At least one narrative must be entered'
        }

        return recipientCountryErrors
    })

    if (!recipientCountries.length) {
        errors.recipientCountries._error = 'At least one recipient country must be entered'
    }

    return errors
};

class RecipientCountryForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit basic information's description data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;

        handleSubmit(
            publisher.id,
            'recipientCountries',
            activityId,
            data,
            formData.recipientCountries,
            this.props.createRecipientCountry,
            this.props.updateRecipientCountry,
            this.props.deleteRecipientCountry,
        );

        // this.props.router.push(`/publisher/activities/${this.props.activityId}/geopolitical-information/region`);
    }

    componentWillMount() {
        this.props.getCodeListItems('Country');
        this.props.getCodeListItems('Language');
        this.props.getRecipientCountries(this.props.activityId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('recipientCountries', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`recipientCountries[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('recipientCountries', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getRecipientCountries(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {data, codelists, handleSubmit, submitting} = this.props;

        if (!data || !codelists['Language'] || !codelists['Country']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Recipient Country</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="field-list">
                        <FieldArray
                            name="recipientCountries"
                            component={renderRecipientCountry}
                            codelists={codelists}
                        />
                    </div>
                    <div className="columns small-12">
                        <Link className="button"
                              to="/publisher/activity/participating-organisation/participating-organisation/">Back to
                            participating organigation</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Region
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

RecipientCountryForm = reduxForm({
    form: 'geopolitical-information-country',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(RecipientCountryForm);

function mapStateToProps(state) {
    const recipientCountries = recipientCountriesSelector(state)

    return {
        data: recipientCountries,
        codelists: state.codelists,
        activity: state.activity,
        initialValues: {"recipientCountries": recipientCountries},  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

RecipientCountryForm = connect(mapStateToProps, {
    getCodeListItems,
    getRecipientCountries,
    createRecipientCountry,
    updateRecipientCountry,
    deleteRecipientCountry
})(RecipientCountryForm);

export default withRouter(RecipientCountryForm);
