
import _ from 'lodash'
import moment from 'moment'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Chart } from '../../components/chartbuilder/Chart.react.jsx'
import { PublicChartLegend, PublicChartFilters } from '../../components/chartbuilder/ChartLegend.react.jsx'
import { PublicChartActions } from '../../components/chartbuilder/ChartTopNav.react.jsx'

//import Scroll from 'react-scroll' 
import { Tooltip } from '../../components/general/Tooltip.react.jsx'

import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw, ContentState, convertToRaw } from 'draft-js'

import default_avatar from '../../../img/avatar.svg'
import { withRouter, Link } from 'react-router'

import DocumentTitle from "react-document-title"

function loadData(props) {
    const { id, isPreview } = props

    if (isPreview) {
        // fetch from private API
        props.loadVisualization(id, false)
    } else {
        // fetch from public API
        props.loadVisualization(id, true)
    }
}

let ChartView = withRouter(React.createClass({

    PropTypes: {
        isPreview: PropTypes.string
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.id !== this.props.id) {
            loadData(this.props)
        }
    },

    forkVisualization: function(id) {
        this.props.forkVisualization(id)
            .then(action => action.response.result)
            .then(viz_id => this.props.router.push(`/chartbuilder/${viz_id}`))
    },

    editVisualization: function(id){
        this.props.router.push(`/chartbuilder/${id}`)
    },

    goBack: function() {
        //this.props.router.goBack()
        this.props.router.push('/public/charts')
    },

    render: function() {
        const { visualization, items, context } = this.props
        let updateDate = moment(visualization.last_updated).format("D MMM YYYY")

        let content = visualization.description

        if (typeof content == 'string'){
            let emptyContentState = ContentState.createFromText('')
            content = convertToRaw(emptyContentState)
        }

        if (typeof content.entityMap == "undefined") {
            content.entityMap = {}
        }

        let ContentSt = convertFromRaw(content)
        //let contentState = ContentState.createFromBlockArray(ContentSt)
        let contenthtml = stateToHTML(ContentSt)

        let currentURL = window.location.href
        let currentHost = window.location.host

        function createMarkup() { return {__html: contenthtml } }

        return (
            <DocumentTitle title={'IATI Studio | '+visualization.name}>
                <div className="row public-chart">
                    <div className="columns small-12">
                        <a onClick={this.goBack} className="back-link"><span className="button flat"><i className="material-icons">arrow_back</i></span>Back to the community feed</a>
                        {/*<Scroll.Link to="comments" spy={true} smooth={true} offset={-150} duration={500} className="to-comments">
                            <Tooltip tooltip="View comments"><i className="material-icons comment-link">chat_bubble_outline</i></Tooltip>
                        </Scroll.Link>*/}
                        <PublicChartActions 
                            forkVisualization={this.forkVisualization.bind(null, visualization._id)}
                            editVisualization={this.editVisualization.bind(null, visualization._id)}
                            vizId={visualization._id}
                            isPreview={this.props.isPreview}
                            embedUrl={currentURL} 
                            shareUrl={encodeURIComponent(currentURL)}
                            embedHeight={this.embedHeight}/>
                        <section className="meta">
                            <div className="avatar">
                                <img src={visualization.author.avatar ? visualization.author.avatar : default_avatar} />
                            </div>
                            <div className="right">
                                {visualization.author.firstName && visualization.author.lastName ? 
                                <p>{visualization.author.firstName} {visualization.author.lastName}</p>
                                :
                                <p>{visualization.author.username}</p>
                                }
                                <p>{updateDate}</p>
                                <p>Data from: <a href="http://www.iatiregistry.org/" target="_blank">IATI Registry (International Aid Transparency Initiative)</a></p>
                            </div>
                        </section>
                        <div id="chart-canvas" className="public public-chart">
                            <div id="chart-embed">
                                <div className="row">
                                    <div className="columns small-12 medium-10 large-9 xlarge-8 xxlarge-7 small-centered">
                                        <h1>{visualization.name}</h1>
                                        { !_.isEmpty(context) ? 
                                            <PublicChartFilters context={context} />
                                            :
                                        null }
                                    </div>
                                </div>
                                <PublicChart items={items} context={context} visualization={visualization} />
                            </div>

                            <section className="description row">
                                <div className="columns small-12 medium-8 large-7 xlarge-6 xxlarge-5 small-centered" dangerouslySetInnerHTML={createMarkup()} />
                            </section>
                        </div>
                    </div>
                </div>
                {/*<div className="comments">
                    <div className="row">
                        <div className="columns small-12 medium-11 large-10 xlarge-9 small-centered">
                            <Scroll.Element name="comments" />
                            <div id="disqus_thread"></div>
                        </div>
                    </div>
                </div>*/}
            </DocumentTitle>
        )
    }
}))

export const PublicChart = props => {
    const { visualization, items, context } = props
    return (
        <div id="the-chart">
            <Chart 
                vizId={visualization._id}
                chartType={visualization.type}
                items={items}
                chartProps={visualization.chartProps}
                currency={visualization.currency}
            />
            <div className="row legend">
                <div className="columns small-11 large-10 small-centered">
                    <h6>Legend</h6>
                    {!_.isEmpty(items) ? 
                        <PublicChartLegend items={items} />
                        :
                        <p>No items available</p>
                    }
                    { /* !_.isEmpty(context) ? 
                        <span><hr /><PublicChartFilters context={context} /></span>
                        :
                    null */ }
                </div>
            </div>
        </div>
    )
}

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

ChartView = LoaderWrapper(
    ((props) => !!props.visualization),
    ChartView,
    YetAnotherLoader,
    loadData, // method called when there is no data
)

import { loadVisualization, forkVisualization } from '../../actions/async'

export default connect(mapStateToProps, {
    loadVisualization,
    forkVisualization,
})(ChartView)
