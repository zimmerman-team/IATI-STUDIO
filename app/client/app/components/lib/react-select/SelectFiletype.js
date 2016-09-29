import React 				from 'react';
import Select 			from 'react-select';
import Highlighter 	from 'react-highlight-words';

var SelectFiletype = React.createClass({
	displayName: 'SelectFiletype',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {};
	},
	setFiletype (e) {
		this.props.setFiletype(e.value)
	},
	renderLink: function() {
		return <a style={{ marginLeft: 5 }} href="/upgrade" target="_blank">Upgrade here!</a>;
	},
	renderOption: function(option) {
		return (
			<Highlighter
			  searchWords={[this._inputValue]}
			  textToHighlight={option.label}
			/>
		);
	},
	renderValue: function(option) {
		return <strong style={{ color: option.color }}>{option.label}</strong>;
	},
	render: function() {
		var options = [
			{ label: 'Activity', value: 'activity', color: '#E31864' },
			{ label: 'Organisation', value: 'organisation', color: '#6216A3' },
		];
		return (
				<Select
					onInputChange={(inputValue) => this._inputValue = inputValue}
					options={options}
					optionRenderer={this.renderOption}
					onChange={this.setFiletype}
					value={this.props.fileType}
					valueRenderer={this.renderValue}
					/>
		);
	}
});
module.exports = SelectFiletype;
