import React, { Component, PropTypes } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import { getCodeListItems, getPolicy, createPolicy, updatePolicy, deletePolicy } from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import { policySelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

const renderPolicy = ({fields, languageOptions, policyCodeOptions, policyVocabularyOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <div className="row no-margin">
          <Field
            component={renderSelectField}
            name="policyMarkerVocabulary[code]"
            label="Vocabulary"
            selectOptions={activity["PolicyMarkerVocabulary"]}
            defaultOption="Select one of the following options"
          />
          <div className="columns small-6">
            <Field
              name="vocabulary_uri"
              type="text"
              component={renderField}
              label="Vocabulary URI"
            />
          </div>
        </div>
        <div className="row no-margin">
          <Field
            component={renderSelectField}
            name="significance[code]"
            label="Significance"
            selectOptions={activity["PolicySignificance"]}
            defaultOption="Select one of the following options"
          />
          <Field
            component={renderSelectField}
            name="policy[code]"
            label="Policy Marker"
            selectOptions={activity["PolicyMarker"]}
            defaultOption="Select one of the following options"
          />
        </div>
        <div className="row no-margin">
          <FieldArray
            name={`${description}.additionalPolicy`}
            component={renderNarrativeFields}
            narrativeAddMore={false}
            languageOptions={languageOptions}
            textName="textPolicy"
            textLabel="Title"
          />
        </div>
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

const validate = values => {
  const errors = {};

  if (!values.vocabulary_uri) {
    errors.type = 'Required'
  }
  return errors
};

class PolicyMakerForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit classification's policy data.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const { activityId, data, tab, subTab } = this.props
      const lastPolicy = data;
      const policy = formData.policy;

      handleSubmit(
          'policy',
          activityId,
          lastPolicy,
          policy,
          this.props.createPolicy,
          this.props.updatePolicy,
          this.props.deletePolicy,
      )
      //this.context.router.push('/publisher/activity/classifications/select');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCodeListItems('PolicyMarker');
    this.props.getCodeListItems('PolicyMarkerVocabulary');
    this.props.getCodeListItems('PolicySignificance');
    this.props.getCodeListItems('Language');
  }

  render() {
    const {activity, handleSubmit, submitting} = this.props;

    if (!activity['PolicyMarker'] || !activity['PolicyMarkerVocabulary'] || !activity['PolicySignificance'] || !activity['Language']) {
      return <GeneralLoader />
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Policy Makers</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <div className="row no-margin">
              <Field
                component={renderSelectField}
                name="policyMarkerVocabulary[code]"
                label="Vocabulary"
                selectOptions={activity["PolicyMarkerVocabulary"]}
                defaultOption="Select one of the following options"
              />
              <div className="columns small-6">
                <Field
                  name="vocabulary_uri"
                  type="text"
                  component={renderField}
                  label="Vocabulary URI"
                />
              </div>
            </div>
            <div className="row no-margin">
              <Field
                component={renderSelectField}
                name="significance[code]"
                label="Significance"
                selectOptions={activity["PolicySignificance"]}
                defaultOption="Select one of the following options"
              />
              <Field
                component={renderSelectField}
                name="policy[code]"
                label="Policy Marker"
                selectOptions={activity["PolicyMarker"]}
                defaultOption="Select one of the following options"
              />
            </div>
            <div className="row no-margin">
              <FieldArray
                name="additionalTitles"
                component={renderNarrativeFields}
                narrativeAddMore={false}
                languageOptions={activity["Language"]}
                textName="textPolicyTitle"
                textLabel="Title"
              />
            </div>
          </div>
          <FieldArray
            name="additionalPolicy"
            component={renderPolicy}
            languageOptions={activity["Language"]}
            policyCodeOptions={activity["PolicyMarker"]}
            policyVocabularyOptions={activity["PolicyMarkerVocabulary"]}
          />
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/classifications/sector">Back to Sector</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to Selection
            </button>
          </div>
        </form>
      </div>
    )
  }
}


function mapStateToProps(state, props) {
    const policy = policySelector(state)

    return {
        data: policy,
        codelists: state.codelists,
        ...props,
    }
}

PolicyMakerForm = reduxForm({
    form: 'classifications-policy-maker',     // a unique identifier for this form
    destroyOnUnmount: false,
    validate
})(PolicyMakerForm);

PolicyMakerForm = connect(mapStateToProps, {
    getCodeListItems,
    getPolicy,
    createPolicy,
    updatePolicy,
    deletePolicy
})(PolicyMakerForm);

export default withRouter(PolicyMakerForm);