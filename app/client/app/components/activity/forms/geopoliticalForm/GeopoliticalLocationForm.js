import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
    getCodeListItems,
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation
} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {locationsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderLocation = ({fields, geographicLocationReachOptions, geographicVocabularyOptions, geographicExactnessOptions,
        geographicLocationClassOptions, languageOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((location, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <div className="columns small-12">
                                <div className="row no-margin">
                                    <div className="columns small-6">
                                        <Field
                                            name="ref"
                                            type="text"
                                            component={renderField}
                                            label="Reference"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="columns small-12">
                                <h6>Location Reach</h6>
                                <div className="row no-margin">
                                    <Field
                                        component={renderSelectField}
                                        name={`${location}location_reach.code`}
                                        textName={`${location}location_reach.code`}
                                        label="Code"
                                        selectOptions={geographicLocationReachOptions}
                                        defaultOption="Select one of the following options"
                                    />
                                </div>
                            </div>
                            <FieldArray
                                name={`${location}locationRegion`}
                                component={renderRegionFields}
                                geographicVocabularyOptions={geographicVocabularyOptions}
                            />
                            <hr/>
                            <h6 className="columns">Name</h6>
                            <FieldArray
                                name={`${location}name`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="name"
                                textLabel="Name"
                            />
                            <hr/>
                            <h6 className="columns">Location description</h6>
                            <FieldArray
                                name={`${location}additionalLocation`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="locationName"
                                textLabel="Location description"
                            />
                            <hr/>
                            <h6 className="columns">Activity description</h6>
                            <FieldArray
                                name={`${location}activity_description`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="activeName"
                                textLabel="Activity description"
                            />
                            <hr/>
                            <FieldArray
                                name={`${location}administrative`}
                                component={renderAdministrativeFields}
                                geographicVocabularyOptions={geographicVocabularyOptions}
                            />
                            <hr/>
                            <FieldArray
                                name={`${location}point`}
                                component={renderPointFields}
                                geographicExactnessOptions={geographicExactnessOptions}
                                geographicLocationClassOptions={geographicLocationClassOptions}
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

const renderRegionFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
    <div className="columns small-12">
        <h6>Location id</h6>
        <div className="row no-margin">
            <Field
                component={renderSelectField}
                name="location_vocabulary"
                textName="location_vocabulary"
                label="Vocabulary"
                selectOptions={geographicVocabularyOptions}
                defaultOption="Select one of the following options"
            />
            <div className="columns small-6">
                <Field
                    name="location_code"
                    type="text"
                    component={renderField}
                    label="Code"
                />
            </div>
            {fields.map((vocabulary, index) =>
                <div key={index}>
                    <Field
                        component={renderSelectField}
                        name={`${vocabulary}.textCode`}
                        textName={`${vocabulary}.textCode`}
                        label="Vocabulary"
                        selectOptions={geographicVocabularyOptions}
                        defaultOption="Select one of the following options"
                    />
                    <div className="columns small-6">
                        <Field
                            name={`${vocabulary}.geographicVocabularyCode`}
                            type="text"
                            component={renderField}
                            label="Code"
                        />
                    </div>
                </div>
            )}
        </div>
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

const renderAdministrativeFields = ({fields, geographicVocabularyOptions, meta: {touched, error}}) => (
    <div className="columns small-12">
        <h6>Administrative</h6>
        <div className="row no-margin">
            <Field
                component={renderSelectField}
                name="administrativeVocabulary"
                textName="administrativeVocabulary"
                label="Vocabulary"
                selectOptions={geographicVocabularyOptions}
                defaultOption="Select one of the following options"
            />
            <div className="columns small-6">
                <Field
                    name="administrativeVocabularyCode"
                    type="text"
                    component={renderField}
                    label="Code"
                />
            </div>
            <div className="columns small-12">
                <div className="row no-margin">
                    <div className="columns small-6">
                        <Field
                            name="administrativeLevel"
                            type="text"
                            component={renderField}
                            label="Level"
                        />
                    </div>
                </div>
            </div>
            {fields.map((vocabulary, index) =>
                <div key={index}>
                    <Field
                        component={renderSelectField}
                        name={`${vocabulary}.textCode`}
                        textName={`${vocabulary}.textCode`}
                        label="Vocabulary"
                        selectOptions={geographicVocabularyOptions}
                        defaultOption="Select one of the following options"
                    />
                    <div className="columns small-6">
                        <Field
                            name={`${vocabulary}.geographicVocabularyCode`}
                            type="text"
                            component={renderField}
                            label="Code"
                        />
                    </div>
                    <div className="columns small-12">
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${vocabulary}.administrativeLevel`}
                                    type="text"
                                    component={renderField}
                                    label="Level"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
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

const renderPointFields = ({fields, geographicExactnessOptions, geographicLocationClassOptions, meta: {touched, error}}) => (
    <div className="columns small-12">
        <h6>Point</h6>
        <div className="row no-margin">
            <div className="columns small-12">
                <div className="row no-margin">
                    <div className="columns small-6">
                        <Field
                            name="point_name"
                            type="text"
                            component={renderField}
                            label="Srs name"
                        />
                    </div>
                </div>
            </div>
            <div className="columns small-12">
                <h6>Position</h6>
                <div className="row no-margin">
                    <div className="columns small-6">
                        <Field
                            name="latitude"
                            type="text"
                            component={renderField}
                            label="Latitude"
                        />
                    </div>
                    <div className="columns small-6">
                        <Field
                            name="longitude"
                            type="text"
                            component={renderField}
                            label="Longitude"
                        />
                    </div>
                </div>
            </div>
            <div className="columns small-12">
                {/*@TODO Map here*/}
            </div>
            <div className="columns small-12">
                <h6>Exactness</h6>
                <div className="row no-margin">
                    <Field
                        component={renderSelectField}
                        name="exactness"
                        textName="exactness"
                        label="Exactness"
                        selectOptions={geographicExactnessOptions}
                        defaultOption="Select one of the following options"
                    />
                </div>
            </div>
            <div className="columns small-12">
                <h6>Location class</h6>
                <div className="row no-margin">
                    <Field
                        component={renderSelectField}
                        name="location_class"
                        textName="location_class"
                        label="Location Class"
                        selectOptions={geographicLocationClassOptions}
                        defaultOption="Select one of the following options"
                    />
                </div>
            </div>
            <div className="columns small-12">
                <h6>Feature designation</h6>
                <div className="row no-margin">
                    <Field
                        component={renderSelectField}
                        name="feature_designation"
                        textName="feature_designation"
                        label="Feature Designation"
                        selectOptions={geographicLocationClassOptions}
                        defaultOption="Select one of the following options"
                    />
                </div>
            </div>
        </div>
    </div>
);

const validate = values => {
    const errors = {};

    if (!values.featureDesignation) {
        errors.featureDesignation = 'Required'
    }
    return errors
};

class LocationForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit geopolitical's location data and redirect to location form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        const locations = formData.locations;
        console.log('<<<locations', locations);
        console.log('<<<formData', formData);

        handleSubmit(
            publisher.id,
            'locations',
            activityId,
            data,
            locations,
            this.props.createLocation,
            this.props.updateLocation,
            this.props.deleteLocation,
        )
        //this.props.router.push(`/publisher/activities/${activityId}/classifications/sector`)
    }


    componentWillMount() {
        this.props.getCodeListItems('GeographicLocationReach');
        this.props.getCodeListItems('GeographicVocabulary');
        this.props.getCodeListItems('GeographicExactness');
        this.props.getCodeListItems('GeographicLocationClass');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('locations', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`locations[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('locations', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getLocations(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting, activityId} = this.props;
        if (!codelists['GeographicLocationReach'] || !codelists['GeographicVocabulary'] || !codelists['GeographicExactness']
            || !codelists['GeographicLocationClass'] || !codelists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Location</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="locations"
                        component={renderLocation}
                        geographicLocationReachOptions={codelists["GeographicLocationReach"]}
                        geographicVocabularyOptions={codelists["GeographicVocabulary"]}
                        geographicExactnessOptions={codelists["GeographicExactness"]}
                        geographicLocationClassOptions={codelists["GeographicLocationClass"]}
                        languageOptions={codelists["Language"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/basic-info/status`}>Back to status</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to contact
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const locations = locationsSelector(state);

    return {
        data: locations,
        codelists: state.codelists,
        initialValues: {"locations": locations},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

LocationForm = reduxForm({
    form: 'geopolitical-information-location',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(LocationForm);

LocationForm = connect(mapStateToProps, {
    getCodeListItems,
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation
})(LocationForm);

export default withRouter(LocationForm)