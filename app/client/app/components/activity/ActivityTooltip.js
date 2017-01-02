import React, {PropTypes, PureComponent} from 'react'
import { Tooltip } from '../general/Tooltip.react.jsx'

const ActivityTooltip = ({ text }) => (
    <div className="row controls">
        <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity editor</h2>
            <Tooltip 
                className="inline"
                tooltip={text}
            ><i className="material-icons">info</i></Tooltip>
            <hr />
        </div>
    </div>
)
ActivityTooltip.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ActivityTooltip
