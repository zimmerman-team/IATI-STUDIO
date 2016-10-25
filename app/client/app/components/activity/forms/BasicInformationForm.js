import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input}  type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
const renderParticipatingOrgs = ({ fields }) => (
  <ul className="field-list">

    <li>
      <h6>Date #1</h6>

      <div className="columns small-6">
        <Field
          name="date"
          type="text"
          component={renderField}
          label="Date"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>

      <FieldArray name="narratives" component={renderNarratives}/>
    </li>


    {fields.map((participating_org, index) =>
      <li key={index}>
        <h6>Date #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org}.date`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org}.language`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <FieldArray name={`${participating_org}.narratives`} component={renderNarratives}/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Remove</button>
      </li>
    )}


    <li>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </li>
  </ul>


)
const renderParticipatingContact = ({ fields }) => (
  <ul className="field-list">

    <li>
      <h6>Contact Info #1</h6>
      <div>
        <label>Contact Type</label>
        <div className="columns small-6">
          <Field name="contact" component="select">
            <option>Contact Type</option>
          </Field>
        </div>
      </div>

      <FieldArray name="ContactOrg" component={renderContactOrg}/>
      <FieldArray name="ContactDepart" component={renderContactDepart}/>
      <FieldArray name="ContactPerson" component={renderContactPerson}/>
      <FieldArray name="ContactJob" component={renderContactJob}/>
      <FieldArray name="ContactPhone" component={renderContactPhone}/>
      <FieldArray name="ContactEmail" component={renderContactEmail}/>
      <FieldArray name="ContactWeb" component={renderContactWebsite}/>
      <FieldArray name="ContactMailAddr" component={renderContactMailAddr}/>
    </li>

    {fields.map((participating_org1, index) =>
      <li key={index}>
        <h6>Contact Info #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org1}.contact`}
            type="text"
            component={renderField}
            label="Contact Type"/>
        </div>

        <FieldArray name={`${participating_org1}.ContactOrg`} component={renderContactOrg}/>
        <FieldArray name={`${participating_org1}.ContactDepart`} component={renderContactDepart}/>
        <FieldArray name={`${participating_org1}.ContactPerson`} component={renderContactPerson}/>
        <FieldArray name={`${participating_org1}.ContactJob`} component={renderContactJob}/>
        <FieldArray name={`${participating_org1}.ContactPhone`} component={renderContactPhone}/>
        <FieldArray name={`${participating_org1}.ContactEmail`} component={renderContactEmail}/>
        <FieldArray name={`${participating_org1}.ContactWeb`} component={renderContactWebsite}/>
        <FieldArray name={`${participating_org1}.ContactMailAddr`} component={renderContactMailAddr}/>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}


    <li>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </li>
  </ul>


)

const renderNarratives = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Narrative #1</h6>
      <div className="columns small-6">
        <Field
          name="text"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language1" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>

    </li>
    {fields.map((narrative, index) =>

      <li key={index}>
        <h6>narrative #{index + 2}</h6>
        <Field
          name={`${narrative}.text`}
          type="text"
          component={renderField}
          label={`Text #${index + 2}`} />
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${narrative}.language1`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>
        <button
          type="button"
          title="Remove Narrative"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactOrg = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Organisation #1</h6>
      <div className="columns small-6">
        <Field
          name="text1"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language2" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>
    </li>
    {fields.map((organisation, index) =>

      <li key={index}>
        <h6>organisation #{index + 2}</h6>
        <Field
          name={`${organisation}.text1`}
          type="text"
          component={renderField}
          label={`Text #${index + 2}`} />
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${organisation}.language2`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>
        <button
          type="button"
          title="Remove Narrative"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactDepart = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Department #1</h6>
      <div className="columns small-6">
        <Field
          name="text2"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language3" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>

    </li>
    {fields.map((participating_org2, index) =>
      <li key={index}>
        <h6>Department #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org2}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org2}.language3`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactPerson = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Person Name #1</h6>
      <div className="columns small-6">
        <Field
          name="text3"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language4" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>
    </li>
    {fields.map((participating_org3, index) =>
      <li key={index}>
        <h6>Person Name #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org3}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org3}.language4`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactJob = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Job Title #1</h6>
      <div className="columns small-6">
        <Field
          name="text3"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language5" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>

    </li>
    {fields.map((participating_org4, index) =>
      <li key={index}>
        <h6>Job Title #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org4}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org4}.language5`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactPhone = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Telephone #1</h6>
      <div className="columns small-6">
        <Field
          name="text3"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language6" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>
    </li>
    {fields.map((participating_org8, index) =>
      <li key={index}>
        <h6>Telephone #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org8}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org8}.language6`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactEmail = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Email #1</h6>
      <div className="columns small-6">
        <Field
          name="text3"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language7" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>

    </li>
    {fields.map((participating_org5, index) =>
      <li key={index}>
        <h6>Email #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org5}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org5}.language7`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactWebsite = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Website #1</h6>
      <div className="columns small-6">
        <Field
          name="text3"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language8" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>

    </li>
    {fields.map((participating_org6, index) =>
      <li key={index}>
        <h6>Website #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org6}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org6}.language8`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>
        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
const renderContactMailAddr = ({ fields, meta: { error } }) => (

  <ul className="field-list">
    <li>
      <h6>Mailing Address #1</h6>
      <div className="columns small-6">
        <Field
          name="text3"
          type="text"
          component={renderField}
          label="Text"/>
      </div>
      <div>
        <label>Language</label>
        <div className="columns small-6">
          <Field name="language9" component="select">
            <option>Select Language</option>
          </Field>
        </div>
      </div>


    </li>
    {fields.map((participating_org7, index) =>
      <li key={index}>
        <h6>Mailing Address #{index + 2}</h6>
        <div className="columns small-6">
          <Field
            name={`${participating_org7}.text2`}
            type="text"
            component={renderField}
            label="Date"/>
        </div>
        <div className="columns small-6">
          <div>
            <label>Language</label>
            <div>
              <Field name={`${participating_org7}.language9`} component="select">
                <option>Select Language</option>
              </Field>
            </div>
          </div>
        </div>

        <button
          type="button"
          title="Remove Participating organisation"
          className="control-button remove"
          onClick={() => fields.remove(index)}>Delete</button>
      </li>
    )}
    {error && <li className="error">{error}</li>}
    <li>
      <button className="control-button add" type="button" onClick={() => fields.push()}>Add More</button>
    </li>
  </ul>
)
class BasicInformationForm extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="columns small-12">
              <FieldArray name="participating-org" component={renderParticipatingOrgs}/>
              <FieldArray name="participating-org1" component={renderParticipatingContact}/>
            </div>

            <div className="columns small-12">
              <button className="button" type="submit" disabled={submitting}>Submit</button>
              <button className="button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>

          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form

})(BasicInformationForm)
