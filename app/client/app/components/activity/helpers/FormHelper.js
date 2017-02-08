import React from 'react'
import {Field, FieldArray} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'

/**
 * Prepare language select field.
 *
 * @param {string} textName
 * @param {string} label
 * @param {object} selectOptions
 * @param {string} defaultOption
 * @param touched
 * @param error
 */
export const renderSelectField = ({name, textName = "", label, selectOptions, defaultOption, meta: {touched, error}}) => (
  <div className="columns small-6">
    <div>
      <label>{label}</label>
      <div>
        <Field name={textName} component="select">
          <option>{defaultOption}</option>
          {
            selectOptions && selectOptions.map((value, index) => <option key={index} value={value.code}>{value.name}</option>)
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
 * @param {boolean} disabled
 * @param {object} error
 * @param {object} warning
 */
export const renderField = ({input, label, type, readOnly, onChange, disabled = false, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} readOnly={readOnly} disabled={disabled} />
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);


export const renderTextArea = ({textArea, label, type, readOnly, onChange, meta: { touched, error, warning }}) => (
  <div>
    <label>{label}</label>
    <div>
      <span>{textArea}</span>
      <textarea {...textArea} placeholder="Content" rows="10" cols="40"></textarea>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

/**
 * Prepare narrative fields html.
 *
 * @param {object} fields
 * @param {object} languageOptions
 * @param {boolean} narrativeLabel
 * @param {string} textLabel
 * @param touched
 * @param error
 */
export const renderNarrativeFields = ({fields, languageOptions, narrativeLabel = true, textLabel="", meta: {touched, error}}) => {
    if (!fields.length) {
        fields.push({})
    }

    return (
        <div>
            {fields && fields.map((title, index) =>
                <div key={index}>
                    {narrativeLabel ? <div className="columns"><h6>Narrative</h6></div> : <div className="columns"><h6>{textLabel}</h6></div>}
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
                        textName={`${title}.language[code]`}
                        label="Language"
                        selectOptions={languageOptions}
                        defaultOption="Select one of the following options"
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
    )
};

export const RenderSingleSelect = ({name, textName = "", label, selectOptions, defaultOption = 'Select one of the following options'}) => (
   <div className="columns small-centered small-12">
       <h2 className="page-title with-tip">{label}</h2>
       <Tooltip className="inline" tooltip="Description text goes here">
           <i className="material-icons">info</i>
       </Tooltip>
       <div>
           <div className="row no-margin">
               <Field
                   component={renderSelectField}
                   name={name}
                   textName={textName}
                   label={label}
                   selectOptions={selectOptions}
                   defaultOption={defaultOption}
               />
           </div>
       </div>
   </div>
);


/**
 * Prepare render organisation fields html.
 *
 * @param {object} fields
 * @param {object} languageOptions
 * @param {boolean} narrativeLabel
 * @param {string} textName
 * @param {string} textLabel
 * @param touched
 * @param error
 */
export const renderOrgFields = ({fields, languageOptions, narrativeLabel = true, textName, mainLabel, organisationOptions, activityKey = "provider_activity_id", textLabel, meta: {touched, error}})  => (
    <div>
        {mainLabel ? <div className="columns"><h6>{mainLabel}</h6></div> : "Provider org"}
        <div className="row no-margin">
            <div className="columns small-6">
                <Field
                    name={`${textName}.ref`}
                    type="text"
                    component={renderField}
                    label="Ref"
                />
            </div>
            <div className="columns small-6">
                <Field
                    name={`${textName}.${activityKey}`}
                    type="text"
                    component={renderField}
                    label="Activity id"
                />
            </div>
        </div>
        <div className="row no-margin">
            <Field
                component={renderSelectField}
                name={`${textName}.type.code`}
                textName={`${textName}.type.code`}
                label="Type"
                selectOptions={organisationOptions}
                defaultOption="Select a type"
            />
        </div>
        <FieldArray
            name={`${textName}.narratives`}
            component={renderNarrativeFields}
            languageOptions={languageOptions}
            textName="textTitle"
            textLabel="Text"
        />
    </div>
);


/**
 * Prepare sector fields html.
 *
 * @param {object} fields
 * @param {object} languageOptions
 * @param {boolean} narrativeLabel
 * @param {string} textName
 * @param {string} textLabel
 * @param touched
 * @param error
 */
export const renderSectorFields = ({fields, languageOptions, narrativeLabel = true,
        textName, mainLabel, sectorVocabularyOptions, sectorOptions, textLabel,
        meta: {touched, error}}) => {
    if (!fields.length) {
        fields.push({})
    }

    return (
        <div>
            {fields && fields.map((title, index) =>
                <div key={index}>
                  <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Sector</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                      <i className="material-icons">info</i>
                    </Tooltip>
                    <div className="field-list">
                      <div className="row no-margin">
                        <Field
                          component={renderSelectField}
                          name={`${title}vocabulary[code]`}
                          textName={`${title}vocabulary[code]`}
                          label="Sector vocabulary"
                          selectOptions={sectorVocabularyOptions}
                          defaultOption="Select one of the following options"
                        />
                        <div className="columns small-6">
                          <Field
                            name={`${title}vocabulary_uri`}
                            type="url"
                            component={renderField}
                            label="Vocabulary URI"
                          />
                        </div>
                        <Field
                          component={renderSelectField}
                          name={`${title}sector[code]`}
                          textName={`${title}sector[code]`}
                          label="Sector code"
                          selectOptions={sectorOptions}
                          defaultOption="Select one of the following options"
                        />
                        <div className="columns small-6">
                          <Field
                            name={`${title}sector[name]`}
                            textName={`${title}sector[name]`}
                            type="text"
                            component={renderField}
                            label="Sector Name"
                          />
                        </div>
                        <div className="columns small-6">
                          <Field
                              name={`${title}transaction`}
                              textName={`${title}transaction`}
                              type="text"
                              component={renderField}
                              label="Transaction"
                          />
                        </div>
                        <FieldArray
                          name={`${title}narratives`}
                          component={renderNarrativeFields}
                          languageOptions={languageOptions}
                          textName="textSectorTitle"
                          textLabel="Title"
                        />
                      </div>
                    </div>
                  </div>
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
    )
};

/**
 * Prepare sector fields html.
 *
 * @param {object} fields
 * @param {object} languageOptions
 * @param {boolean} narrativeLabel
 * @param {string} textName
 * @param {string} textLabel
 * @param touched
 * @param error
 */
export const renderRecipientCountries = ({fields, languageOptions,  textName, mainLabel, countryOptions, textLabel, meta: {touched, error}}) => (
    <div>
        <div className="row no-margin">
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Recipient country</h2>
            </div>
        </div>
        <div className="columns small-centered small-12">
            <div className="field-list">
                <div className="row no-margin">
                    <Field
                        name={`${textName}.country.code`}
                        textName={`${textName}.country.code`}
                        component={renderSelectField}
                        label="Country"
                        selectOptions={countryOptions}
                        defaultOption="Select one of the following options"
                    />
                    {/* @TODO uncomment when issue #949 is fixed
                    <FieldArray
                        name={`${textName}.narratives`}
                        component={renderNarrativeFields}
                        languageOptions={languageOptions}
                        textName="textSectorTitle"
                        textLabel="Title"
                    />
                    */}
                </div>
            </div>
        </div>
    </div>
);
