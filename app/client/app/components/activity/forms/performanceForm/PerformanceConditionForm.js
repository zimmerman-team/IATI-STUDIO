import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import Tooltip from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

const renderAdditionalRenderPerformanceConditionForm = ({fields, conditionOptions, languageOptions,
      meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderPerformanceConditionForm
          conditionOptions={conditionOptions}
          languageOptions={languageOptions}
        />
      </div>
    )}
    <div className="columns">
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
      <button
        type="button"
        title="Remove Title"
        className="control-button remove float-right"
        onClick={() => fields.pop()}>Delete
      </button>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);


const RenderPerformanceConditionForm = ({conditionOptions, languageOptions}) =>
 (
  <div>
    <div className="row">
      <Field
        component={renderSelectField}
        name="conditionAttached"
        label="Condition Attached"
        selectOptions={conditionOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <div className="row">
      <Field
        component={renderSelectField}
        name="conditionType"
        label="Condition Type"
        selectOptions={conditionOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <div className="row">
      <FieldArray
        name="additionalTitles"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="textTitle"
        textLabel="Text"
        narrativeLabel="Description"
      />
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.conditionType) {
    errors.type = 'Required'
  }
  return errors
};

class PerformanceConditionForm extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('ConditionType');
    this.props.getCodeListItems('Language');
  }

  render() {
    const {activity} = this.props;

    if (!activity["ConditionType"] || !activity["Language"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Condition</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderPerformanceConditionForm
            conditionOptions={activity["ConditionType"]}
            languageOptions={activity["Language"]}
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderPerformanceConditionForm}
          conditionOptions={activity["ConditionType"]}
          languageOptions={activity["Language"]}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

PerformanceConditionForm = reduxForm({
  form: 'performance-condition',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(PerformanceConditionForm);


PerformanceConditionForm = connect(mapStateToProps, {getCodeListItems, createActivity})(PerformanceConditionForm);
export default PerformanceConditionForm;

