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

const renderAdditionalRegion = ({fields, languageOptions, regionOptions, regionVocabularyOptions, meta: {touched, error}}) => (
    <div>
        {fields.map((description, index) =>
            <div className="field-list" key={index}>
                <div className="row no-margin">
                    {
                        !regionOptions ?
                            <GeneralLoader/> :
                            <Field
                                component={renderSelectField}
                                name={`${description}.region[code]`}
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
                                name={`${description}.vocabulary[code]`}
                                label="Region vocabulary"
                                selectOptions={regionVocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                    }
                </div>
                <div className="row no-margin">
                    <FieldArray
                        name={`${description}.additionalDescription`}
                        component={renderNarrativeFields}
                        languageOptions={languageOptions}
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
);

const validate = values => {
    const errors = {};

    if (!values.region) {
        errors.type = 'Required'
    }
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
        const {activityId, data, publisher} = this.props
        const regions = formData.regions;

        handleSubmit(
            publisher.id,
            'regions',
            activityId,
            data,
            regions,
            this.props.createRegion,
            this.props.updateRegion,
            this.props.deleteRegion,
        )
        //this.context.router.push('/publisher/activity/geopolitical-information/location');
    }

    static contextTypes = {
        router: PropTypes.object,
    };

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
            newData.forEach((d, i) => this.props.change(`regions[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('regions', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getRegions(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting} = this.props;
        if (!codelists['Region'] || !codelists['RegionVocabulary'] || !codelists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Recipient Region</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name="region[code]"
                                label="Region code"
                                selectOptions={codelists["Region"]}
                                defaultOption="Select one of the following options"
                            />
                            <Field
                                component={renderSelectField}
                                name="vocabulary[code]"
                                label="Region vocabulary"
                                selectOptions={codelists["RegionVocabulary"]}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name="uri"
                                    type="text"
                                    component={renderField}
                                    label="Vocabulary URI"
                                />
                            </div>
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
                            <FieldArray
                                name="additionalTitles"
                                component={renderNarrativeFields}
                                languageOptions={codelists["Language"]}
                                textName="textTitle"
                                textLabel="Title"
                            />
                        </div>
                    </div>
                    <div className="columns small-12">
                        <Link className="button" to="/publisher/activity/geopolitical-information/country/">Back to
                            participating organigation</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Location
                        </button>
                    </div>
                </form>
                <FieldArray
                    name="additionalRegion"
                    component={renderAdditionalRegion}
                    regionOptions={codelists["Region"]}
                    regionVocabularyOptions={codelists["RegionVocabulary"]}
                />
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
    const regions = regionsSelector(state)

    return {
        data: regions,
        codelists: state.codelists,
        initialValues: {"regions": regions},  // populate initial values for redux form
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
