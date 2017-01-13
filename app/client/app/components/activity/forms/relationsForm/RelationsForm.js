import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderField, renderSelectField} from '../../helpers/FormHelper'
import { getCodeListItems, getRelations, createRelations, updateRelations, deleteRelations } from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import { relationsSelector, publisherSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

const renderRelation = ({fields, relatedActivityTypeOptions, meta: {touched, dirty, error}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }
    return (
      <div>
          {fields.map((relations, index) =>
            <div key={index}>
              <hr/>
              <div className="field-list clearfix">
                <div className="row no-margin">
                  <Field
                    component={renderSelectField}
                    name={`${relations}.relatedActivityType`}
                    label='Type of Relationship'
                    selectOptions={relatedActivityTypeOptions}
                    defaultOption="Select one of the following options"
                  />
                  <div className="columns small-6">
                    <Field
                      name={`${relations}.activityIdentifier`}
                      type="text"
                      component={renderField}
                      label="Activity Identifier"
                    />
                  </div>
                </div>
                <div className="columns">
                  <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
                </div>
              </div>
                <div className="columns">
                  <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
                  <button
                  type="button"
                  title="Remove Title"
                  className="control-button remove float-right"
                  onClick={() => fields.remove(index)}>Delete
                  </button>
                    {touched && error && <span className="error">{error}</span>}
                </div>
            </div>
          )}
      </div>
)}

const validate = values => {
  const errors = {};

  if (!values.activityIdentifier || !values.relatedActivityType) {
    errors.type = 'Required'
  }
  return errors
};

class RelationsForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getCodeListItems('RelatedActivityType'));
  }

  /**
   * Submit relations data and redirect
   * to performance form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addRelations(formData, this.props.activity));
    this.context.router.push('/publisher/activity/performance')
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {handleSubmit, submitting, previousPage, codelists} = this.props;
    if (!codelists['RelatedActivityType']) {
          return <GeneralLoader />
    }

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Relations</h2>
            <hr />
            <p className="with-tip"><strong>Related Activity</strong></p>
            <Tooltip className="inline" tooltip="Description text goes here">
                <i className="material-icons">info</i>
            </Tooltip>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <FieldArray
            name="renderTitlesData"
            component={renderRelation}
            relatedActivityTypeOptions={codelists["RelatedActivityType"]}
          />
          <div className="row no-margin">
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to Document Link</button>
              <button className="button float-right" type="submit" disabled={submitting}>
                Continue to Performance
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    const contacts = relationsSelector(state)
    return {
        data: contacts,
        codelists: state.codelists,
        ...props,
    }
}

RelationsForm = reduxForm({
  form: 'relations',
  destroyOnUnmount: false,
  validate
})(RelationsForm);

RelationsForm = connect(mapStateToProps, {
    getCodeListItems,
    getRelations,
    createRelations,
    updateRelations,
    deleteRelations
})(RelationsForm);

export default RelationsForm;

