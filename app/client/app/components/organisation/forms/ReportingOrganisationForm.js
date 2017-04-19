
import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../general/Loaders.react.jsx'
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import {renderField, renderSelectField, renderNarrativeFields} from '../../activity/helpers/FormHelper'
import { getReportingOrganisation, createReportingOrganisation, updateReportingOrganisation, deleteReportingOrganisation } from '../../../actions/organisation'
import { getCodeListItems } from '../../../actions/activity'
import { publisherSelector } from '../../../reducers/publisher'

const validate = values => {
    const errors = {};

    if (values.reporting_organisation) {
        const data = values.reporting_organisation;

        if (!data.ref) {
            errors.ref = 'Required'
        }

        if (!data.type) {
            errors.type = 'Required'
        }
    }

    return { reporting_organisation: errors };
};


class ReportingOrganisationForm extends PureComponent {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getCodeListItems('OrganisationType');
        this.props.getCodeListItems('Language');
    }

    /*
     * Submit reporting_organisation data and redirect
     * to basic information form.
     */
    handleFormSubmit(data) {
        const { publisher, organisation, reporting_organisation } = this.props;

        let promise;

        if (reporting_organisation) {
            // update
            promise = this.props.updateReportingOrganisation(
                publisher.id,
                organisation.id,
                reporting_organisation.id,
                {
                    ..._.pickBy(data.reporting_organisation, (val) => val !== null),
                    organisation: organisation.id,
                }
            )
        }
        else {
            // create
            promise = this.props.createReportingOrganisation(
                publisher.id,
                organisation.id,
                {
                    ..._.pickBy(data.reporting_organisation, (val) => val !== null),
                    organisation: organisation.id,
                }
            )
        }

        promise.then((result) => {
            if (!result.error) {
                // this.props.router.push(`/publisher/organisation/basic-info/description`)
            }
        }).catch((error) => console.log(error))
    }

    render() {
        const {submitting, organisation, handleSubmit, codeLists, isFetching, currentIATIIdentifier, publisher} = this.props;

        if (isFetching || !codeLists["OrganisationType"] || !codeLists["Language"]) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <Tooltip
                    text="An IATI Organisation"
                />
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Reporting Organisation</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                        <i className="material-icons">info</i>
                    </Tooltip>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)} name="reporting_organisation">
                    <div className="field-list">
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name="reporting_organisation.ref"
                                    type="text"
                                    id="ref"
                                    component={renderField}
                                    label="*Organisation ref"
                                />
                            </div>
                        </div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name="reporting_organisation.type[code]"
                                textName="reporting_organisation.type[code]"
                                label="Organisation type"
                                selectOptions={codeLists["OrganisationType"]}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name="reporting_organisation.narratives"
                                component={renderNarrativeFields}
                                languageOptions={codeLists["Language"]}
                                narrativeLabel={false}
                                textName="textName"
                                textLabel="Name"
                            />
                        </div>
                    </div>
                    <div className="columns small-12">
                        <button className="button" type="submit" disabled={submitting}>
                            Continue to budgets
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

ReportingOrganisationForm = reduxForm({
    form: 'reporting_organisation',     // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(ReportingOrganisationForm);


const selector = formValueSelector('reporting_organisation');

function mapStateToProps(state, props) {
    const isFetching = state.organisation.isFetching;

    return {
        isFetching: isFetching,
        submitting: state.organisation.submitting,
        organisation: state.organisation.organisation,
        reporting_organisation: state.organisation.organisation.reporting_org,
        codeLists: state.codeLists,
        initialValues: { "reporting_organisation": state.organisation.organisation.reporting_org },  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

ReportingOrganisationForm = connect(mapStateToProps, {
    getReportingOrganisation,
    createReportingOrganisation,
    updateReportingOrganisation,
    deleteReportingOrganisation,
    getCodeListItems,
})(ReportingOrganisationForm);

export default withRouter(ReportingOrganisationForm)
