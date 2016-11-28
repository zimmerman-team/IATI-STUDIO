import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'

class RelationsForm extends React.Component {

  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getCodeListItems('RelatedActivityType');
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;
    if (!activity['RelatedActivityType']) {
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
        <form onSubmit={handleSubmit}>
          <div className="field-list">
            <div className="row">
              <div className="columns small-6">
                <Field
                  component={renderSelectField}
                  name="relatedActivityType"
                  label='Type of Relationship'
                  selectOptions={activity["RelatedActivityType"]}
                  defaultOption="Select one of the following options"
                />
              </div>
              <div className="columns small-6">
                <Field
                  name="activityIdentifier"
                  type="text"
                  component={renderField}
                  label="Activity Identifier"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="columns small-12">
            <button type="button" className="button" onClick={previousPage}>Back to Classifications</button>
            <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
              Continue to Document Link
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default reduxForm({
  form: 'RelationsForm',
  destroyOnUnmount: false
})(RelationsForm)
