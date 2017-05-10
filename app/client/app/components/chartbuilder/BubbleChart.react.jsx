"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import BaseChart, { updateBaseChart } from './BaseChart'

class BubbleChart extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(),
        items: PropTypes.object
    };

    componentDidMount() {
        let { data, attributes } = this.props

        // var data = this.state.data;
        this.visualization = BaseChart(this.props)
            .color({
                value: "hex"
            })
            .data(data)
            .type("bubbles")
            .id(["aggregation", "id"])
            .depth(1)
            .size({
                "scale": {
                    "domain": {
                        "min": 0,
                    }
                },
                "value": "y",
            })
            .text({
                "aggregation": "aggregation",
                "id": "name",
                "wooow": "name"
            })
            .labels({
                "align": "center",
                "valign": "middle",
                "padding": 10
            })
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
            <div>
                <div id={`chart-${this.props.vizId}`} className="chart"></div>
            </div>
        )
    }
}

module.exports = BubbleChart
