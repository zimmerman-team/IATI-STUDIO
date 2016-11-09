import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import DescriptionForm from './BasicInformationDescriptionForm'
import DateForm from './BasicInformationDateForm'
import ContactForm from './BasicInformationContactForm'

class BasicInformationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  //@todo: Move IATI activity editor to separate component.
  render() {
    const {handleSubmit, pristine, reset, submitting, previousPage, activity} = this.props;
    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <DescriptionForm activity={activity} />
          </div>
          <div className="row">
            <div className="columns small-centered small-12">
              <h2 className="page-title with-tip">Status</h2>
              <Tooltip className="inline" tooltip="Status text goes here">
                <i className="material-icons">info</i>
              </Tooltip>
            </div>
            <div className="row">
              <div className="columns small-6">
                <div>
                  <div>
                    <Field name="status" component="select">
                      <option>Select status</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <DateForm activity={activity}/>
            </div>
            <div>
              <ContactForm activity={activity}/>
            </div>
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to identification</button>
              <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to participating organisations
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',
  destroyOnUnmount: false,

})(BasicInformationForm)
