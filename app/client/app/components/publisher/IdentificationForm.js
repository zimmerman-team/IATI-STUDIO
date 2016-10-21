import React from 'react'
import {Field, reduxForm, change} from 'redux-form'
import {Tooltip} from '../general/Tooltip.react.jsx'


const renderField = ({input, label, type, readOnly, onChange, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} readOnly={readOnly} onChange={onChange}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.activityIdentifier) {
    errors.activityIdentifier = 'Required'
  }

  if (/[^\/\&\|\?]+/g.test(values.iati_identifier)) {
    errors.iati_identifier = 'Invalid data entered'
  }

  if (!values.hierarchy) {
    errors.hierarchy = 'Required'
  }

  return errors
};


class IdentificationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  handleChange(e) {
    //change IATI Identifier value
    //console.log("here");
    //this.props.dispatch(change('identification', 'iati_identifier', 'Bob'));
    //this.props.publishActivity(data);
  }


  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit} name="identification">
          <div className="row">

            <div className="columns small-6">
              <Field
                name="activityIdentifier"
                type="text"
                id="activityIdentifier"
                component={renderField}
                label="Activity Identifier"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="columns small-6">
              <Field
                name="iati_identifier"
                type="text"
                id="iati_identifier"
                component={renderField}
                label="IATI Identifier"
                readOnly="true"
              />
            </div>
            <div className="columns small-6">
              <Field
                name="hierarchy"
                type="number"
                id="hierarchy"
                component={renderField}
                label="Hierarchy"
              />
            </div>

            <div className="columns small-12">
              <button className="button" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to basic information
              </button>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'syncValidation',     // a unique identifier for this form
  initialValues: {hierarchy: 1},
  validate

})(IdentificationForm)

