
"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import BaseChart from './BaseChart'

const PieChart = React.createClass({

    propTypes: {
        data: PropTypes.arrayOf(),
        items: PropTypes.object
    },

    componentDidMount: function() {
        let { data, attributes } = this.props

        // var data = this.state.data;
        this.visualization = BaseChart(this.props)
            .data(data)
            .type("pie")
            .id("id")
            .text(x => x.name + ' - ' + x.aggregation)
            .size("y")
            .labels({
                "align": "center",
                "valign": "middle",
                "padding": 10
            })
            .draw()

    },

    componentDidUpdate: function() {
        let { data, attributes } = this.props

        updateBaseChart(this.visualization, this.props)
            .data(data)
            .draw();
    },

    render: function() {
        return (
            <div id={`chart-${this.props.vizId}`} className="chart"></div>
        )
    },
})

module.exports = PieChart
