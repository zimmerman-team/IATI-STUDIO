
"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import { currencies } from 'country-data'
import BaseChart, { updateBaseChart } from './BaseChart'

class BarChart extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(),
        items: PropTypes.object,
        currency: PropTypes.string,
        noTimeline: PropTypes.bool
    };

    componentDidMount() {
        let { data, attributes, noTimeline } = this.props

        // var data = this.state.data;
        this.visualization = BaseChart(this.props)
            .type("bar")
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
            .data(data)
            .id("id")
            .text(x => x.name + " - " + x.aggregation)
            .x({value: "x", label: "Year"})
            .y({value: "y", label: "Transaction value"})
            .time("x")
            .timeline(noTimeline ? false : {
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
            .tooltip(["x", "y", "count", "activity_count"])
            .draw()

    }

    componentDidUpdate() {
        let { data, attributes } = this.props

        updateBaseChart(this.visualization, this.props)
            .data(data)
            .draw();

    }

    render() {
        return (
            <div id={`chart-${this.props.vizId}`} className="chart"></div>
        )
    }
}

module.exports = BarChart
