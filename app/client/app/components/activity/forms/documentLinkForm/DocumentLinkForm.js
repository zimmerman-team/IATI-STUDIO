import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import { getCodeListItems, getDocumentLinks, createDocumentLink, updateDocumentLink, deleteDocumentLink } from '../../../../actions/activity'
import { documentLinksSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'

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
    this.props.getDocumentLinks(this.props.activityId);
  }

  /**
   * Submit document link data and redirect
   * to relation form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const {activityId, data, tab, subTab} = this.props
      const lastDocumentLink = data;
      const documentLinks = formData.documentLinks;

      handleSubmit(
          'documentLinks',
          activityId,
          lastDocumentLink,
          documentLinks,
          this.props.createDocumentLink,
          this.props.updateDocumentLink,
          this.props.deleteDocumentLink,
      )
      //this.context.router.push('/publisher/activity/relations')
  }

  static contextTypes = {
    router: PropTypes.object,
  };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('descriptions', newData);

            // change each item
            newData.forEach((d,i) => this.props.change(`descriptions[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('descriptions', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId) {
            this.props.getDescriptions(nextProps.activityId)
        }
    }

  render() {
    const {submitting, previousPage, handleSubmit, codelists} = this.props;
    if (!codelists['DocumentCategory'] || !codelists['FileFormat']) {
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
                selectOptions={codelists['FileFormat']}
                defaultOption="Select one of the following options"
              />
            </div>
            <div className="row no-margin">
              <FieldArray
                name='narrative'
                component={renderNarrativeFields}
                languageOptions={codelists["Language"]}
                textName="textSector"
                textLabel="Text"
              />
            </div>
            <Field
              component={renderSelectField}
              name='categories'
              label='Document Category'
              selectOptions={codelists['DocumentCategory']}
              defaultOption="Select one of the following options"/>
            <Field
              component={renderSelectField}
              name='document_language'
              label='Language'
              selectOptions={codelists['Language']}
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


function mapStateToProps(state, props) {
    const documentLinks = documentLinksSelector(state)

    return {
        data: documentLinks,
        codelists: state.codelists,
        ...props,
    }
}

DocumentLinkForm = reduxForm({
    form: 'document-link',
    destroyOnUnmount: false,
    validate
})(DocumentLinkForm);

DocumentLinkForm = connect(mapStateToProps, {
    getCodeListItems,
    getDocumentLinks,
    createDocumentLink,
    updateDocumentLink,
    deleteDocumentLink
})(DocumentLinkForm);

export default withRouter(DocumentLinkForm);