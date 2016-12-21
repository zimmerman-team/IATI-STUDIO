import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderSelectField} from '../../helpers/FormHelper'
import { Link } from 'react-router';
import { getCodeListItems, createActivity, addBasicInformationStatus } from '../../../../actions/activity'

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
   * Submit basic information's status data and redirect to status form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addBasicInformationStatus(formData, this.props.activity));
    this.context.router.push('/publisher/activity/basic-info/date');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('ActivityStatus');
  }

  render() {
    const {activity, handleSubmit, submitting} = this.props;

    if (!activity["ActivityStatus"]) {
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
                  name="status"
                  component={renderSelectField}
                  label="Status"
                  selectOptions={activity["ActivityStatus"]}
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

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

BasicInformationStatusForm = reduxForm({
  form: 'basic-info-status',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(BasicInformationStatusForm);

BasicInformationStatusForm = connect(mapStateToProps,
  {getCodeListItems, createActivity})(BasicInformationStatusForm);

export default BasicInformationStatusForm;
