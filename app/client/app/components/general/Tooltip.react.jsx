import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const Tooltip = React.createClass({
	getInitialState: function() {
		return {
			showTooltip: false
		}
	},
	toggleTipOn: function() {
		this.setState({showTooltip: true})
	},
	toggleTipOff: function() {
		this.setState({showTooltip: false})
	},
	render: function() {
		return (
			<div className="tooltip" onMouseEnter={this.toggleTipOn} onMouseLeave={this.toggleTipOff}>
				{this.props.children}
				<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
					{this.state.showTooltip ? 
						<div className="tip">{this.props.tooltip}</div>
					: null }
				</ReactCSSTransitionGroup>
			</div>
		)
	}
})