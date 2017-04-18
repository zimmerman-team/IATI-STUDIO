import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {Link} from 'react-router'
import {
    getCodeListItems,
    getDocumentLinks,
    createDocumentLink,
    updateDocumentLink,
    deleteDocumentLink
} from '../../../../actions/activity'
import {documentLinksSelector } from '../../../../reducers/createActivity.js'
import { publisherSelector } from '../../../../reducers/publisher.js'
import {withRouter} from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'
import moment from 'moment'

const validate = values => {
    let errors = {};

    const documentLinks = values.document_links || [];

    errors.document_links = documentLinks.map(documentLinkData => {
        let documentLinkErrors = {};

        if (!documentLinkData.url) {
            documentLinkErrors.url = 'Required'
        }

        if (!documentLinkData.format) {
            documentLinkErrors.format = {code:'Required'}
        }

        return documentLinkErrors
    });

    return errors
};

const renderDocumentLink = ({fields, fileFormatOptions, languageOptions, meta: {dirty}}) => {
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
                                    type="url"
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
    }

    componentWillMount() {
        this.props.dispatch(getCodeListItems('DocumentCategory'));
        this.props.dispatch(getCodeListItems('FileFormat'));
        this.props.dispatch(getCodeListItems('Language'));
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getDocumentLinks(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('descriptions', newData);

            // change each item
            newData.forEach((d, i) => this.props.change(`document_links[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('document_links', i)
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
        let documentLinksData = formData.document_links;

        documentLinksData = documentLinksData.map(function (documentFormData) {
            if (documentFormData.document_date && documentFormData.document_date.iso_date) {
                let dateObj = new Date(documentFormData.document_date.iso_date);
                documentFormData.document_date.iso_date = dateObj.toISOString();
            }
            return documentFormData;
        });

        handleSubmit(
            publisher.id,
            'document_links',
            activityId,
            data,
            documentLinksData,
            this.props.createDocumentLink,
            this.props.updateDocumentLink,
            this.props.deleteDocumentLink,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${activityId}/relations/relations`)
            }
        }).catch((e) => {
            console.log(e)
        });
    }


    render() {
        const {submitting, handleSubmit, codeLists, activityId, isFetching} = this.props;
        if (!codeLists['DocumentCategory'] || isFetching || !codeLists['FileFormat'] || !codeLists['Language']) {
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
                        name="document_links"
                        component={renderDocumentLink}
                        languageOptions={codeLists["Language"]}
                        fileFormatOptions={codeLists["FileFormat"]}
                    />
                    <div className="row no-margin">
                        <div className="columns small-12">
                            <Link className="button" to={`/publisher/activities/${activityId}/financial/capital`}>Back to Financial Capital</Link>
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
    let document_links = documentLinksSelector(state);
    const isFetching = state.activity.isFetching;
    if (document_links && document_links.length) {
        /*
        document_links = document_links.map(function (documentFormData) {
            if (documentFormData.document_date && documentFormData.document_date.iso_date) {
                let updateDate = moment(documentFormData.document_date.iso_date).format("YYYY-MM-DD");
                documentFormData.document_date.iso_date = updateDate;
            }
            return documentFormData;
        });
        */
    }

    return {
        data: document_links,
        isFetching: isFetching,
        codeLists: state.codeLists,
        initialValues: {"document_links": document_links},  // populate initial values for redux form
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
