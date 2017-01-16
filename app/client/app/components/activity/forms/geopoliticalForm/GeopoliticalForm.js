import React from 'react'
import RecipientCountryForm from './GeopoliticalCountryForm'
import RecipientRegionForm from './GeopoliticalRegionForm'
import LocationForm from './GeopoliticalLocationForm'

class GeopoliticalForm extends React.Component {

    constructor(props) {
        super(props)
    }

    getFormSubComponentComponentFromRoute(subTab) {

        switch (subTab) {
            case 'country':
                return <RecipientCountryForm {...this.props} />;
            case 'region':
                return <RecipientRegionForm {...this.props} />;
            case 'location':
                return <LocationForm {...this.props} />;

            default:
                return <RecipientCountryForm {...this.props} />;
        }
    }

    render() {
        const {subTab} = this.props;
        const formSubComponent = this.getFormSubComponentComponentFromRoute(subTab);

        return (
            <div>
                <div className="row controls">
                    <div className="columns small-centered small-12">
                        <h2 className="page-title with-tip">Geopolitical information</h2>
                        <hr />
                    </div>
                </div>
                {formSubComponent}
            </div>
        )
    }
}
export default GeopoliticalForm;
