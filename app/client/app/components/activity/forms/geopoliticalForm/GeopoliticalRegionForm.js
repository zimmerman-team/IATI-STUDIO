import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import {getCodeListItems, getRegions, createRegion, updateRegion, deleteRegion} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {regionsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderAdditionalRegion = ({fields, languageOptions, regionOptions, regionVocabularyOptions, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }
    return (
        <div>
            {fields.map((recipientRegion, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            {
                                !regionOptions ?
                                    <GeneralLoader/> :
                                    <Field
                                        component={renderSelectField}
                                        name={`${recipientRegion}.region[code]`}
                                        textName={`${recipientRegion}.region[code]`}
                                        label="Region code"
                                        selectOptions={regionOptions}
                                        defaultOption="Select one of the following options"
                                    />
                            }
                            {
                                !regionVocabularyOptions ?
                                    <GeneralLoader/> :
                                    <Field
                                        component={renderSelectField}
                                        name={`${recipientRegion}.vocabulary[code]`}
                                        textName={`${recipientRegion}.vocabulary[code]`}
                                        label="Region vocabulary"
                                        selectOptions={regionVocabularyOptions}
                                        defaultOption="Select one of the following options"
                                    />
                            }
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${recipientRegion}.percentage`}
                                    type="number"
                                    component={renderField}
                                    label="Percentage"
                                />
                            </div>
                            <div className="columns small-6">
                                <Field
                                    name={`${recipientRegion}.region[name]`}
                                    type="text"
                                    component={renderField}
                                    label="Region Name"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${recipientRegion}.vocabulary_uri`}
                                    type="url"
                                    component={renderField}
                                    label="Vocabulary URI"
                                />
                            </div>
                        </div>
                        {/* @TODO uncomment when issue #949 is fixed
                        <div className="row no-margin">
                            <FieldArray
                                name={`${recipientRegion}.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                            />
                        </div>
                        */}
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

    const regions = values.recipient_region || []

    errors.recipient_region = regions.map(regionData => {
        let descriptionErrors = {}

        if (!regionData.percentage) {
            descriptionErrors.percentage = 'Required'
        }

        if (regionData.percentage && regionData.percentage > 100) {
            descriptionErrors.percentage = 'Percentage should not be more than 100'
        }

        if (!regionData.region) {
            descriptionErrors.region = {code: 'Required'}
        }

        if (!regionData.vocabulary) {
            descriptionErrors.vocabulary = {code: 'Required'}
        }

        if (!regionData.region) {
            descriptionErrors.region = {name: 'Required'}
        }

        return descriptionErrors
    });

    return errors
};

class RecipientRegionForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit geopolitical's region data and redirect to location form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        const regions = formData.recipient_region;

        handleSubmit(
            publisher.id,
            'recipient_region',
            activityId,
            data,
            regions,
            this.props.createRegion,
            this.props.updateRegion,
            this.props.deleteRegion,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${this.props.activityId}/geopolitical-information/location`)
            }
        }).catch((e) => {
            console.log(e)
        })

    }

    componentWillMount() {
        this.props.getCodeListItems('Region');
        this.props.getCodeListItems('RegionVocabulary');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('regions', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`recipient_region[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('recipient_region', i)
            }
        }

        if ((nextProps.publisher && nextProps.publisher.id) && (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher
            || !(this.props.data && this.props.data.length))) {
            this.props.getRegions(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codeLists, handleSubmit, submitting, activityId, data} = this.props;
        if (!data || !codeLists['Region'] || !codeLists['RegionVocabulary'] || !codeLists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Recipient Region</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="recipient_region"
                        component={renderAdditionalRegion}
                        regionOptions={codeLists["Region"]}
                        regionVocabularyOptions={codeLists["RegionVocabulary"]}
                        languageOptions={codeLists["Language"]}
                    />
                    <div className="columns small-12">
                        <Link className="button"
                              to={`/publisher/activities/${activityId}/geopolitical-information/country/`}>Back to
                            to Country</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Location
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


RecipientRegionForm = reduxForm({
    form: 'geopolitical-information-recipient-region',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(RecipientRegionForm);


function mapStateToProps(state, props) {
    const recipient_region = regionsSelector(state);

    return {
        data: recipient_region,
        codeLists: state.codeLists,
        initialValues: {"recipient_region": recipient_region},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

RecipientRegionForm = connect(mapStateToProps, {
    getCodeListItems,
    getRegions,
    createRegion,
    updateRegion,
    deleteRegion
})(RecipientRegionForm);

export default withRouter(RecipientRegionForm)
