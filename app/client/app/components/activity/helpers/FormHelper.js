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