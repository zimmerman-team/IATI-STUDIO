import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import { getCodeListItems, addDocumentLink } from '../../../../actions/activity'

const validate = values => {
  const errors = {};

  if (!values.url) {
    errors.type = 'Required'
  }
  return errors
};

class DocumentLinkForm extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getCodeListItems('DocumentCategory'));
    this.props.dispatch(getCodeListItems('FileFormat'));
  }

  /**
   * Submit document link data and redirect
   * to relation form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
    this.props.dispatch(addDocumentLink(formData, this.props.activity));
    this.context.router.push('/publisher/activity/relations')
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const {submitting, previousPage, handleSubmit, activity} = this.props;
    if (!activity['DocumentCategory'] || !activity['FileFormat']) {
          return <GeneralLoader />
    }

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">Document Link</h2>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <div className="row no-margin">
              <div className="columns small-6">
                <Field
                  name="url"
                  type="text"
                  component={renderField}
                  label="URL"
                />
              </div>
              <Field
                component={renderSelectField}
                name="format"
                label="Format"
                selectOptions={activity['FileFormat']}
                defaultOption="Select one of the following options"
              />
            </div>
            <div className="row no-margin">
              <FieldArray
                name='narrative'
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="textSector"
                textLabel="Text"
              />
            </div>
            <Field
              component={renderSelectField}
              name='categories'
              label='Document Category'
              selectOptions={activity['DocumentCategory']}
              defaultOption="Select one of the following options"/>
            <Field
              component={renderSelectField}
              name='document_language'
              label='Language'
              selectOptions={activity['Language']}
              defaultOption="Select one of the following options"/>
            <div className="columns small-6">
              <Field
                name="document_date"
                type="date"
                component={renderField}
                label="Document Date"
              />
            </div>
            <div className="row no-margin">
              <div className="columns small-12">
                <button type="button" className="button" onClick={previousPage}>Back to Relations</button>
                <button className="button float-right" type="submit" disabled={submitting} >
                  Continue to Relation
                </button>
              </div>
            </div>
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

DocumentLinkForm = reduxForm({
  form: 'document-link',
  destroyOnUnmount: false,
  validate
})(DocumentLinkForm);


DocumentLinkForm = connect(mapStateToProps, {getCodeListItems})(DocumentLinkForm);
export default DocumentLinkForm;
