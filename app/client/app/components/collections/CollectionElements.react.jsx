"use strict"

import _ from 'lodash'
import moment from 'moment'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import store from '../../app'
import { Tooltip } from '../general/Tooltip.react.jsx'

export const CollectionCard = React.createClass({

    PropTypes: {
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        forkVisualization: PropTypes.func.isRequired,
    },


    forkVisualization: function(id) {
        this.props.forkVisualization(id)
    },

    render: function() {
        const {
            id,
            title,
            description,
            dateCreated,
            lastUpdated,
        } = this.props

        let cardClass = classNames('card', this.props.type, this.props.type_detail, {public: this.props.public})
        let headerImage = this.props.image ? {backgroundImage: 'url(' + this.props.image + ')'} : null

        let updateDate = moment(lastUpdated).format("D MMM YYYY [at] HH:mm")

        return (
            <div className="columns small-12 medium-6 large-4 xlarge-3 xxlarge-25 collection-card">
            	<div className={cardClass}>
                    <Link to={`/chartbuilder/${id}`} className="no-color">
                		<header style={headerImage}>
                        {this.props.public ? <div className="published"><i className="material-icons">public</i></div> : null }
                		</header>
                		<section className="content">
                            <h5>{title ? title : 'Untitled'}</h5>
                            <Tooltip tooltip="Last modified"><div className="date"><i className="material-icons">today</i>{updateDate}</div></Tooltip>
                			{/*<p>{description ? description : 'No description available'}</p>*/}
                		</section>
                    </Link>
            		<section className="links">
                        {/*<a className="details button flat"><i className="material-icons">details</i></a>*/}
                        <Tooltip tooltip="Edit visualisation"><Link className="edit button flat" to={`/chartbuilder/${id}`}><i className="material-icons">create</i></Link></Tooltip>
                        <Tooltip tooltip="Duplicate visualisation"><a className="edit button flat" onClick={this.forkVisualization.bind(this, id)}><i className="material-icons">content_copy</i></a></Tooltip>
                        <Tooltip tooltip="Move to trash"><a className="edit button flat" onClick={this.props.archiveItem}><i className="material-icons">delete</i></a></Tooltip>
            		</section>
            	</div>
            </div>
        )
    }
})

export const CollectionCardArchive = React.createClass({

    PropTypes: {
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        deleteViz: PropTypes.func.isRequired,
        updateViz: PropTypes.func.isRequired,
    },

    render: function() {
        const {
            id,
            title,
            description,
            dateArchived
        } = this.props

        let cardClass = classNames('card', this.props.type, this.props.type_detail)
        let headerImage = this.props.image ? {backgroundImage: 'url(' + this.props.image + ')'} : null

        let deleteDate = moment(dateArchived).format("D MMM YYYY [at] HH:mm")

        return (
            <div className="columns small-12 medium-6 large-4 xlarge-3 xxlarge-25 collection-card">
                <div className={cardClass}>
                    <header style={headerImage}>
                    </header>
                    <section className="content">
                        <h5>{title ? title : 'Untitled'}</h5>
                        <Tooltip tooltip="Date deleted"><div className="date"><i className="material-icons">today</i>{deleteDate}</div></Tooltip>
                        {/*<p>{description ? description : 'No description available'}</p>*/}
                    </section>
                    <section className="links">
                            <Tooltip tooltip="Restore item to library"><a className="edit button flat" onClick={this.props.restoreViz}><i className="material-icons">restore</i></a></Tooltip>
                            {/*<a className="edit button flat" onClick={this.props.deleteViz}><i className="material-icons">delete</i></a>*/}
                    </section>
                </div>
            </div>
        )
    }
})

export const CollectionSwitch = React.createClass({
	propTypes: {
        type: PropTypes.string,
    },
    handleToggleChange: function(name,e) {
        this.props.switchState = e;
        this.props.toggleType(this.props.switchState);
    },
	render: function() {
		let cardType
		if (this.props.type == 'charts') cardType = 'Charts'
		if (this.props.type == 'themes') cardType = 'Data themes'
		if (this.props.type == 'iatidata') cardType = 'Activities'
		let switchClass = classNames('switch',this.props.type)
        return (
            <div className={switchClass}>
			    <label>
			    	{/*<input type="checkbox" onChange={this.handleToggleChange} checked={this.props.switchState}/>
			     	<span className="lever"></span>*/}
			     	<span className="label"><span className="badge">{this.props.count}</span><span className="type">{cardType}</span></span>
			    </label>
			</div>
        )
    }
})

export const OrderButton = React.createClass({
    render: function() {
        return (
            <button 
                onClick={this.props.onClick}
                className={this.props.className}>{this.props.name}</button>
        )
    }
})
