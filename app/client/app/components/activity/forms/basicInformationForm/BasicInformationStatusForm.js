import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderSelectField} from '../../helpers/FormHelper'
import { Link } from 'react-router';
import { getCodeListItems, getActivity, updateActivity, } from '../../../../actions/activity'
import { statusesSelector, publisherSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

const validate = values => {
  const errors = {};

  if (!values.status) {
    errors.type = 'Required'
  }
  return errors
};

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
    handleFormSubmit(formData) {
        const { activityId, tab, subTab, publisher, data } = this.props

        this.props.updateActivity(publisher.id, {
            id: activityId,
            ...data,
        })
        this.props.router.push(`/publisher/activities/${activityId}/basic-info/status`)
    }

  /**
   * Submit basic information's status data and redirect to status form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const { activityId, data, tab, subTab } = this.props
      this.props.dispatch(this.props.updateStatus(activityId, null, formData.status));
      //this.context.router.push('/publisher/activity/basic-info/date');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('ActivityStatus');
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('status', newData);

            // change each item
            newData.forEach((d,i) => this.props.change(`status[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('status', i)
            }
        }

        console.log(nextProps.publisher);

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getStatus(nextProps.publisher.id, nextProps.activityId)
        }
    }

  render() {
    const {codelists, handleSubmit, submitting} = this.props;

    if (!codelists["ActivityStatus"]) {
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
                  name="activity_status"
                  textName="activity_status"
                  component={renderSelectField}
                  label="Status"
                  selectOptions={codelists["ActivityStatus"]}
                  defaultOption="Select status"
                />
              </div>
            </div>
            <div className="columns small-12">
              <Link className="button" to="/publisher/activity/basic-info/description">Back to description</Link>
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
    const status = statusesSelector(state)

    return {
        data: status,
        codelists: state.codelists,
        initialValues: {"status": status},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

BasicInformationStatusForm = reduxForm({
  form: 'basic-info-status',     // a unique identifier for this form
  destroyOnUnmount: false,
    enableReinitialize: true,
  validate
})(BasicInformationStatusForm);

BasicInformationStatusForm = connect(mapStateToProps, {
    getCodeListItems,
    getActivity,
    updateActivity,
})(BasicInformationStatusForm);

export default withRouter(BasicInformationStatusForm)
