import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {Link} from 'react-router';
import {renderField} from '../../helpers/FormHelper'
import {
    getCapital,
    createCapital,
    updateCapital,
    deleteCapital
} from '../../../../actions/activity'

import handleSubmit from '../../helpers/handleSubmit'


const validate = values => {
    const errors = {};

    if (!values.capitalSpend) {
        errors.type = 'Required'
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
        const {activityId, publisher, data} = this.props;
        const capitalSpend = formData.capital_spend;

        handleSubmit(
            publisher.id,
            'capital_spend',
            activityId,
            data,
            capitalSpend,
            this.props.createCapital,
            this.props.updateCapital,
            this.props.deleteCapital,
        );

        this.props.router.push(`/publisher/activities/${activityId}/basic-info/status`)
    }

    static contextTypes = {
        router: PropTypes.object,
    };

    render() {
        const {handleSubmit, submitting, activityId} = this.props;

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
                                        name="capital_spend"
                                        type="text"
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

function mapStateToProps(state) {
    return {
        activity: state.activity
    }
}

FinancialCapitalForm = reduxForm({
    form: 'financial-capital-form',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(FinancialCapitalForm);

FinancialCapitalForm = connect(mapStateToProps, {
    getCapital,
    createCapital,
    updateCapital,
    deleteCapital
})(FinancialCapitalForm);

export default FinancialCapitalForm;

