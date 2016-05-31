
import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadVisualization } from '../../actions/async'

import ChartView from '../../components/public/ChartViewEmbed'

function loadData(props) {
    const { id } = props

    props.loadVisualization(id)
}

let ChartViewEmbed = React.createClass({

    // componentWillMount: function() {
    //     loadData(this.props)
    // },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.id !== this.props.id) {
            loadData(this.props)
        }
    },

    render: function() {
        return (
            <ChartView
                {...this.props}
            />
        )
    }
})

import { 
    activeVisualizationSelector,
    visualizationItemSelector,
    visualizationContextSelector,
} from '../../reducers'

function mapStateToProps(state, props) {
    return {
        id: props.params.id,
        visualization: activeVisualizationSelector(state, props),
        items: visualizationItemSelector(state, props),
        context: visualizationContextSelector(state, props),
    }
}

import { LoaderWrapper, YetAnotherLoader } from '../../components/general/Loaders.react.jsx'

ChartViewEmbed = LoaderWrapper(
    ((props) => !!props.visualization),
    ChartViewEmbed,
    YetAnotherLoader,
    loadData, // method called when there is no data
)

export default connect(mapStateToProps, {
    loadVisualization
})(ChartViewEmbed)
