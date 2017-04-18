import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../general/Loaders.react.jsx'
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import {renderField, renderSelectField, renderNarrativeFields} from '../../activity/helpers/FormHelper'
import { getOrganisation, updateOrganisation } from '../../../actions/organisation'
import { getCodeListItems } from '../../../actions/activity'
import { publisherSelector } from '../../../reducers/publisher'

const validate = values => {
    const errors = {};

    if (values.organisation) {
        const organisationData = values.organisation;

        if (!organisationData.organisation_identifier) {
            errors.organisation_identifier = 'Required'
        }

        if (!organisationData.title || !organisationData.title.narratives.length || !organisationData.title.narratives[0].text) {
            errors.title = {
                narratives: {
                    _error: 'Required'
                }
            }
        }
    }

    return { organisation: errors };
};


class IdentificationForm extends PureComponent {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // componentWillMount() {
    //     this.props.getCodeListItems('Language');
    //     if (this.props.publisher && this.props.publisher.id) {
    //         this.props.getOrganisation(this.props.publisher.id, this.props.organisationId)
    //     }
    // }

    // componentWillUpdate(nextProps) {
    //     if (this.props.organisationId !== nextProps.organisationId || this.props.publisher !== nextProps.publisher) {
    //         this.props.getOrganisation(nextProps.publisher.id, nextProps.organisationId)
    //     }
    // }

    /*
     * Submit identification data and redirect
     * to basic information form.
     */
    handleFormSubmit(data) {
        const { publisher, organisation } = this.props;

        this.props.updateOrganisation(publisher.id, {
            id: organisation.id,
            ...data.organisation,
        }).then((result) => {
            if (!result.error) {
                // this.props.router.push(`/publisher/organisation/basic-info/description`)
            }
        });
    }

    render() {
        const {submitting, organisation, handleSubmit, codeLists, organisationId, isFetching, currentIATIIdentifier, publisher} = this.props;

        if (isFetching || !organisation && !codeLists["Language"]) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <Tooltip
                    text="An IATI Organisation"
                />
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Identification</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                        <i className="material-icons">info</i>
                    </Tooltip>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)} name="identification">
                    <div className="field-list">
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name="organisation.organisation_identifier"
                                    type="text"
                                    id="organisation_identifier"
                                    component={renderField}
                                    label="*Organisation Identifier"
                                />
                            </div>
                            <div className="columns small-6" style={{"paddingTop": "5px"}}>
                                IATI Identifier
                                <div style={{"paddingTop": "7px"}}>
                                    { currentIATIIdentifier }
                                </div>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name="organisation.title.narratives"
                                component={renderNarrativeFields}
                                languageOptions={codeLists["Language"]}
                                narrativeLabel={false}
                                textName="textTitle"
                                textLabel="Title"
                            />
                        </div>
                    </div>
                    <div className="columns small-12">
                        <button className="button" type="submit" disabled={submitting}>
                            Continue to basic information
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

IdentificationForm = reduxForm({
    form: 'identification',     // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(IdentificationForm);


const selector = formValueSelector('identification');

function mapStateToProps(state, props) {
    const isFetching = state.organisation.isFetching;
    const currentIATIIdentifier = selector(state, 'organisation.organisation_identifier');

    return {
        isFetching: isFetching,
        submitting: state.organisation.submitting,
        organisation: state.organisation.organisation,
        codeLists: state.codeLists,
        currentIATIIdentifier: currentIATIIdentifier,
        initialValues: { "organisation": state.organisation.organisation },  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

IdentificationForm = connect(mapStateToProps, {
    getOrganisation,
    updateOrganisation,
    getCodeListItems
})(IdentificationForm);

export default withRouter(IdentificationForm)
