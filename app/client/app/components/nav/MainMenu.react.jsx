import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'

import { Link } from 'react-router'
import { withRouter } from 'react-router'

import { Tooltip } from '../general/Tooltip.react.jsx'

const default_viz = {
    name: "",
    description: "",
}

let MainMenu = React.createClass({

    propTypes: {
        active: PropTypes.bool,
        toggleNav: PropTypes.func,
        createVisualization: PropTypes.func,
        visualisations: PropTypes.array
    },

    newViz: function() {
        this.props.createVisualization(default_viz)
            .then(action => action.response.result)
            .then(viz_id => this.props.router.push(`/chartbuilder/${viz_id}`))
    },

    render: function() {

        let toggleClass = classNames('main-nav', {
            'open' : this.props.active,
        })

        return (
        <div className={toggleClass}>
            <ul>
                <li><Tooltip tooltip="Open menu"><a onClick={this.props.toggleNav} className="close"><i className="material-icons">{this.props.active ? 'close' : 'menu'}</i> Close menu</a></Tooltip></li>
                <hr />
                <li><Tooltip tooltip="View community feed"><Link to="/public/charts"><i className="material-icons">dashboard</i> Community</Link></Tooltip></li>
                <hr />
                <li><Tooltip tooltip="Go to your library"><Link to="/collection"><i className="material-icons">library_books</i> Library</Link></Tooltip></li>
                <li><Tooltip tooltip="Create a new chart"><a onClick={this.newViz} className="charts"><i className="material-icons">add</i> Create chart</a></Tooltip></li>
                <li><Tooltip tooltip="Go to your trash"><Link to="/archive"><i className="material-icons">delete</i> Trash</Link></Tooltip></li>
                <hr />
                <li><Tooltip tooltip="Publisher settings"><Link to="/publisher/settings"><i className="material-icons">settings</i>Publisher setup</Link></Tooltip></li>
                <li><Tooltip tooltip="IATI activities"><Link to="/publisher/activities"><i className="material-icons">local_play</i>IATI activities</Link></Tooltip></li>
                <li><Tooltip tooltip="Create activity"><Link to="/publisher/activity"><i className="material-icons">add</i>Create activity</Link></Tooltip></li>
                <li><Tooltip tooltip="Organisation settings"><Link to="/publisher/organisation"><i className="material-icons">domain</i>Organisation settings</Link></Tooltip></li>
                <li><Tooltip tooltip="Datasets"><Link to="/publisher/datasets"><i className="material-icons">perm_data_setting</i>Datasets</Link></Tooltip></li>
                <hr />
                <li><Tooltip tooltip="View frequently asked questions"><Link to="/help"><i className="material-icons">school</i> FAQ</Link></Tooltip></li>
            </ul>
        </div>
        )
    }
})

export default withRouter(MainMenu)
