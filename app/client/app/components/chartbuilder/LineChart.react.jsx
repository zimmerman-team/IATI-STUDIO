
"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import BaseChart, { updateBaseChart } from './BaseChart'

const LineChart = React.createClass({

    propTypes: {
        data: PropTypes.arrayOf(),
        items: PropTypes.object,
        noTimeline: PropTypes.bool
    },

    componentDidMount: function() {
        let { id, data, chartProps, attributes, noTimeline } = this.props

        // var data = this.state.data;
        this.visualization = BaseChart(this.props)
            .data(data)
            .axes({
                'background' : {
                    'color': '#ffffff',
                    'stroke' : {
                        'color' : '#cccccc',
                        'width' : '1'
                    }
                },
                'mirror' : false,
                'ticks' : true
            })
            .type("line")
            .id("id")
            .text(x => x.name + " - " + x.aggregation)
            .x({value: "x", label: "Year"})
            .y({value: "y", label: "Transaction value"})
            .time(noTimeline ? false : "x")
            .timeline({
                handles: {
                    color: '#3A99D8',
                    stroke: 0,
                    size: 3,
                    opacity: 1,
                    hover: '#298dcf'
                },
                height: false,
                tick: '#e6e6e6',
            })
            .shape({
               "interpolate": chartProps.interpolation ? chartProps.interpolation : 'linear'
            })
            .tooltip(["x", "y", "count", "activity_count"])
            .draw()
    },

    componentDidUpdate: function() {
        let { data, chartProps, attributes } = this.props


        updateBaseChart(this.visualization, this.props)
            .shape({
               "interpolate": chartProps.interpolation ? chartProps.interpolation : 'linear'
            })
            .data(data)
            .draw();
    },

    render: function() {
        return (
            <div id={`chart-${this.props.vizId}`} className="chart"></div>
        )
    },
})

module.exports = LineChart
