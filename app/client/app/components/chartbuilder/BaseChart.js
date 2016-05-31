

"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import { currencies } from 'country-data'

currencies['ZMK'] = {code: 'ZMK', symbol: 'ZMK'}

export function BaseChart(props) {
    return d3plus.viz()
        .container(`#chart-${props.vizId}`)
        .resize(true)
        .background('transparent')
        .font({
            "family" : ["proxima-nova", "sans-serif"]
        })
        .format({
            "text": function(text, params) {
                if (text === 'x') {
                    return "Year"
                }
                if (text === 'y') {
                    return "Transaction value"
                }
                if (text === 'count') {
                    return "Transaction count"
                }
                if (text === 'activity_count') {
                    return "Activity count"
                }

                else return d3plus.string.title(text, params)
            },
        "number": (number, params) => {
            const { currency } = props
            let formatted = d3plus.number.format(number, params);

            let symbol = ""
            if (params.key === 'y' && currency) {
                symbol = currencies[currency].symbol
            }

            return symbol + formatted
        }})
        .attrs(props.attributes)
        .color({
            value: "hex"
        })
        .legend({
            value: false
        })
        .tooltip(["y", "count", "activity_count"])
}

export function updateBaseChart(chart, props) {
    return chart
        .format({
            "text": function(text, params) {
                if (text === 'x') {
                    return "Year"
                }
                if (text === 'y') {
                    return "Transaction value"
                }
                if (text === 'count') {
                    return "Transaction count"
                }
                if (text === 'activity_count') {
                    return "Activity count"
                }

                else return d3plus.string.title(text, params)
            },
            "number": (number, params) => {
                const { currency } = props
                let formatted = d3plus.number.format(number, params);

                let symbol = ""

                if (params.key === 'y' && currency) {
                    symbol = currencies[currency].symbol
                }

                return symbol + formatted
            }})
        .attrs(props.attributes)
        .color("hex")

}

export default BaseChart
