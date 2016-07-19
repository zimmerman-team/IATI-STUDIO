"use strict"

import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import { changeLevel, setLoadStateItems } from '../actions/sync'
import { ChartTypeSelector, ChartName, ChartCurrency, ChartDescription } from '../components/chartbuilder/ChartConfiguration.react.jsx'
import { SideBarHeader } from '../components/chartbuilder/SideBarElements.react.jsx'

import { GeneralLoader, ChartLoader } from '../components/general/Loaders.react.jsx'

import ChartContext from '../components/chartbuilder/ChartContext.react.jsx'
import ChartElements from '../components/chartbuilder/ChartElements.react.jsx'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const ChartSideBar = React.createClass({

    propTypes: {
        visualization: PropTypes.object,
        items: PropTypes.array,
        context: PropTypes.array,
        onItemChange: PropTypes.func,
        onContextChange: PropTypes.func,
    },

    getInitialState: function() {
        return {
            level: 'cb-main'
        }
    },

    changeLevel: function(level){
        //store.dispatch(changeLevel(level))
        if (level == this.state.level) {
            this.setState({level: 'cb-main'})
        }
        else {
            this.setState({level: level})
        }
    },

    render: function() {
        // if (!this.props.navState) return null

        const { 
            expanded,
            level,
            contextFilters,
            itemFilters,
            visualization,
            items,
            context,
            loadState,
            onItemChange,
            onContextChange,
        } = this.props

        let currentLevel = level

        if (!level) 
            currentLevel = 'cb-main'

        let statusClass = classNames('nav-wrap', {
            'disabled' : loadState.loadingChart,
        })

        return (
            <div className={statusClass}>

                <div className="section jr-currency">
                    <h3 className="chart-step">Step 1: Select currency</h3>
                    <div className="action">
                        <ChartCurrency 
                            value={this.props.visualization.currency} 
                            currencyType={this.props.visualization.currencyType} 
                            changeCurrency={this.props.onChangeCurrency}/>
                    </div>
                </div>

                <div className="section jr-items">
                    <h3 className="chart-step">Step 2: Start plotting your chart</h3>
                    <div className="items">

                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
                            {loadState.loadingItems ? 
                                <GeneralLoader /> 
                            : 
                                <ChartElements 
                                    onItemChange={onItemChange}
                                    filters={itemFilters} 
                                    items={items}
                                /> 
                            }
                        </ReactCSSTransitionGroup>

                    </div>
                </div>

                <div className="section jr-context">
                    <h3 className="chart-step">Step 3: Set filters for your selection</h3>
                    {
                        loadState.loadingContext ? 
                            <GeneralLoader /> 
                        : 
                        <ContextBar 
                            changeLevel={this.changeLevel}
                            loadState={loadState.loadingContext}
                            loadChart={loadState.loadingChart}
                            onContextChange={onContextChange}
                            replaceContext={this.props.replaceContext}
                            removeContext={this.props.removeContext}
                            context={context}
                            contextFilters={contextFilters}/>
                    }
                </div>

                <div className="section jr-type">
                    <h3 className="chart-step">Step 4: Select chart type</h3>
                    <div className="action">
                        <ChartTypeSelector value={this.props.visualization.type} onChange={this.props.changeChartType} />
                    </div>
                </div>
            </div>
        )
    }
})

const ContextBar = React.createClass({
    // mixins: [
    //     require('react-onclickoutside')
    // ],
    getInitialState: function() {
        return {
            showLimit: true,
        }
    },
    toggleShow: function() {
        this.setState({showLimit: !this.state.showLimit})
    },
    // handleClickOutside: function(e) {
    //     console.log('outside')
    // },
    render: function() {
        let showClass = classNames('filters',{limit: this.state.showLimit})
        return (
                <div className={showClass}>
                    <ChartContext 
                        onContextChange={this.props.onContextChange}
                        removeContext={this.props.removeContext}
                        replaceContext={this.props.replaceContext}
                        filters={this.props.contextFilters}
                        context={this.props.context}
                    />
                    <a className="show-toggle" onClick={this.toggleShow}>{this.state.showLimit ? <span><i className="material-icons">add</i> show more</span> : <span><i className="material-icons">remove</i> show less</span> }</a>
                </div>
            
        )
    }
})

function mapStateToProps(state, props) {
    const { activeViz, navState, loadState } = state

    return {
        activeViz: activeViz,
        level: navState.level,
        expanded: navState.expanded,
        loadState: loadState,
    }
}

export default connect(mapStateToProps)(ChartSideBar)
