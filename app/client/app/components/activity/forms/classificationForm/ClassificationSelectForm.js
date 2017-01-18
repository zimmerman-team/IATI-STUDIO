import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCodeListItems, createActivity, addClassificationSelect} from '../../../../actions/activity'
import {RenderSingleSelect} from '../../helpers/FormHelper'

const validate = values => {
    const errors = {};
    if (!values.collaborationType) {
        errors.collaborationType = 'Required'
    }
    return errors
};

class ClassificationSelectForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit classification's select data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        this.props.dispatch(addClassificationSelect(formData, this.props.activity));
        this.context.router.push('/publisher/activities/classifications/country');
    }

    static contextTypes = {
        router: PropTypes.object,
    };

    componentWillMount() {
        this.props.getCodeListItems('CollaborationType');
        this.props.getCodeListItems('FlowType');
        this.props.getCodeListItems('FinanceType');
        this.props.getCodeListItems('AidType');
        this.props.getCodeListItems('TiedStatus');
    }

    render() {
        const {codelists, handleSubmit, submitting} = this.props;

        if (!codelists['CollaborationType'] || !codelists['FlowType'] || !codelists['FinanceType']
            || !codelists['AidType'] || !codelists['TiedStatus']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Classification Types</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="field-list">
                        <RenderSingleSelect
                            name='collaboration_type'
                            label='Collaboration Type'
                            selectOptions={codelists['CollaborationType']}/>
                        <RenderSingleSelect
                            name='default_flow_type'
                            label='Default Flow Type'
                            selectOptions={codelists['FlowType']}/>
                        <RenderSingleSelect
                            name='default_finance_type'
                            label='Default Finance Type'
                            selectOptions={codelists['FinanceType']}/>
                        <RenderSingleSelect
                            name='default_aid_type'
                            label='Default Aid Type'
                            selectOptions={codelists['AidType']}/>
                        <RenderSingleSelect
                            name='default_tied_status'
                            label='Default Tied Type'
                            selectOptions={codelists['TiedStatus']}/>
                    </div>
                    <div className="columns small-12">
                        <Link className="button" to="/publisher/activities/classifications/policy">Back to policy</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Country
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activity: state.activity,
        codelists: state.codelists
    }
}

ClassificationSelectForm = reduxForm({
    form: 'classifications-select',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(ClassificationSelectForm);


ClassificationSelectForm = connect(mapStateToProps, {getCodeListItems, createActivity})(ClassificationSelectForm);
export default ClassificationSelectForm;