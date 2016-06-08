import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import onClickOutside from 'react-onclickoutside'

export const Tooltip = onClickOutside(React.createClass({
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
	toggleTip: function() {
		this.setState({showTooltip: !this.state.showTooltip})
	},
	handleClickOutside: function(){
		this.toggleTipOff()
	},
	render: function() {
		let tooltipClass = classNames('tooltip', this.props.className)
		return (
			<div className={tooltipClass} onMouseEnter={this.props.click ? null : this.toggleTipOn} onMouseLeave={this.props.click ? null : this.toggleTipOff} onClick={this.props.click ? this.toggleTip : null}>
				{this.props.children}
				<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
					{this.state.showTooltip ? 
						<div className="tip">{this.props.tooltip}</div>
					: null }
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}))