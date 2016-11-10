import React from 'react'
import {reduxForm} from 'redux-form'
import SectorForm from './ClassificationSectorForm'
import PolicyMakerForm from './ClassificationPolicyForm'

class ClassificationsForm extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Classifications</h2>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <SectorForm {...this.props} />
          <PolicyMakerForm {...this.props} />
          <div className="row">
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to Geopolitical Form</button>
              <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to Classification Form
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default reduxForm({
  form: 'ClassificationForm',
  destroyOnUnmount: false
})(ClassificationsForm)
