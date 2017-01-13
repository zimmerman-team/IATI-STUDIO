import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import { Link } from 'react-router';
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import { getCodeListItems, getDates, createDate, updateDate, deleteDate } from '../../../../actions/activity'
import { datesSelector, publisherSelector } from '../../../../reducers/createActivity.js'
import { withRouter } from 'react-router'
import handleSubmit from '../../helpers/handleSubmit'

const renderDate = ({fields, languageOptions, meta: {touched, error}}) => (
  <div>
    {fields.map((date, index) =>
      <div key={index}>
        <div className="columns small-6">
          <Field
            name={`${date}.iso_date`}
            type="text"
            component={renderField}
            label="Date"
          />
        </div>
        <hr/>
        <FieldArray
          name={`${date}.type`}
          component={renderNarrativeFields}
          languageOptions={languageOptions}
          textName={`${date}.narrativeText`}
          textLabel="Title"
        />
      </div>
    )}
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.iso_date) {
    errors.iso_date = 'Required'
  }

  return errors
};


class BasicInformationDateForm extends Component {

  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Submit basic information's date data and redirect to status form.
   *
   * @param formData
   */
  handleFormSubmit(formData) {
      const { activityId, data, tab, subTab, publisher } = this.props

      const lastDates = data
      const dates = formData.dates

      handleSubmit(
          publisher.id,
          'dates',
          activityId,
          lastDates,
          dates,
          this.props.createDate,
          this.props.updateDate,
          this.props.deleteDate,
      )
      //this.context.router.push('/publisher/activity/basic-info/contact');
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
      this.props.getCodeListItems('ActivityDateType');
      this.props.getCodeListItems('Language');
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22
            // this.props.change('dates', newData);

            // change each item
            newData.forEach((d,i) => this.props.change(`dates[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('dates', i)
            }
        }

        console.log(nextProps.publisher);

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getDates(nextProps.publisher.id, nextProps.activityId)
        }
    }


    render() {
    const {codelists, submitting, handleSubmit} = this.props;

    if (!codelists["ActivityDateType"] || !codelists["Language"]) {
      return <GeneralLoader/>
    }

    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Date</h2>
        <Tooltip className="inline" tooltip="Date text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="field-list">
            <div className="row no-margin">
              <div className="columns small-6">
                <Field
                  name="iso_date"
                  type="date"
                  component={renderField}
                  label="Date"
                />
              </div>
              <Field
                name="type"
                component={renderSelectField}
                label="Type"
                selectOptions={codelists["ActivityDateType"]}
                defaultOption="Select a type"
              />
              <hr/>
              <FieldArray
                name="additionalTitles"
                component={renderNarrativeFields}
                languageOptions={codelists["Language"]}
                textName="textTitle"
                textLabel="Text"
              />
            </div>
            <FieldArray name="additionalDate" component={renderDate} languageOptions={codelists["Language"]}/>
          </div>
          <div className="columns small-12">
            <Link className="button" to="/publisher/activity/basic-info/status">Back to status</Link>
            <button className="button float-right" type="submit" disabled={submitting}>
              Continue to contact
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    const dates = datesSelector(state)
    return {
        data: dates,
        codelists: state.codelists,
        initialValues: {"dates": dates},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

BasicInformationDateForm = reduxForm({
  form: 'basic-info-date',     // a unique identifier for this form
  destroyOnUnmount: false,
  enableReinitialize: true,
  validate
})(BasicInformationDateForm);

BasicInformationDateForm = connect(mapStateToProps, {
    getCodeListItems,
    getDates,
    createDate,
    updateDate,
    deleteDate
})(BasicInformationDateForm);

export default withRouter(BasicInformationDateForm)

