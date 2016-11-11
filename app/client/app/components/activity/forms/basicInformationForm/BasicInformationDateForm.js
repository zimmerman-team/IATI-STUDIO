import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'

const renderDate = ({fields, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div key={index}>
        <div className="columns small-6">
          <Field
            name={`${description}.date`}
            type="text"
            component={renderField}
            label="Date"
          />
        </div>
        <hr/>
        <FieldArray
          name={`${description}.additionalNarratives`}
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName={`${description}.narrativeText`}
          textLabel="Title"
        />
      </div>
    )}
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.date) {
    errors.type = 'Required'
  }

  if (!values.narrative) {
    const narrativeTextObj = {};
    narrativeTextObj.text = 'Required';
    errors.narrative = narrativeTextObj
  }

  return errors
};


class BasicInformationDateForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('ActivityDateType');
  }

  render() {
    const {activity} = this.props;

    if (!activity["ActivityDateType"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Date</h2>
        <Tooltip className="inline" tooltip="Date text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <div className="row">
            <div className="columns small-6">
              <Field
                name="date"
                type="text"
                component={renderField}
                label="Date"
              />
            </div>
            <Field
              name="dateType"
              component={renderSelectField}
              label="Type"
              selectOptions={activity["ActivityDateType"]}
              defaultOption="Select a type"
            />
            <hr/>
            <FieldArray
              name="additionalTitles"
              component={renderNarrativeFields}
              languageOptions={activity["Language"]}
              textName="textTitle"
              textLabel="Text"
            />
          </div>
          <FieldArray name="additionalDate" component={renderDate} languageOptions={activity["Language"]}/>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
  validate
})(BasicInformationDateForm)
