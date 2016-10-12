import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderMembers = ({ fields }) => (
  <ul className="field-list">

    <li>
      <h6>Member #1</h6>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"/>
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"/>
      <FieldArray name="hobbies" component={renderHobbies}/>
    </li>

    {fields.map((member, index) =>
      <li key={index}>
        <h6>Member #{index + 2}</h6>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"/>
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"/>
        <FieldArray name={`${member}.hobbies`} component={renderHobbies}/>
        <button
          type="button"
          title="Remove Member"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Remove</button>
      </li>
    )}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add Member</button>
    </li>
  </ul>
)

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul className="field-list">
    <li>
      <Field
        name="hobby"
        type="text"
        component={renderField}
        label="Hobby #1"/>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 2}`}/>
        <button
          type="button"
          title="Remove Hobby"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Remove</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
  </ul>
)

const FieldArraysForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="row">
      <div className="columns small-12">
        <form onSubmit={handleSubmit}>
          <Field name="clubName" type="text" component={renderField} label="Club Name"/>
          <FieldArray name="members" component={renderMembers}/>
          <div>
            <button className="button" type="submit" disabled={submitting}>Submit</button>
            <button className="button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form

})(FieldArraysForm)