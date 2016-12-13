import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField, RenderSingleSelect} from '../../helpers/FormHelper'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

class DocumentLinkForm extends React.Component {

  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getCodeListItems('DocumentCategory');
    this.props.getCodeListItems('FileFormat');
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;
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
        <form onSubmit={handleSubmit}>
          <div className="field-list">
            <div className="row">
              <div className="columns small-6">
                <Field
                  name="url"
                  type="text"
                  component={renderField}
                  label="URL"
                />
              </div>
              <div className="columns small-6">
                <RenderSingleSelect
                  name='documentFormat'
                  label='Format'
                  selectOptions={activity['FileFormat']}/>
              </div>
            </div>
            <div className="row">
              <FieldArray
                name='narrative'
                component={renderNarrativeFields}
                languageOptions={activity["Language"]}
                textName="textSector"
                textLabel="Language"
              />
            </div>
            <RenderSingleSelect
              name='documentCategory'
              label='Document Category'
              selectOptions={activity['DocumentCategory']}/>
            <RenderSingleSelect
              name='documentLanguage'
              label='Language'
              selectOptions={activity['Language']}/>
            <Field
              name="documentDate"
              type="text"
              component={renderField}
              label="Document Date"
            />
            <div className="row">
              <div className="columns small-12">
                <button type="button" className="button" onClick={previousPage}>Back to Relations</button>
                <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                  Continue to Participating Organisation
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default reduxForm({
  form: 'document-link',
  destroyOnUnmount: false
})(DocumentLinkForm)
