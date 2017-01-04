import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderSelectField} from '../../helpers/FormHelper'
import { Link } from 'react-router';
import { getCodeListItems, getStatus, updateStatus } from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import { statusesSelector } from '../../../../reducers/createActivity.js'
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
                  name="status"
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
    const contacts = statusesSelector(state)

    return {
        data: contacts,
        codelists: state.codelists,
        ...props,
    }
}

BasicInformationStatusForm = reduxForm({
  form: 'basic-info-status',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(BasicInformationStatusForm);

BasicInformationStatusForm = connect(mapStateToProps, {
    getCodeListItems,
    getStatus,
    updateStatus,
})(BasicInformationStatusForm);

export default withRouter(BasicInformationStatusForm)
