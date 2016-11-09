import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import SectorForm from './ClassificationSectorForm'
import PolicyMakerForm from './ClassificationPolicyForm'

class ClassificationForm extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, previousPage, activity} = this.props;

        return (
            <div>
                <div className="row controls">
                    <div className="columns small-centered small-12">
                        <h2 className="page-title with-tip">Classification</h2>
                        <hr />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <SectorForm activity={activity} />
                    </div>
                    <div className="row">
                        <PolicyMakerForm activity={activity} />
                    </div>
                    <div className="row">
                        <div className="columns small-12">
                            <button type="button" className="button" onClick={previousPage}>Back to Geopolitical Form</button>
                            <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                                Continue to Classification Form
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form: 'ClassificationForm',
    destroyOnUnmount: false,

})(ClassificationForm)
