import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCodeListItems, getSectors, createSector, updateSector, deleteSector} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {sectorsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderSector = ({fields, languageOptions, sectorVocabularyOptions, sectorOptions, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }
    return (
        <div>
            {fields.map((sector, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            {
                                !sectorVocabularyOptions ?
                                    <GeneralLoader/> :
                                    <Field
                                        component={renderSelectField}
                                        name={`${sector}.vocabulary[code]`}
                                        textName={`${sector}.vocabulary[code]`}
                                        label="Sector vocabulary"
                                        selectOptions={sectorVocabularyOptions}
                                        defaultOption="Select one of the following options"
                                    />
                            }
                            <div className="columns small-6">
                                <Field
                                    name={`${sector}.vocabulary_uri`}
                                    textName={`${sector}.vocabulary_uri`}
                                    type="text"
                                    component={renderField}
                                    label="Vocabulary URI"
                                />
                            </div>
                            {
                                !sectorOptions ?
                                    <GeneralLoader/> :
                                    <Field
                                        component={renderSelectField}
                                        name={`${sector}.sector[code]`}
                                        textName={`${sector}.sector[code]`}
                                        label="Sector"
                                        selectOptions={sectorOptions}
                                        defaultOption="Select one of the following options"
                                    />
                            }
                            <div className="columns small-6">
                                <Field
                                    name={`${sector}.percentage`}
                                    type="number"
                                    component={renderField}
                                    label="Percentage"
                                />
                            </div>
                            <div className="row no-margin">
                                <div className="columns small-6">
                                    <Field
                                        name={`${sector}.sector[name]`}
                                        type="text"
                                        component={renderField}
                                        label="Sector Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${sector}.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                            />
                        </div>
                    </div>
                <div className="columns">
                    <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                    </button>
                    <button type="button" title="Remove Title" className="control-button remove float-right"
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

    if (!values.percentage) {
        errors.percentage = 'Required'
    }
    return errors
};

class SectorForm extends Component {

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
        const sectors = formData.sector;

        handleSubmit(
            publisher.id,
            'sector',
            activityId,
            data,
            sectors,
            this.props.createSector,
            this.props.updateSector,
            this.props.deleteSector,
        );
        this.props.router.push(`/publisher/activities/${this.props.activityId}/classifications/policy`);
    }

    componentWillMount() {
        this.props.getCodeListItems('SectorVocabulary');
        this.props.getCodeListItems('Sector');
        this.props.getCodeListItems('Language');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22

            // change each item
            newData.forEach((d, i) => this.props.change(`sector[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('sector', i)
            }
        }

        if ((nextProps.publisher && nextProps.publisher.id) && (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher
                || !(this.props.data && this.props.data.length))) {
            console.log('getSectors again');
            this.props.getSectors(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codelists, handleSubmit, submitting, activityId} = this.props;

        if (!codelists['SectorVocabulary'] || !codelists['Sector'] || !codelists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Sector</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="sector"
                        component={renderSector}
                        languageOptions={codelists["Language"]}
                        sectorVocabularyOptions={codelists["SectorVocabulary"]}
                        sectorOptions={codelists["Sector"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/geopolitical-information/location`}>Back to
                            Geopolitical</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Policy
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

SectorForm = reduxForm({
    form: 'classifications-sector',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(SectorForm);


function mapStateToProps(state, props) {
    const sector = sectorsSelector(state);

    return {
        data: sector,
        codelists: state.codelists,
        initialValues: {"sector": sector},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

SectorForm = connect(mapStateToProps, {
    getCodeListItems,
    getSectors,
    createSector,
    updateSector,
    deleteSector
})(SectorForm);

export default withRouter(SectorForm)
