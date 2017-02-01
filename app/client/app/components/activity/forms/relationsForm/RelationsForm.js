import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderField, renderSelectField} from '../../helpers/FormHelper'
import {
    getCodeListItems,
    getRelation,
    createRelation,
    updateRelation,
    deleteRelation
} from '../../../../actions/activity'
import {publisherSelector} from '../../../../reducers/createActivity.js'
import {Link} from 'react-router';
import {withRouter} from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const renderRelation = ({fields, relatedActivityTypeOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
            {fields.map((relations, index) =>
                <div key={index}>
                    <div className="field-list clearfix">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${relations}.type[code]`}
                                textName={`${relations}type.code`}
                                label='Type of Relationship'
                                selectOptions={relatedActivityTypeOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${relations}.ref`}
                                    type="text"
                                    component={renderField}
                                    label="Activity Identifier"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>
                            Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Title"
                            className="control-button remove float-right"
                            onClick={() => fields.remove(index)}
                        >
                            Delete
                        </button>
                        {touched && error && <span className="error">{error}</span>}
                    </div>
                    <br/>
                </div>
            )}
        </div>
    )
};

const validate = values => {
    let errors = {};

    const relations = values.related_activities || [];

    errors.related_activities = relations.map(relationData => {
        let relationErrors = {};

        if (!relationData.type) {
            relationErrors.type = {code: 'Required'}
        }

        if (!relationData.ref) {
            relationErrors.ref = 'Required'
        }

        return relationErrors
    });

    return errors
};

class RelationsForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getCodeListItems('RelatedActivityType'));
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getActivity(this.props.publisher.id, this.props.activityId)
        }
    }


    /**
     * Submit relations data and redirect
     * to performance form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher, data} = this.props;
        const relationData = formData.related_activities;

        handleSubmit(
            publisher.id,
            'related_activities',
            activityId,
            data,
            relationData,
            this.props.createRelation,
            this.props.updateRelation,
            this.props.deleteRelation,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/performance/condition`)
            }
        }).catch((e) => {
            console.log(e)
        })
    }


    componentWillUpdate(nextProps) {
        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {handleSubmit, submitting, previousPage, codeLists, activityId} = this.props;

        if (!codeLists['RelatedActivityType']) {
            return <GeneralLoader />
        }

        return (
            <div>
                <div className="row controls">
                    <div className="columns small-centered small-12">
                        <h2 className="page-title with-tip">Relations</h2>
                        <hr />
                        <p className="with-tip"><strong>Related Activity</strong></p>
                        <Tooltip className="inline" tooltip="Description text goes here">
                            <i className="material-icons">info</i>
                        </Tooltip>
                    </div>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="related_activities"
                        component={renderRelation}
                        relatedActivityTypeOptions={codeLists["RelatedActivityType"]}
                    />
                    <div className="columns small-12">
                        <Link className="button" to={`/publisher/activities/${activityId}/document-link/document-link`}>Back
                            to Document Link</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Performance
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    let related_activities = currentActivity && currentActivity.related_activities;

    return {
        data: related_activities,
        codeLists: state.codeLists,
        initialValues: {"related_activities": related_activities},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

RelationsForm = reduxForm({
    form: 'related_activities',
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(RelationsForm);

RelationsForm = connect(mapStateToProps, {
    getCodeListItems,
    getRelation,
    createRelation,
    updateRelation,
    deleteRelation
})(RelationsForm);

export default withRouter(RelationsForm);

