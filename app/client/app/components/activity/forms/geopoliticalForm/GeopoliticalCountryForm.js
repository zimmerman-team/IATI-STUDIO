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

const renderRecipientCountry = ({fields, languageOptions, countryOptions, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((recipientCountry, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                name={`${recipientCountry}.country[code]`}
                                textName={`${recipientCountry}.country[code]`}
                                component={renderSelectField}
                                label="Country Code"
                                selectOptions={countryOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${recipientCountry}.percentage`}
                                    type="number"
                                    component={renderField}
                                    label="Percentage"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${recipientCountry}.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="text"
                                textLabel="Title"
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

    const countries = values.recipient_countries || []

    errors.recipient_countries = countries.map(countryData => {
        let descriptionErrors = {}

        if (!countryData.percentage) {
            descriptionErrors.percentage = 'Required'
        }

        if (countryData.percentage && countryData.percentage > 100) {
            descriptionErrors.percentage = 'Percentage should not be more than 100'
        }

        if (!countryData.type) {
            descriptionErrors.type = {code: 'Required'}
        }

        return descriptionErrors
    });

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
            'recipient_countries',
            activityId,
            data,
            formData.recipient_countries,
            this.props.createRecipientCountry,
            this.props.updateRecipientCountry,
            this.props.deleteRecipientCountry,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${this.props.activityId}/geopolitical-information/region`)
            }
        }).catch((e) => {
            console.log(e)
        });
    }

    componentWillMount() {
        this.props.getCodeListItems('Country');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('recipient_countries', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`recipient_countries[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('recipient_countries', i)
            }
        }

        if ((nextProps.publisher && nextProps.publisher.id) && (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher
            || !(this.props.data && this.props.data.length))) {
            this.props.getRecipientCountries(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {data, codelists, handleSubmit, submitting, activityId} = this.props;

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
                    <FieldArray
                        name="recipient_countries"
                        component={renderRecipientCountry}
                        languageOptions={codelists["Language"]}
                        countryOptions={codelists["Country"]}
                    />
                    <div className="columns small-12">
                        <Link className="button"
                              to={`/publisher/activities/${activityId}/participating-organisation/participating-organisation/`}>
                            Back to participating organisation
                        </Link>
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
    const recipient_countries = recipientCountriesSelector(state);

    return {
        data: recipient_countries,
        codelists: state.codelists,
        activity: state.activity,
        initialValues: {"recipient_countries": recipient_countries},  // populate initial values for redux form
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
