import React from 'react';
import Select from 'react-select';

const LANGUAGES = [
	{ label: 'English', value: 'english' },
	{ label: 'Language2', value: 'lang2' },
	{ label: 'Language3', value: 'lang3' },
	{ label: 'Language4', value: 'lang4' },
	{ label: 'Language5', value: 'lang5' },
	{ label: 'Language6', value: 'lang6' },
];

var MultiSelectLang = React.createClass({
	displayName: 'MultiSelectLang',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: LANGUAGES,
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
			<Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select the language" options={this.state.options} onChange={this.handleSelectChange} />
		);
	}
});

module.exports = MultiSelectLang;
