import React from 'react'
import {Field} from 'redux-form'

/**
 * Prepare language select field.
 *
 * @param {string} name
 * @param {string} label
 * @param {object} selectOptions
 * @param {string} defaultOption
 * @param touched
 * @param error
 */
export const renderSelectField = ({name, label, selectOptions, defaultOption, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option>{defaultOption}</option>
          {
            selectOptions.map((value, index) => <option key={index} value={value.code}>{value.name}</option>)
          }
        </Field>
      </div>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

/**
 * Prepare input field html.
 *
 * @param {string} input
 * @param {string} label
 * @param {string} type
 * @param {string} readOnly
 * @param {string} onChange
 * @param {object} touched
 * @param {object} error
 * @param {object} warning
 */
export const renderField = ({input, label, type, readOnly, onChange, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} readOnly={readOnly}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);


/**
 * Prepare narrative fields html.
 *
 * @param {object} fields
 * @param {object} languageOptions
 * @param {boolean} narrativeLabel
 * @param {string} textName
 * @param {string} textLabel
 * @param touched
 * @param error
 */
export const renderNarrativeFields = ({fields, languageOptions, narrativeLabel = true, textName, textLabel, meta: {touched, error}}) => (
  <div>
    {narrativeLabel ? <div className="columns"><h6>Narrative</h6></div> : ""}
    <div className="columns small-6">
      <Field
        name={textName}
        type="text"
        component={renderField}
        label={textLabel}
      />
    </div>
    <Field
      component={renderSelectField}
      name="titleLanguage[code]"
      label="Language"
      selectOptions={languageOptions}
      defaultOption="Select a language"
    />
    {fields.map((title, index) =>
      <div key={index}>
        {narrativeLabel ? <div className="columns"><h6>Narrative</h6></div> : ""}
        <div className="columns small-6">
          <Field
            name={`${title}.text`}
            type="text"
            component={renderField}
            label="Title"
          />
        </div>
        <Field
          component={renderSelectField}
          name={`${title}.language[code]`}
          label="Language"
          selectOptions={languageOptions}
          defaultOption="Select a language"
        />
      </div>
    )}
    <div className="columns">
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
      <button
        type="button"
        title="Remove Title"
        className="control-button remove float-right"
        onClick={() => fields.pop()}>Delete
      </button>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);