import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {
    getCodeListItems,
    getDocumentLinks,
    createDocumentLink,
    updateDocumentLink,
    deleteDocumentLink
} from '../../../../actions/activity'
import {documentLinksSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const validate = values => {
    const errors = {};

    if (!values.url) {
        errors.type = 'Required'
    }
    return errors
};

const renderDocumentLink = ({fields, fileFormatOptions, languageOptions, documentCategoryOptions, meta: {dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({});
    }

    return (
        <div>
            {fields.map((documentLink, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${documentLink}url`}
                                    type="text"
                                    component={renderField}
                                    label="URL"
                                />
                                <span>If your document is not uploaded, Upload it in IATI Studio. You can also add from
                                    your existing documents in IATI Studio.
                                </span>
                            </div>
                            <Field
                                component={renderSelectField}
                                name={`${documentLink}format.code`}
                                textName={`${documentLink}format.code`}
                                label="Format"
                                selectOptions={fileFormatOptions}
                                defaultOption="Select one of the following options"
                            />
                        </div>
                        <div className="row no-margin">
                            <FieldArray
                                name={`${documentLink}title.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                                textLabel="Text"
                            />
                        </div>
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${documentLink}categories[0].category.name`}
                                textName={`${documentLink}categories[0].category.name`}
                                label='Document Category'
                                selectOptions={documentCategoryOptions}
                                defaultOption="Select one of the following options"/>
                            <Field
                                component={renderSelectField}
                                name={`${documentLink}document_language`}
                                textName={`${documentLink}document_language`}
                                label='Language'
                                selectOptions={languageOptions}
                                defaultOption="Select one of the following options"/>
                        </div>
                        <div className="row no-margin">
                            <div className="columns small-6">
                                <Field
                                    name={`${documentLink}document_date.iso_date`}
                                    type="date"
                                    component={renderField}
                                    label="Document Date"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button
                            type="button"
                            title="Remove Document"
                            className="control-button remove float-right"
                            onClick={() => fields.remove(index)}>Delete
                        </button>
                    </div>
                    <br/><br/>
                </div>
            )}
        </div>
    )
}

class DocumentLinkForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteDocumentLink = this.handleDeleteDocumentLink.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getCodeListItems('DocumentCategory'));
        this.props.dispatch(getCodeListItems('FileFormat'));
        this.props.dispatch(getCodeListItems('Language'));
        //this.props.getDocumentLinks((this.props.publisher && this.props.publisher.id), this.props.activityId);     // publisherID and Activity ID
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('descriptions', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`descriptions[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('descriptions', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getDocumentLinks(nextProps.publisher.id, nextProps.activityId)
        }
    }

    /**
     * Submit document link data and redirect
     * to relation form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        const documentLinks = formData.documentLink;

        handleSubmit(
            publisher.id,
            'documentLink',
            activityId,
            data,
            documentLinks,
            this.props.createDocumentLink,
            this.props.updateDocumentLink,
            this.props.deleteDocumentLink,
        );
        //this.context.router.push('/publisher/activities/relations')
    }

    static contextTypes = {
        router: PropTypes.object,
    };

    //TODO remove after testing
    handleDeleteDocumentLink(fields, index) {
        fields.remove(index);
        this.props.deleteDocumentLink('', this.props.activityId, index);     // publisherID and Activity ID
    }

    render() {
        const {submitting, previousPage, handleSubmit, codelists} = this.props;
        if (!codelists['DocumentCategory'] || !codelists['FileFormat'] || !codelists['Language']) {
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
                    <FieldArray
                        name="documentLink"
                        component={renderDocumentLink}
                        languageOptions={codelists["Language"]}
                        documentCategoryOptions={codelists["DocumentCategory"]}
                        fileFormatOptions={codelists["FileFormat"]}
                        deleteHandler={this.handleDeleteDocumentLink}
                    />
                    <div className="row no-margin">
                        <div className="columns small-12">
                            <button type="button" className="button" onClick={previousPage}>Back to Relations</button>
                            <button className="button float-right" type="submit" disabled={submitting}>
                                Continue to Relation
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    const documentLinks = documentLinksSelector(state);

    return {
        data: documentLinks,
        codelists: state.codelists,
        initialValues: {"documentLink": documentLinks},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

DocumentLinkForm = reduxForm({
    form: 'document-link',
    destroyOnUnmount: false,
    enableReinitialize: true,
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