import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'

const renderAdditionalRenderPerformanceResultForm = ({fields, resultOptions, languageOptions, indicatorMeasureOptions,
      meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderPerformanceResultForm
          resultOptions={resultOptions}
          languageOptions={languageOptions}
          currencyOptions={currencyOptions}
          indicatorMeasureOptions={indicatorMeasureOptions}
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


const RenderPerformanceResultForm = ({resultOptions, languageOptions, indicatorMeasureOptions}) =>
 (
  <div>
    <div className="row">
      <Field
        component={renderSelectField}
        name="resultAttached"
        label="Result"
        selectOptions={resultOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <FieldArray
      name="additionalTitles"
      component={renderNarrativeFields}
      languageOptions={languageOptions}
      textName="textTitle"
      textLabel="Text"
      narrativeLabel="Description"
    />
    <FieldArray
      name="additionalDescriptions"
      component={renderNarrativeFields}
      languageOptions={languageOptions}
      textName="textTitle"
      textLabel="Text"
      narrativeLabel="Description"
    />
    <div className="row">
      <Field
        component={renderSelectField}
        name="indicatorMeasure"
        label="Measure"
        selectOptions={indicatorMeasureOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <div className="row">
      <FieldArray
        name="additionalTitle"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="textTitle"
        textLabel="Text"
        narrativeLabel="Title"
      />
    </div>
  </div>
);

class PerformanceResultForm extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('ResultType');
    this.props.getCodeListItems('Language');
    this.props.getCodeListItems('IndicatorMeasure');
  }

  render() {
    const {activity} = this.props;

    if (!activity["ResultType"] || !activity["Language"] || !activity["IndicatorMeasure"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Result</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderPerformanceResultForm
            resultOptions={activity["ResultType"]}
            languageOptions={activity["Language"]}
            indicatorMeasureOptions={activity["IndicatorMeasure"]}
          />
        </div>
        <FieldArray
          name="additionalHumanitarianScope"
          component={renderAdditionalRenderPerformanceResultForm}
          resultOptions={activity["ResultType"]}
          languageOptions={activity["Language"]}
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'PerformanceResultForm',     // a unique identifier for this form
})(PerformanceResultForm)
