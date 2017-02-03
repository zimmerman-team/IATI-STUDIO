import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {Link} from 'react-router';
import {renderField} from '../../helpers/FormHelper'
import {getActivity, updateActivity} from '../../../../actions/activity'
import {publisherSelector} from '../../../../reducers/createActivity'
import {reduxForm} from  'redux-form'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

import {withRouter} from 'react-router'


const validate = values => {
    const errors = {};

    if (values.activity && values.activity != null && !values.activity.capital_spend) {
        errors.activity = {capital_spend: 'Required'}
    }

    return errors
};

class FinancialCapitalForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit financial's capital data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher} = this.props;

        this.props.updateActivity(publisher.id, {
            id: activityId,
            ...formData.activity,
        }).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/document-link/document-link`)
            }
        })
    }

    componentWillMount() {
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {handleSubmit, submitting, activityId, isFetching} = this.props;

        if (isFetching) {
            return <GeneralLoader/>
        }

        return (
            <div>
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Status</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                        <i className="material-icons">info</i>
                    </Tooltip>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <div className="field-list">
                            <div className=""><h6>Capital Spend</h6></div>
                            <div className="row no-margin">
                                <div className="columns small-6">
                                    <Field
                                        name="activity.capital_spend"
                                        type="number"
                                        component={renderField}
                                        label="Capital Spend"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="columns small-12">
                            <Link className="button" to={`/publisher/activities/${activityId}/financial/transaction`}>
                                Back to transaction
                            </Link>
                            <button className="button float-right" type="submit" disabled={submitting}>
                                Continue to documents
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

FinancialCapitalForm = reduxForm({
    form: 'financial-capital-form',     // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(FinancialCapitalForm);


function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    const isFetching = state.activity.isFetching;

    return {
        isFetching: isFetching,
        submitting: state.activity.submitting,
        activity: state.activity.activity,
        initialValues: {"activity": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

FinancialCapitalForm = connect(mapStateToProps, {
    getActivity,
    updateActivity,
})(FinancialCapitalForm);

export default withRouter(FinancialCapitalForm)

