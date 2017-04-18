

import React, {PropTypes, PureComponent} from 'react'
import { Tooltip } from '../general/Tooltip.react.jsx'

import { 
    markReadyToPublishOrganisation,
} from '../../actions/organisation'

class OrganisationPublishState extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { 
            publisherId, 
            organisationId, 
            publishedState: { published, ready_to_publish, modified } 
        } = this.props


        let button;
        if (!ready_to_publish) {
            button = 
                <button 
                    className="button"
                    onClick={() => this.props.markReadyToPublish(publisherId, organisationId)}
                >Mark as Ready to Publish</button>
        } else if (published && ready_to_publish) {
            button = 
                <button 
                    className="button"
                    onClick={() => this.props.markReadyToPublish(publisherId, organisationId)}
                >Mark to unpublish</button>
        } else if (ready_to_publish) {
            button = 
                <button 
                    className="button"
                    onClick={() => this.props.markReadyToPublish(publisherId, organisationId)}
                >Mark as not ready to publish</button>
        }

        return (
            <div className="row">
                { button }
            </div>
        )
    }
}

// export default connect(null, {
//     markReadyToPublish,
// })(OrganisationPublishState);

export default OrganisationPublishState

