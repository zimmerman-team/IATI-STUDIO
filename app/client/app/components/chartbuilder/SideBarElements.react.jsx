import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import store from '../../app'
import classNames from 'classnames'

import { changeLevel } from '../../actions/sync'

export class SideBarHeader extends React.Component {
    static propTypes = {
		title: React.PropTypes.string,
		links: React.PropTypes.bool,
		toLevel: React.PropTypes.string,
		changeLevel: React.PropTypes.func,
	};

    render() {
		let links = this.props.links

		return (
		    <div className="header">
                <h3>
                	{links ? <i className="material-icons link" onClick={this.props.changeLevel.bind(null, this.props.toLevel )}>close</i> : null }
                	<i className="material-icons type">{this.props.materialIcon}</i> {this.props.title}
                </h3>
            </div>
	    )
	}
}
