import React from 'react'
import {Field} from 'redux-form'

/**
 * Prepare language select field.
 *
 * @param {string} name
 * @param {string} label
 * @param {object} languageOptions
 * @param touched
 * @param error
 */
export const renderLanguageSelect = ({name, label, languageOptions, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={name} component="select">
          <option>Select a language</option>
          {
            languageOptions.map((language, index) => <option key={index} value={language.code}>{language.name}</option>)
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
  <div className="field-list">
    <div>
      {narrativeLabel ? <h6>Narrative</h6> : ""}
      <div className="columns small-6">
        <Field
          name={textName}
          type="text"
          component={renderField}
          label={textLabel}
        />
      </div>
      <Field
        component={renderLanguageSelect}
        name="titleLanguage[code]"
        label="Language"
        languageOptions={languageOptions}
      />
    </div>
    <div>
      {fields.map((title, index) =>
        <div key={index}>
          {narrativeLabel ? <h6>Narrative</h6> : ""}
          <div className="columns small-6">
            <Field
              name={`${title}.text`}
              type="text"
              component={renderField}
              label="Title"
            />
          </div>
          <Field
            component={renderLanguageSelect}
            name={`${title}.language[code]`}
            label="Language"
            languageOptions={languageOptions}
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
  </div>
);