"use strict"

import _ from 'lodash'
import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import app from '../../reducers'

import BarChart from './BarChart'
import StackedBarChart from './StackedBarChart.react.jsx'
import LineChart from './LineChart.react.jsx'
import PieChart from './PieChart.react.jsx'
import TreeMap from './TreeMap.react.jsx'
import BubbleChart from './BubbleChart.react.jsx'
import RadarChart from './RadarChart.react.jsx'

import PureRenderMixin from 'react-addons-pure-render-mixin'

export const Chart = React.createClass({

    PropTypes: {
        vizId: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        chartType: PropTypes.string,
        currency: PropTypes.string,
        chartProps: PropTypes.object,
        noTimeline: PropTypes.bool
    },

    shouldComponentUpdate: PureRenderMixin.shouldComponentUpdate,

    // TODO: Would be unnescessary if we used immutable.js 2016-03-24
    shouldComponentUpdate: function(nextProps, nextState) {

        // TODO: ew performance is very bad, we need immutable.js... - 2016-03-24
        return (
            !_.isEqual(this.props.items, nextProps.items)
            || !_.isEqual(this.props.chartProps, nextProps.chartProps)
            || this.props.chartType !== nextProps.chartType
        )
    },

    mapData: function(item) {
        return Object.assign({}, item, {
            id: item.id + item.aggregation
        })
    },

    render: function() {
        let { chartType, items, chartProps, currency, vizId, noTimeline } = this.props

        let attributes = _.map(items, (item, i) => {
            return {
                "id": item.id + item.aggregations,
                "hex": item.itemProps.color,
            }
        })

        let bubbleAttributes = _.map(items, (item, i) => {
            return {
                "id": item.id + item.aggregations,
                "hex": item.itemProps.colorById,
            }
        })

        let data = _(items)
            .filter(item => !item.hidden)
            .map(item => item.result)
            .flatten()
            .map(this.mapData)
            .value()

        switch(chartType) {
            case 'line-chart':
                return <LineChart vizId={vizId} data={data} chartProps={chartProps} currency={currency} attributes={attributes} noTimeline={noTimeline}/>
            case 'bar-chart':
                return <BarChart vizId={vizId} data={data} currency={currency} attributes={attributes} noTimeline={noTimeline}/>
            case 'stacked-bar-chart':
                return <StackedBarChart vizId={vizId} data={data} currency={currency} attributes={attributes} noTimeline={noTimeline}/>
            case 'pie-chart':
                return <PieChart vizId={vizId} data={data} currency={currency} attributes={attributes}/>
            case 'tree-map':
                return <TreeMap vizId={vizId} data={data} currency={currency} attributes={attributes}/>
            case 'bubble-chart':
                return <BubbleChart vizId={vizId} data={data} currency={currency} attributes={bubbleAttributes}/>
            case 'radar-chart':
                return <RadarChart vizId={vizId} data={data} currency={currency} attributes={attributes}/>
            default:
                return <BarChart vizId={vizId} data={data} currency={currency} attributes={attributes} noTimeline={noTimeline}/>
        }
    }
})

