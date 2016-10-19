import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import {Tooltip } from '../general/Tooltip.react.jsx'
import { toggleMainMenu } from '../../actions/sync'
import { publishActivity }       from '../../actions/async'
import store from '../../app'


class ActivityEdit extends React.Component {

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(e)
    //this.props.publishActivity(e)
  }

  componentDidMount() {
    store.dispatch(toggleMainMenu(false))
  }

  render() {
    return (
      <ActivityForm  onSubmit={this.handleSubmit} />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    // publisher: state.publisher,
    // navState: state.navState
  }
}

export default connect(mapStateToProps, {
  toggleMainMenu,
  publishActivity
})(ActivityEdit)


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const renderParticipatingOrgs = ({ fields }) => (
  <ul className="field-list">

    <li>
      <h6>Participating Organisation #1</h6>

      <div className="columns small-6">
        <Field
          name="ref"
          type="text"
          component={renderField}
          label="Ref"/>
      </div>
      <div className="columns small-6">
        <Field
          name="activity-id"
          type="text"
          component={renderField}
          label="Activity-id"/>
      </div>

      <div className="columns small-6">
        <Field
          name="role"
          type="text"
          component={renderField}
          label="Role"/>
      </div>
      <div className="columns small-6">
        <Field
          name="type"
          type="text"
          component={renderField}
          label="Type"/>
      </div>

      <FieldArray name="narratives" component={renderNarratives}/>
    </li>

    {fields.map((participating_org, index) =>
      <li key={index}>
        <h6>Participating Organisation #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org}.ref`}
            type="text"
            component={renderField}
            label="Ref"/>
        </div>
        <div className="columns small-6">
          <Field
            name={`${participating_org}.role`}
            type="text"
            component={renderField}
            label="Role"/>
        </div>
        <div className="columns small-6">
          <Field
            name={`${participating_org}.type`}
            type="text"
            component={renderField}
            label="Type"/>
        </div>
        <div className="columns small-6">
          <Field
            name={`${participating_org}.activity-id`}
            type="text"
            component={renderField}
            label="activity-id"/>
        </div>
        <FieldArray name={`${participating_org}.narratives`} component={renderNarratives}/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Remove</button>
      </li>
    )}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add participating organisation</button>
    </li>
  </ul>
)

const renderNarratives = ({ fields, meta: { error } }) => (
  <ul className="field-list">
    <li>
      <Field
        name="narrative"
        type="text"
        component={renderField}
        label="Narrative #1"/>
    </li>
    {fields.map((narrative, index) =>
      <li key={index}>
        <Field
          name={narrative}
          type="text"
          component={renderField}
          label={`Narrative #${index + 2}`} />
        <button
          type="button"
          title="Remove Narrative"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Remove</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add narrative</button>
    </li>
  </ul>
)


const validate = values => {
  const errors = {}

  if (!values.activityIdentifier) {
    errors.activityIdentifier = 'Required'
  } else if (/[^\/\&\|\?]+/g.test(values.activityIdentifier)) {
    errors.activityIdentifier = 'Invalid data entered'
  }

  return errors
}


const changeIatiIdentifier = otherField =>
  (value, previousValue, allValues) => value


const ActivityForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
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

          <div className="columns small-6">
            <Field
              name="activityIdentifier"
              normalize={changeIatiIdentifier('iatiIdentifier')}
              type="text"
              component={renderField} label="Activity Identifier"/>
          </div>
          <div className="columns small-6">
            <Field name="iatiIdentifier" type="text" component={renderField} label="IATI Identifier" readonly="true" />
          </div>
          <div className="columns small-6">
            <Field name="hierarchyField" type="number" component={renderField} label="Hierarchy" />
          </div>

          <div className="columns small-12">
            <FieldArray name="participating-org" component={renderParticipatingOrgs}/>
          </div>

          <div className="columns small-12">
            <button className="button" type="submit" disabled={submitting}>Submit</button>
            <button className="button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'syncValidation',     // a unique identifier for this form
  validate

})(ActivityForm)