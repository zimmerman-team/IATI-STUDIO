import React from 'react';
import Select from 'react-select';

const ORGANISATIONS = [
	{ label: 'Organisation1', value: 'org1' },
	{ label: 'Org2', value: 'org2' },
	{ label: 'Org3', value: 'org3' },
	{ label: 'Org4', value: 'org4' },
	{ label: 'Org5', value: 'org5' },
	{ label: 'Org6', value: 'org6' },
];

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: ORGANISATIONS,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	render () {
		return (
			<Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select(s)" options={this.state.options} onChange={this.handleSelectChange} />
		);
	}
});

module.exports = MultiSelectField;
