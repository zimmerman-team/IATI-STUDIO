import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../general/Tooltip.react.jsx'


const renderField = ({input, label, type, readOnly, onChange, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} readOnly={readOnly}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderTitles = ({fields, meta: {touched, error}}) => (
  <div className="columns">
    <div className="field-list">
      <div className="row">
        <div className="columns small-6">
          <Field
            name={`${fields.name}[0].text`}
            type="text"
            id="title0"
            component={renderField}
            label="Title"
          />
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${fields.name}[0].language[code]`} component="select">
                <option></option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </Field>
            </div>
          </div>
        </div>
      </div>
      {fields.map((title, index) => {
        let newIndex = ++index;
        return (<div className="row" key={newIndex}>
          <button
            type="button"
            title="Remove Title"
            className="control-button remove"
            onClick={() => fields.remove(newIndex)}>Delete</button>
          <div className="columns small-6">
            <Field
              name={`${fields.name}[${newIndex}].text`}
              type="text"
              id={`title${newIndex}`}
              component={renderField}
              label="Title"
            />
          </div>
          <div className="columns small-6">
            <div>
              <label>Language</label>
              <div>
                <Field name={`${fields.name}[${newIndex}].language[code]`} component="select">
                  <option></option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </Field>
              </div>
            </div>
          </div>
        </div>)
      })}
      <div>
        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add Title</button>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.activityIdentifier) {
    errors.activityIdentifier = 'Required'
  }

  if(!values.title || !values.title.length) {
    errors.title = { _error: 'At least one member must be entered' }
  }

  // if (/[^\/\&\|\?]+/g.test(values.iati_identifier)) {
  //   errors.iati_identifier = 'Invalid data entered'
  // }

  if (!values.hierarchy) {
    errors.hierarchy = 'Required'
  }
  //console.log(errors)
  return errors
};


class IdentificationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  // handleChange(e) {
  //   //change IATI Identifier value
  //   //console.log("here");
  //   //this.props.dispatch(change('identification', 'iati_identifier', 'Bob'));
  //   //this.props.publishActivity(data);
  // }


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
            <FieldArray name="title[narratives]" component={renderTitles}/>
          </div>
          <div className="row">
            <div className="columns small-6">
              <Field
                name="activityIdentifier"
                type="text"
                id="activityIdentifier"
                component={renderField}
                label="Activity Identifier"
                //onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="columns small-6">
              <Field
                name="iati_identifier"
                type="text"
                id="iati_identifier"
                component={renderField}
                label="IATI Identifier"
                //readOnly="true"
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
  initialValues: {
    hierarchy: 1,
    xml_source_ref: 'dummy',
    default_lang: 'en'
  },
  validate

})(IdentificationForm)


