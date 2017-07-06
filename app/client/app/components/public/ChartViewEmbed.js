import _ from 'lodash'
import moment from 'moment'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { Chart } from '../../components/chartbuilder/Chart.react.jsx'
import { PublicChartLegend, PublicChartFilters } from '../../components/chartbuilder/ChartLegend.react.jsx'
import { PublicChartActions } from '../../components/chartbuilder/ChartTopNav.react.jsx'

import default_avatar from '../../../img/avatar.svg'

export class ChartView extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        visualization: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        context: PropTypes.array.isRequired,
    };

    render() {
        const { visualization, items, context } = this.props
        let updateDate = moment(visualization.last_updated).format("D MMM YYYY")
        
        return (
            <div className="public-chart">
                {/*<PublicChartActions />*/}
                <div id="chart-canvas">
                    <div id="chart-embed">
                        <h1 style={{fontFamily:'proxima-nova, sans-serif'}}>{visualization.name}</h1>
                        { !_.isEmpty(context) ? 
                            <PublicChartFilters context={context} />
                            :
                        null }
                        <PublicChart items={items} context={context} visualization={visualization} />
                        <p>Data from: <a href="http://www.iatiregistry.org/" target="_blank">IATI Registry (International Aid Transparency Initiative)</a></p>
                        <p>Powered by <a href="http://www.iatistudio.com" target="_blank">IATI Studio</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChartView

import { hideVisualizationFromFeed } from '../../actions/async'
import { connect } from 'react-redux'

export const ChartViewList = connect(null, { hideVisualizationFromFeed })(class extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        visualization: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        context: PropTypes.array.isRequired,
        isAdmin: PropTypes.bool,
    };

    render() {
        const { id, visualization, items, context } = this.props
        let updateDate = moment(visualization.last_updated).format("D MMM YYYY")
        
        return (
            <div className="columns small-12 large-6 end">
                <div className="chart-list-item public-chart">
                    <Link to={`/public/charts/${visualization._id}`} className="detail-link"/>
                    <section className="meta">
                        <div className="avatar">
                            <img src={visualization.author.avatar ? visualization.author.avatar : default_avatar} />
                        </div>
                        <div className="right">
                            {visualization.author.firstName && visualization.author.lastName ? 
                            <p>{visualization.author.firstName} {visualization.author.lastName}</p>
                            :
                            <p>{visualization.author.username ? visualization.author.username : 'IATI Studio user'}</p>
                            }
                            <p>{updateDate ? updateDate : 'Unknown date'}</p>
                        </div>
                        {
                            this.props.isAdmin ? 
                            <div className="admin-remove switch">
                                <label>
                                    <span>hide from feed</span>
                                    <input type="checkbox" onChange={this.props.hideVisualizationFromFeed.bind(null, id)} checked={visualization.hiddenFromFeed}/>
                                    <span className="lever"></span>
                                </label>
                            </div>
                            : null
                        }
                    </section>
                    <div className="public-chart">
                        {/*<PublicChartActions />*/}
                        <div id="chart-canvas">
                            <div id="chart-embed">
                                <h5>{visualization.name ? visualization.name : 'No title'}</h5>
                                <PublicChart items={items} context={context} visualization={visualization} noLegend={true} noTimeline={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
    }
})

export const PublicChart = props => {
    const { visualization, items, context, noLegend, noTimeline } = props

    return (
        <div id="the-chart">
            <Chart 
                vizId={visualization._id}
                chartType={visualization.type}
                items={items}
                chartProps={visualization.chartProps}
                noTimeline={noTimeline}
                currency={visualization.currency}
            />
            { noLegend ? null :
            <div className="legend row" style={{fontFamily:'proxima-nova, sans-serif'}}>
                <div className="columns small-11 large-10 small-centered">
                    <h6>Legend</h6>
                    {!_.isEmpty(items) ? 
                        <PublicChartLegend items={items} />
                        :
                        <p>No items available</p>
                    }
                </div>
            </div>
            }
        </div>
    )
}
PublicChart.propTypes = {
    visualization: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    context: PropTypes.array.isRequired,
}
