import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import onClickOutside from 'react-onclickoutside'

export const Tooltip = onClickOutside(class extends React.Component {
    state = {
        showTooltip: false
    };

    toggleTipOn = () => {
		this.setState({showTooltip: true})
	};

    toggleTipOff = () => {
		this.setState({showTooltip: false})
	};

    toggleTip = () => {
		this.setState({showTooltip: !this.state.showTooltip})
	};

    handleClickOutside = () => {
		this.toggleTipOff()
	};

    render() {
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
})

export default Tooltip;
