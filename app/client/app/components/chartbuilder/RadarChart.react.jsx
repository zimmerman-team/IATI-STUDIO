


"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import BaseChart, { updateBaseChart } from './BaseChart'

class RadarChart extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(),
        items: PropTypes.object
    };

    componentDidMount() {
        let { data, attributes } = this.props

        console.log(data);

        // var data = this.state.data;
        this.visualization = BaseChart(this.props)
            .data(data)
            .type("radar")
            .id(["name", "aggregation"])
            // .depth(1)
            .size("y")
            .text({
                "name": "name",
                "aggregation": "aggregation"
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
            <div id={`chart-${this.props.vizId}`} className="chart"></div>
        )
    }
}

module.exports = RadarChart
