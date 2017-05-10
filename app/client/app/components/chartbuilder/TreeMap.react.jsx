
"use strict"

import React, { PropTypes } from 'react'
import d3plus from 'd3plus'
import _ from 'lodash'

import BaseChart, { updateBaseChart } from './BaseChart'

class TreeMap extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(),
        items: PropTypes.object
    };

    componentDidMount() {
        let { data, attributes } = this.props

        this.visualization = BaseChart(this.props)
            .data(data)
            .type("tree_map")
            .id("id")
            .text(x => x.name + ' - ' + x.aggregation)
            .size("y")
            .labels({
                "align": "center",
                "valign": "top",
                "padding": 30
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

module.exports = TreeMap
