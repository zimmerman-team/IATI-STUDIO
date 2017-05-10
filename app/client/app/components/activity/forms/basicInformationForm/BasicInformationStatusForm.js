import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderSelectField} from '../../helpers/FormHelper'
import { Link } from 'react-router';
import { getCodeListItems, getActivity, updateActivity, } from '../../../../actions/activity'
import { statusSelector, publisherSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

class BasicInformationStatusForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

    /**
     * Submit basic information's description data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(data) {
        const { activityId, publisher } = this.props;

        this.props.updateActivity(publisher.id, {
            id: activityId,
            ...data.activity,
        });
        this.props.router.push(`/publisher/activities/${activityId}/basic-info/date`)
    }

    componentWillMount() {
        this.props.getCodeListItems('ActivityStatus');
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
    const {codeLists, handleSubmit, submitting, activityId, isFetching} = this.props;

    if (!codeLists["ActivityStatus"] || isFetching) {
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
              <div className="row no-margin">
                <Field
                  name="activity.activity_status.code"
                  textName="activity.activity_status.code"
                  component={renderSelectField}
                  label="Status"
                  selectOptions={codeLists["ActivityStatus"]}
                  defaultOption="Select status"
                />
              </div>
            </div>
            <div className="columns small-12">
              <Link className="button" to={`/publisher/activities/${activityId}/basic-info/description`}>Back to description</Link>
              <button className="button float-right" type="submit" disabled={submitting}>
                Continue to Date
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    const status = statusSelector(state);
    const isFetching = state.activity.isFetching;
    const { activityId } = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];

    return {
        data: status,
        isFetching: isFetching,
        codeLists: state.codeLists,
        activity: state.activity.activity,
        initialValues: {"activity": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

BasicInformationStatusForm = reduxForm({
  form: 'basic-info-status',     // a unique identifier for this form
  destroyOnUnmount: false,
  enableReinitialize: true,
})(BasicInformationStatusForm);

BasicInformationStatusForm = connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
    updateActivity,
})(BasicInformationStatusForm);

export default withRouter(BasicInformationStatusForm)
