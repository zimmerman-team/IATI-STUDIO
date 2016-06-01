import _ from 'lodash'
import React, { PropTypes } from 'react'

import { InputText, InputTextArea } from '../general/Input.react.jsx'
import { Radiobutton } from '../general/List.react.jsx'

// import pure from 'recompose/pure'
// import compose from 'recompose/compose'
import { pure, compose } from 'recompose'

// TODO: group similar charts together - 2016-03-10
export const ChartTypeSelector = props => {
   return  (
        <div>
            <Radiobutton
                id="bar-chart"
                onChange={props.onChange}
                checked={props.value == 'bar-chart' ? true : false }
                name="chartType"
                labelName="Bar chart"
                className="with-gap"
            />
            <Radiobutton
                id="stacked-bar-chart"
                onChange={props.onChange}
                checked={props.value == 'stacked-bar-chart' ? true : false }
                name="chartType"
                labelName="Stacked bar chart"
                className="with-gap"
            />
            <Radiobutton
                id="line-chart"
                onChange={props.onChange}
                checked={props.value == 'line-chart' ? true : false }
                name="chartType"
                labelName="Line chart"
                className="with-gap"
            />
            <Radiobutton
                id="bubble-chart"
                onChange={props.onChange}
                checked={props.value == 'bubble-chart' ? true : false }
                name="chartType"
                labelName="Bubble chart"
                className="with-gap"
            />
            {/* <Radiobutton
                id="radar-chart"
                onChange={props.onChange}
                checked={props.value == 'radar-chart' ? true : false }
                name="chartType"
                labelName="Radar chart"
                className="with-gap"
            /> */}
            <Radiobutton
                id="tree-map"
                onChange={props.onChange}
                checked={props.value == 'tree-map' ? true : false }
                name="chartType"
                labelName="Tree map"
                className="with-gap"
            />
            <Radiobutton
                id="pie-chart"
                onChange={props.onChange}
                checked={props.value == 'pie-chart' ? true : false }
                name="chartType"
                labelName="Pie chart"
                className="with-gap"
            />
        </div>
    )
}

ChartTypeSelector.propTypes = {
    chartType: PropTypes.string
}







import { currencies } from 'country-data'

let availableCurrencies = [
    currencies.USD,
    currencies.EUR,
    currencies.GBP,
    currencies.CAD,
    currencies.JPY,
    currencies.XDR
]

let oipaCurrencies = [
    currencies.AUD,
    currencies.BDT,
    currencies.CAD,
    currencies.CHF,
    currencies.COP,
    currencies.DKK,
    currencies.EUR,
    currencies.GBP,
    currencies.GHS,
    currencies.GTQ,
    currencies.HNL,
    currencies.HTG,
    currencies.INR,
    currencies.JPY,
    currencies.KES,
    currencies.LKR,
    currencies.LTL,
    currencies.MMK,
    currencies.MWK,
    currencies.MZN,
    currencies.NGN,
    currencies.NIO,
    currencies.NOK,
    currencies.NPR,
    currencies.NZD,
    currencies.PHP,
    currencies.PKR,
    currencies.RWF,
    currencies.SDG,
    currencies.SLL,
    currencies.THB,
    currencies.TZS,
    currencies.UGX,
    currencies.USD,
    currencies.XDR,
    currencies.XAF,
    currencies.XOF,
    currencies.ZAR,
    {code:'ZMK', symbol:'ZMK'},
]

export const ChartCurrency = React.createClass({

    propTypes: {
        changeCurrency: PropTypes.func
    },

    changeCurrencyType: function(e) {

        let value = this.props.value;

        if(e.target.value == 'converted'){
            let currencyCodes = availableCurrencies.map(c => c.code);

            if (currencyCodes.indexOf(value) == -1){
                value = availableCurrencies[0].code
            }
        }
        this.props.changeCurrency({'value': value, 'currencyType': e.target.value})
    },

    changeCurrency: function(e){
        this.props.changeCurrency({'value': e.target.value, 'currencyType': this.props.currencyType})
    },

    render: function() {
        let codeOptions = []

        if (this.props.currencyType == 'converted'){
            codeOptions = availableCurrencies.map(c => (
                <option key={c.code} value={c.code}>{ c.code + ' - ' + c.symbol }</option>
            ))
        } else {
            codeOptions = oipaCurrencies.map(c => (
                <option key={c.code} value={c.code}>{ c.code + ' - ' + c.symbol }</option>
            ))
        }

        return (
            <label>
                <Radiobutton
                    id="source-currency"
                    onChange={this.changeCurrencyType}
                    checked={this.props.currencyType == 'source' ? true : false }
                    name="chartCurrencyConvert"
                    labelName="Use native currency"
                    className="with-gap"
                    value="source"
                />
                <Radiobutton
                    id="converter-currency"
                    onChange={this.changeCurrencyType}
                    checked={this.props.currencyType == 'converted' ? true : false }
                    name="chartCurrencyConvert"
                    labelName="Convert all values to"
                    className="with-gap"
                    value="converted"
                />
                <select onChange={this.changeCurrency} value={this.props.value} className="select-currency">
                    { codeOptions }
                </select>
            </label>
        )
    },
})


export const ChartName = compose(
    pure,
)(props => (
    (
        <InputText
            placeholder="Enter a name" 
            onChange={props.onChange} 
            onInput={props.onEdit}
            value={props.name}
            className="box jr-name"
            maxLength={256}
        />
    )
));

export const ChartTimeRange = props => (
    <div className="chart-type-selector">
        <select>
            <option>Bar chart</option>
            <option>Not implemented</option>
            <option>Not implemented</option>
        </select>
    </div>
);

export const ChartStyleControls = props => {
    let currentInterpolation = props.visualization.chartProps.interpolation
    let toggleToInterpolation = currentInterpolation == "monotone" ? "linear" : "monotone"
    if( props.visualization.type == 'line-chart' ) {
        return (
            <div className="switch">
                <label>
                    <input type="checkbox" onChange={props.toggleInterpolation.bind(null, toggleToInterpolation)} checked={currentInterpolation == 'monotone' ? true : false}/>
                    <span className="lever"></span>
                    <span className="label">Interpolation</span>
                </label>
            </div>
        )
    } else { return <span/> }
}

export const ChartPlaceholder = props => {
    return (
        <div className="chart-placeholder">
            <i className="material-icons">equalizer</i>
        </div>
    )
}
