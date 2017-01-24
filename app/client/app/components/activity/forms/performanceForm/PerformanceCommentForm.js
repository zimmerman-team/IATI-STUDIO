import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField} from '../../helpers/FormHelper'
import {connect} from 'react-redux'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import { withRouter, Link } from 'react-router';
import {
    getCodeListItems,
    getLegacyData,
    createLegacyData,
    updateLegacyData,
    deleteLegacyData
} from '../../../../actions/activity'
import {legacyDataSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import handleSubmit from '../../helpers/handleSubmit'

const renderPerformanceCommentForm = ({fields, meta: {touched, error,dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }

    return (
        <div>
          <div className="field-list clearfix">
              {fields.map((legacyData, index) =>
                  <div key={index}>
                      <div className="field-list">
                        <div className="row no-margin">
                          <div className="columns small-6">
                            <Field
                                name={`${legacyData}name`}
                                type="text"
                                component={renderField}
                                label="Name"
                            />
                          </div>
                          <div className="columns small-6">
                            <Field
                                name={`${legacyData}value`}
                                type="text"
                                component={renderField}
                                label="Value"
                            />
                          </div>
                        </div>
                        <div className="row no-margin">
                          <div className="columns small-6">
                            <Field
                                name={`${legacyData}iati_equivalent`}
                                type="text"
                                component={renderField}
                                label="IATI equivalent"
                            />
                          </div>
                        </div>
                      </div>
                    <div className="columns">
                      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                      </button>
                      <button
                          type="button"
                          title="Remove Title"
                          className="control-button remove float-right"
                          onClick={() => fields.remove(index)}>Delete
                      </button>
                        {touched && error && <span className="error">{error}</span>}
                    </div>
                    <br/><br/>
                  </div>
              )}
          </div>
        </div>
    )
};

const validate = values => {
    let errors = {};

    const legacyData = values.legacy_data || [];

    errors.legacy_data = legacyData.map(legacy => {
        let legacyErrors = {};

        if (!legacy.name) {
            legacyErrors.name = 'Required'
        }

        if (!legacy.value) {
            legacyErrors.value = 'Required'
        }

        return legacyErrors
    });

    return errors
};

class PerformanceCommentForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit performance's comment data
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const {activityId, data, publisher} = this.props

      handleSubmit(
          publisher.id,
          'legacy_data', // form key
          activityId,
          data,
          formData['legacy_data'],
          this.props.createLegacyData,
          this.props.updateLegacyData,
          this.props.deleteLegacyData
      ).then((result) => {
          if (!result.error) {
              this.props.router.push("/publisher/activities")
          }
      }).catch((e) => {
          console.log(e)
      })
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('participatingOrganisations', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`legacy_data[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('legacy_data', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher || !(this.props.data && this.props.data.length)) {
            if (nextProps.publisher) {
                this.props.getLegacyData(nextProps.publisher.id, nextProps.activityId)
            }
        }
    }

  render() {
    const {handleSubmit, submitting, activityId, data} = this.props;

      if (!data) {
          return <GeneralLoader/>
      }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Comment</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="row no-margin">
                <div className="columns small-12">
                    <h6>Participating organisation </h6>
                    <FieldArray
                        name="legacy_data"
                        component={renderPerformanceCommentForm}
                    />
                </div>
            </div>
            <div className="columns small-12">
                <Link className="button" to={`/publisher/activities/${activityId}/performance/result`}>Back to performance result</Link>
                <button className="button float-right" type="submit" disabled={submitting}>
                    Submit
                </button>
            </div>
        </form>
      </div>
    )
  }
}


PerformanceCommentForm = reduxForm({
    form: 'performance-comment',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate,
})(PerformanceCommentForm);

function mapStateToProps(state, props) {
    const legacy_data = legacyDataSelector(state);

    return {
        activity: state.activity,
        data: legacy_data,
        initialValues: {"legacy_data": legacy_data},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}


PerformanceCommentForm = connect(mapStateToProps, {
    getCodeListItems,
    getLegacyData,
    createLegacyData,
    updateLegacyData,
    deleteLegacyData
})(PerformanceCommentForm);

export default withRouter(PerformanceCommentForm);
