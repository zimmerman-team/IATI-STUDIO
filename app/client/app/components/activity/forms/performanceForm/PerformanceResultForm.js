import React, { Component, PropTypes } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import { getCodeListItems, createActivity, addPerformanceResult } from '../../../../actions/activity'

const renderAdditionalRenderPerformanceResultForm = ({fields, resultOptions, languageOptions, indicatorMeasureOptions,
    indicatorVocabularyOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderPerformanceResultForm
          resultOptions={resultOptions}
          languageOptions={languageOptions}
          indicatorMeasureOptions={indicatorMeasureOptions}
          indicatorVocabularyOptions={indicatorVocabularyOptions}
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


const RenderPerformanceResultForm = ({resultOptions, languageOptions, indicatorMeasureOptions, indicatorVocabularyOptions}) =>
 (
  <div>
    <div className="row">
      <Field
        component={renderSelectField}
        name="resultAttached"
        label="Type"
        selectOptions={resultOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <FieldArray
      name="additionalTitles"
      component={renderNarrativeFields}
      languageOptions={languageOptions}
      textName="additionalTitles"
      textLabel="Text"
      narrativeLabel="Title"
    />
    <FieldArray
      name="additionalDescriptions"
      component={renderNarrativeFields}
      languageOptions={languageOptions}
      textName="additionalDescriptions"
      textLabel="Descriptions"
      narrativeLabel="Description"
    />
    <div className="row no-margin">
      <Field
        component={renderSelectField}
        name="indicatorMeasure"
        textName="indicatorMeasure"
        textLabel="Measure"
        selectOptions={indicatorMeasureOptions}
        defaultOption="Select one of the following options"
      />
    </div>
    <div className="row no-margin">
      <FieldArray
        name="additionalTitle"
        component={renderNarrativeFields}
        languageOptions={languageOptions}
        textName="textTitle"
        textLabel="Text"
        narrativeLabel="Title"
      />
    </div>
    <div className="row no-margin">
      <Field
        component={renderSelectField}
        name="vocabulary"
        label="Vocabulary"
        selectOptions={indicatorVocabularyOptions}
        defaultOption="Select one of the following options"
      />
      <div className="columns small-6">
        <Field
          name="Code"
          type="text"
          component={renderField}
          label="Code"
        />
      </div>
    </div>
    <div className="row no-margin">
      <Field
        component={renderSelectField}
        name="indicatorURI"
        label="Indicator URI"
        selectOptions={indicatorMeasureOptions}
        defaultOption="Select one of the following options"
      />
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Baseline</h2>
        <div className="row no-margin">
          <div className="columns small-6">
            <Field
              name="year"
              type="text"
              component={renderField}
              label="Year"
            />
          </div>
          <div className="columns small-6">
            <Field
              name="value"
              type="text"
              component={renderField}
              label="Value"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Comment</h2>
        <FieldArray
          name="additionalTitle"
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName="textTitle"
          textLabel="Description"
          narrativeLabel="Description"
        />
      </div>
    </div>
    <div className="row no-margin">
      <div className="columns small-6">
        Period start
        <Field
          name="dateStart"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>
    <div className="row no-margin">
      <div className="columns small-6">
        Period end
        <Field
          name="dateEnd"
          type="date"
          component={renderField}
          label="Date"
        />
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Target</h2>
        <div className="columns small-6">
          <Field
            name="value"
            type="text"
            component={renderField}
            label="Value"
          />
        </div>
        <div className="columns small-6"></div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Location</h2>
        <div className="columns small-6">
          <Field
            name="ref"
            type="text"
            component={renderField}
            label="Ref"
          />
        </div>
        <div className="columns small-6"></div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Dimension</h2>
        <div className="row no-margin">
          <div className="columns small-6">
            <Field
              name="name"
              type="text"
              component={renderField}
              label="Name"
            />
          </div>
          <div className="columns small-6">
            <Field
              name="value"
              type="text"
              component={renderField}
              label="Value"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Comment</h2>
        <FieldArray
          name="additionalTitle"
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName="textTitle"
          textLabel="Text"
          narrativeLabel="Text"
        />
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Actual</h2>
        <div className="columns small-6">
          <Field
            name="value"
            type="text"
            component={renderField}
            label="Value"
          />
        </div>
        <div className="columns small-6"></div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Location</h2>
        <div className="columns small-6">
          <Field
            name="ref"
            type="text"
            component={renderField}
            label="Ref"
          />
        </div>
        <div className="columns small-6"></div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Dimension</h2>
        <div className="row no-margin">
          <div className="columns small-6">
            <Field
              name="name"
              type="text"
              component={renderField}
              label="Name"
            />
          </div>
          <div className="columns small-6">
            <Field
              name="value"
              type="text"
              component={renderField}
              label="Value"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="row no-margin">
      <div className="columns small-centered small-12">
        <h2 className="page-title">Comment</h2>
        <FieldArray
          name="additionalTitle"
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName="textTitle"
          textLabel="Text"
          narrativeLabel="Text"
        />
      </div>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.ref) {
    errors.ref = 'Required'
  }
  return errors
};

class PerformanceResultForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  /**
   * Submit performance's comment data and redirect to comment form
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addPerformanceResult(formData, this.props.activity));
    this.context.router.push('/publisher/activity/performance/comment');
  }

  componentWillMount() {
    this.props.getCodeListItems('ResultType');
    this.props.getCodeListItems('Language');
    this.props.getCodeListItems('IndicatorMeasure');
    this.props.getCodeListItems('IndicatorVocabulary');
  }

  render() {
    const {handleSubmit, submitting, activity} = this.props;

    if (!activity["ResultType"] || !activity["Language"] || !activity["IndicatorMeasure"] || !activity["IndicatorVocabulary"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Result</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <RenderPerformanceResultForm
              resultOptions={activity["ResultType"]}
              languageOptions={activity["Language"]}
              indicatorMeasureOptions={activity["IndicatorMeasure"]}
              indicatorVocabularyOptions={activity["IndicatorVocabulary"]}
            />
          </div>
          <FieldArray
            name="additionalHumanitarianScope"
            component={renderAdditionalRenderPerformanceResultForm}
            resultOptions={activity["ResultType"]}
            languageOptions={activity["Language"]}
          />
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/performance/condition">Back to performance condition</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to performance comment
            </button>
          </div>
        </form>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

PerformanceResultForm = reduxForm({
  form: 'performance-result',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(PerformanceResultForm);


PerformanceResultForm = connect(mapStateToProps, {getCodeListItems, createActivity})(PerformanceResultForm);
export default PerformanceResultForm;

