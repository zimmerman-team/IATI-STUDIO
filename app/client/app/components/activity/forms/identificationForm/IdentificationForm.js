import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField, renderNarrativeFields} from '../../helpers/FormHelper'
import { createActivity, getCodeListItems } from '../../../../actions/activity'

const validate = values => {
  const errors = {};

  if (!values.activityIdentifier) {
    errors.activityIdentifier = 'Required'
  }

  if (!values.textTitle) {
    errors.textTitle = 'At least one title must be entered'
  }

  if (!values.titleLanguage) {
    const titleLanguageCodeObj = {};
    titleLanguageCodeObj.code = 'Required';
    errors.titleLanguage = titleLanguageCodeObj
  }

  if (!values.iati_identifier) {
    errors.iati_identifier = 'Required'
  }

  if (values.additionalTitles) {
    const titlesArrayErrors = [];

    values.additionalTitles.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.text) {
        titleErrors.text = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.language) {
        const codeObj = {};
        codeObj.code = 'Required';
        titleErrors.language = codeObj;
        titlesArrayErrors[titleIndex] = titleErrors
      }
    });

    if (titlesArrayErrors.length) {
      errors.additionalTitles = titlesArrayErrors
    }
  }

  // if (/[^\/\&\|\?]+/g.test(values.iati_identifier)) {
  //   errors.iati_identifier = 'Invalid data entered'
  // }

  if (!values.hierarchy) {
    errors.hierarchy = 'Required'
  }

  return errors
};


class IdentificationForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // handleChange(e) {
  //   //change IATI Identifier value
  //   //console.log("here");
  //   //this.props.dispatch(change('identification', 'iati_identifier', 'Bob'));
  //   //this.props.publishActivity(data);
  // }

  /**
   * Submit identification data and redirect
   * to basic information form.
   *
   * @param data
   */
  handleFormSubmit(data) {
    this.props.dispatch(createActivity(data));
    this.context.router.push('/publisher/activity/relations')
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {submitting, activity, handleSubmit } = this.props;
    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)} name="identification">
          <FieldArray
            name="additionalTitles"
            component={renderNarrativeFields}
            languageOptions={activity["Language"]}
            narrativeLabel={false}
            textName="textTitle"
            textLabel="Title"
          />
          <div className="columns small-6">
            <Field
              name="activityIdentifier"
              type="text"
              id="activityIdentifier"
              component={renderField}
              label="Activity Identifier"
              //onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="columns small-6">
            <Field
              name="iati_identifier"
              type="text"
              id="iati_identifier"
              component={renderField}
              label="IATI Identifier"
              //readOnly="true"
            />
          </div>
          <div className="columns small-6">
            <Field
              name="hierarchy"
              type="number"
              id="hierarchy"
              component={renderField}
              label="Hierarchy"
            />
          </div>
          <div className="columns small-12">
            <button className="button" type="submit" disabled={submitting}>
              Continue to basic information
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

IdentificationForm = reduxForm({
  form: 'identification',     // a unique identifier for this form,
  destroyOnUnmount: false,
  validate
})(IdentificationForm);


IdentificationForm = connect(mapStateToProps, {getCodeListItems})(IdentificationForm);
export default IdentificationForm;
