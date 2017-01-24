import React, {Component, PropTypes} from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
    getCodeListItems,
    getActivity,
    createLocation,
    updateLocation,
    deleteLocation
} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {publisherSelector} from '../../../../reducers/createActivity.js'
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
                                            name={`${location}ref`}
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
                                name={`${location}location_id`}
                                textName={`${location}location_id`}
                                component={renderRegionFields}
                                geographicVocabularyOptions={geographicVocabularyOptions}
                            />
                            <h6 className="columns">Name</h6>
                            <FieldArray
                                name={`${location}name.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="name"
                                textLabel="Name"
                            />
                            <h6 className="columns">Location description</h6>
                            <FieldArray
                                name={`${location}.description.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="locationName"
                                textLabel="Location description"
                            />
                            <h6 className="columns">Activity description</h6>
                            <FieldArray
                                name={`${location}.activity_description.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textName="activeName"
                                textLabel="Activity description"
                            />
                            <FieldArray
                                name={`${location}.point`}
                                textName={`${location}.point`}
                                component={renderPointFields}
                                geographicExactnessOptions={geographicExactnessOptions}
                                geographicLocationClassOptions={geographicLocationClassOptions}
                            />
                            <div className="columns small-12">
                                <h6>Exactness</h6>
                                <div className="row no-margin">
                                    <Field
                                        component={renderSelectField}
                                        name={`${location}.exactness.code`}
                                        textName={`${location}.exactness.code`}
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
                                        name={`${location}.location_class.code`}
                                        textName={`${location}.location_class.code`}
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
                                        name={`${location}.feature_designation.code`}
                                        textName={`${location}.feature_designation.code`}
                                        label="Feature Designation"
                                        selectOptions={geographicLocationClassOptions}
                                        defaultOption="Select one of the following options"
                                    />
                                </div>
                            </div>
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

const renderRegionFields = ({fields, textName="", geographicVocabularyOptions, meta: {touched, error}}) => (
    <div className="columns small-12">
        <h6>Location id</h6>
        <div className="row no-margin">
            <Field
                component={renderSelectField}
                name={`${textName}.vocabulary.code`}
                textName={`${textName}.vocabulary.code`}
                label="Vocabulary"
                selectOptions={geographicVocabularyOptions}
                defaultOption="Select one of the following options"
            />
            <div className="columns small-6">
                <Field
                    name={`${textName}.code`}
                    type="number"
                    component={renderField}
                    label="Code"
                />
            </div>
        </div>
    </div>
);

const renderAdministrativeFields = ({fields, textName="", geographicVocabularyOptions, meta: {touched, error}}) => {
    if (!fields.length) {
        fields.push({})
    }

    return (
        <div>
            {fields && fields.map((title, index) =>
                <div key={index}>
                    <div className="columns small-12">
                        <h6>Administrative</h6>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${title}.vocabulary.code`}
                                textName={`${title}.vocabulary.code`}
                                label="Vocabulary"
                                selectOptions={geographicVocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${title}.code`}
                                    type="number"
                                    component={renderField}
                                    label="Code"
                                />
                            </div>
                            <div className="columns small-12">
                                <div className="row no-margin">
                                    <div className="columns small-6">
                                        <Field
                                            name={`${title}.level`}
                                            type="number"
                                            component={renderField}
                                            label="Level"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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
}

const renderPointFields = ({fields, textName="", geographicExactnessOptions, geographicLocationClassOptions, meta: {touched, error}}) => (
    <div className="columns small-12">
        <h6>Point</h6>
        <div className="row no-margin">
            <div className="columns small-12">
                <div className="row no-margin">
                    <div className="columns small-6">
                        <Field
                            name={`${textName}.srsName`}
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
                            name={`${textName}.pos.latitude`}
                            type="number"
                            component={renderField}
                            label="Latitude"
                        />
                    </div>
                    <div className="columns small-6">
                        <Field
                            name={`${textName}.pos.longitude`}
                            type="number"
                            component={renderField}
                            label="Longitude"
                        />
                    </div>
                </div>
            </div>
            <div className="columns small-12">
                {/*@TODO Map here*/}
            </div>
        </div>
    </div>
);

const validate = values => {
    let errors = {};

    const locations = values.locations || []

    errors.locations = locations.map(location => {
        let locationErrors = {}

        if (!location.location_reach) {
            locationErrors.location_reach = {code: 'Required'}
        }

        if (!location.feature_designation) {
            locationErrors.feature_designation = {code: 'Required'}
        }

        if (!location.exactness) {
            locationErrors.exactness = {code: 'Required'}
        }

        // if(location.location_id) {
        //     if (!location.location_id.vocabulary) {
        //         locationErrors.vocabulary = {code: 'Required'}
        //     }
        // }


        if (!location.location_class) {
            locationErrors.location_class = 'Required'
        }

        return locationErrors
    });

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

        handleSubmit(
            publisher.id,
            'locations',
            activityId,
            data,
            locations,
            this.props.createLocation,
            this.props.updateLocation,
            this.props.deleteLocation,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/classifications/sector`)
            }
        }).catch((e) => {
            console.log(e)
        })
    }


    componentWillMount() {
        this.props.getCodeListItems('GeographicLocationReach');
        this.props.getCodeListItems('GeographicVocabulary');
        this.props.getCodeListItems('GeographicExactness');
        this.props.getCodeListItems('GeographicLocationClass');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
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
                        <Link className="button" to={`/publisher/activities/${activityId}/geopolitical-information/region`}>Back to region</Link>
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
    const { activityId } = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let locations = currentActivity && currentActivity.locations;

    // @TODO remove this when feature_designation is fixed on location form
    let formLocations = [];
    if (locations && locations.length) {
        locations.forEach(function (formLocation) {
            let newformLocation = Object.assign({}, formLocation);
            newformLocation.feature_designation = {"code": 2, "name": "Populated Place"};
            formLocations.push(newformLocation);
        });
    }

    return {
        data: formLocations,
        activity: state.activity.activity,
        codelists: state.codelists,
        initialValues: {"locations": formLocations},  // populate initial values for redux form
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
    getActivity,
    createLocation,
    updateLocation,
    deleteLocation
})(LocationForm);

export default withRouter(LocationForm)