"use strict"

import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { withRouter } from 'react-router'
import Joyride from 'react-joyride'
import classNames from 'classnames'

// TODO: Inject this into containers instead, see react-redux - 2016-01-29
import store from '../app'
import { ChartTypeSelector, ChartSteps, ChartStyleControls, ChartPlaceholder } from '../components/chartbuilder/ChartConfiguration.react.jsx'
import { Chart } from '../components/chartbuilder/Chart.react.jsx'
import { ChartLegend, ChartFilters } from '../components/chartbuilder/ChartLegend.react.jsx'
import ChartTopControls from '../components/chartbuilder/ChartTopNav.react.jsx'
import SideBar from './ChartSideBar.react.jsx'
import { ChartLoader } from '../components/general/Loaders.react.jsx'

import { ChartName } from '../components/chartbuilder/ChartConfiguration.react.jsx'
import RichEditor from '../components/general/Input.react.jsx'

import { toggleMainMenu, clientError, setEditState, maxItemsReached } from '../actions/sync'
import { YetAnotherLoader } from '../components/general/Loaders.react.jsx'


import { 
    loadVisualization, 
    updateVisualization,
    forkVisualization,
    refreshVisualization,
    createVisualization,
    deleteVisualization,
    addItem,
    removeItem,
    replaceItem,
    addContext,
    removeContext,
    replaceContext,
    getItemFilters,
    getContextFilters,
    updateUserUI,
} from '../actions/async'

const chartColors = ['#8bc34a','#009688','#03a9f4','#3f51b5','#9c27b0','#f44336','#673ab7','#e91e63','#607d8b','#795548','#ff9800','#ffeb3b','#ff5722','#ffc107','#cddc39','#4caf50','#00bcd4','#2196f3','#9e9e9e','#000000','#0d47a1','#1a237e','#311b92','#4a148c','#880e4f','#b71c1c','#827717','#33691e','#1b5e20','#004d40','#006064','#01579b','#263238','#3e2723','#bf360c','#e65100','#ff6f00','#f57f17']

const steps = [
    {
        title: 'Chart name',
        text: 'Your chart\'s name will appear on its public page.',
        selector: '.jr-name',
        position: 'bottom',
        type: 'hover'
    },
    {
        title: 'Chart currency',
        text: 'You can either: <ul><li>Display just those data items with transactions in a specific currency</li><li>Or display all data items with transactions converted into one single currency</li></ul>',
        selector: '.jr-currency',
        position: 'left',
        type: 'hover'
    },
    {
        title: 'Chart items',
        text: 'Here you can select the data items that will draw the actual chart. The amount of items found depends on the filters you select.',
        selector: '.jr-items',
        position: 'left',
        type: 'hover'
    },
    {
        title: 'Chart filters',
        text: 'Here you can filter your data items. Select them to define a context for your data, for example to get all items belonging to one reporting organisation.',
        selector: '.jr-context',
        position: 'left',
        type: 'hover'
    },
    {
        title: 'Type of chart',
        text: 'Select one of the provided chart types. Feel free to experiment what works best for your selected data.',
        selector: '.jr-type',
        position: 'left',
        type: 'hover'
    },
    {
        title: 'Chart description',
        text: 'You can provide some additional information about your chart, using our rich text editor. What\'s the story behind it? Provide as much, or as little, background information as you like.',
        selector: '.wysiwyq',
        position: 'top',
        type: 'hover'
    },
    {
        title: 'Make your chart public',
        text: 'When you\'re ready, publish your chart onto the internet for everyone to see and use.',
        selector: '.publish',
        position: 'bottom',
        type: 'hover'
    }
]

function loadData(props) {
    const { id } = props
    props.loadVisualization(id, false)
    // get items for the first time for this visualization
    props.getItemFilters(id)
    props.getContextFilters(id)
}

// A state container: all children are stateless
let ChartBuilder = React.createClass({

    componentDidMount: function() {
        if (this.state.joyride) {
            this.refs.joyride.start(true)
        }
    },

    componentWillMount: function() {
        loadData(this.props)
        this.props.toggleMainMenu(false)
    },

    onItemChange: function(filter, aggregation, added, type) {
        let { visualization, items, contextFilters } = this.props

        // let filter = contextFilters[type][i];

        if (added) {
            let currentColors = _.map(items, item => item.itemProps.color)
            let availableColors = _.difference(chartColors, currentColors)

            let hasItemId = _.find(items, item => item.id === filter.id) 

            let item = {
                type: type,
                id: filter.id,
                name: filter.name,
                aggregations: aggregation,
                itemProps: {
                    color: availableColors[0],
                    colorById: hasItemId ? hasItemId.itemProps.color : availableColors[0]
                }
            }

            // limit items to 20
            // TODO: do this on server instead - 2016-05-18
            if (items.length > 19){
                this.props.maxItemsReached()
                return false
            }

            return this.props.addItem(visualization._id, item)

        } else {

            // TODO: unique identification for item, e.g. make sure selected item has _id as a property - 2016-02-15
            //
            let item = _.find(items, item => item.id === filter.id && item.aggregations === aggregation)

            return this.props.removeItem(visualization._id, item._id)
        }
    },

    onContextChange: function(filter, added, type) {
        /*
         * filter that can be applied multiple times with different values
        */
        let { visualization, contextFilters } = this.props
        if (added) {

            let context = {
                type: type,
                value: filter.id,
                name: filter.name
            }

            return this.props.addContext(visualization._id, context)
        } else {
            // TODO: Make sure _id is set on passed context 2016-02-17
            return this.props.removeContext(visualization._id, filter._id)
        }
    },

    replaceContext: function(type, value, name) {
        /*
         * singular filter
        */
        const { id, context } = this.props

        const prevFilter = _.find(context, x => x.type === type)

        console.log(value);

        if (prevFilter) {
            this.props.replaceContext(id, prevFilter._id, {
                type,
                value,
                name,
            })
        }
        else {
            this.props.addContext(id, {
                type,
                value,
                name,
            })
        }
    },

    hideItem: function(_id) {
        /*
         * Hide item with id ${id}
        */
        let { visualization, items } = this.props

        let oldItem = _.find(items, item => item._id === _id)
        let newItem = Object.assign({}, oldItem, { hidden: !oldItem.hidden })

        return this.props.replaceItem(visualization._id, _id, newItem)
    },

    removeItem: function(_id) {
        /*
         * Remove item with id ${id}
        */
        let { visualization } = this.props
        return this.props.removeItem(visualization._id, _id)
    },

    removeContext: function(_id) {
        /*
         * Remove context with id ${id}
        */

        let { visualization } = this.props
        return this.props.removeContext(visualization._id, _id)
    },

    changeCurrency: function(currency) {
        let { visualization, context } = this.props

        this.props.refreshVisualization(visualization._id, { currency: currency.value, currencyType: currency.currencyType })
    },

    changeChartType: function(e, b) {
        let { visualization } = this.props

        let prevType = visualization.type
        let newType = e.target.id

        // TODO: We don't need to redraw when chart type hasn't changed dimension - 2016-03-10

        switch(newType) {
            case 'line-chart':
            case 'bar-chart':
            case 'stacked-bar-chart':
                return this.props.refreshVisualization(visualization._id, { 
                        base_group: 'transaction_date_year', // TODO: more flexible ranges - 2016-03-10
                        type: newType
                    }, false)

            case 'bubble-chart':
            case 'pie-chart':
            case 'radar-chart':
            case 'tree-map':
                return this.props.refreshVisualization(visualization._id, { 
                        base_group: '',
                        type: newType
                    }, false)
        }
    },

    saveDescription: function(value, valuePlainText) {
        let { visualization } = this.props
        this.props.updateVisualization(visualization, { description: value })
            .then( this.props.updateVisualization(visualization, { descriptionPlainText: valuePlainText }) )
            .then( this.props.setEditState(false) )
    },

    saveTitle: function(e) {
        let { visualization } = this.props
        let title = e.target.value
        this.props.updateVisualization(visualization, { name: title })
            .then( this.props.setEditState(false) )
    },
    editTitle: function() {
        if (!this.props.editing) {
            this.props.setEditState(true)
        }
    },

    toggleInterpolation: function(interpolate) {
        let { visualization } = this.props
        this.props.updateVisualization(visualization, { chartProps: {interpolation: interpolate} })
    },

    changeColorRange: function([range]) {
        //todo
        let { visualization } = this.props
    },

    getInitialState: function() {
        return {
            steps: steps,
            joyride: this.props.uiState.joyride,
        }
    },

    completeCallback: function() {
        this.props.updateUserUI({
            joyride: false,
            splashScreen: this.props.uiState.splashScreen,
        })
    },

    startTour: function() {
        this.refs.joyride.reset()
        this.refs.joyride.start(true)
    },

    render: function() {
        if (!this.props.visualization) {
            return <YetAnotherLoader />
        }

        const { visualization, items, context, contextFilters, itemFilters, menuState, loadingChart, id } = this.props

        let result = visualization.result

        let loadClass = classNames({ loading: loadingChart })

        return (
            <div>
                <Joyride 
                    ref="joyride"
                    steps={this.state.steps}
                    showSkipButton={true}
                    showOverlay={true}
                    type='continuous'
                    completeCallback={this.completeCallback}
                    locale={{back: "Back", close: 'Close', last: 'Ok, I got it', next: 'Next', skip: 'Skip tour' }}
                    showStepsProgress={false} />
                <section id="chart-builder-wrapper" className={loadClass}>
                    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        {loadingChart ? <ChartLoader className="overlay white"/> : null}
                    </ReactCSSTransitionGroup>

                    <div className="chart-main build-menu-open">
                        <div className="chart-topnav">
                            <ChartTopControls 
                                clientError={this.props.clientError}
                                visualization={visualization}
                                createVisualization={this.props.createVisualization}
                                forkVisualization={this.props.forkVisualization}
                                updateVisualization={this.props.updateVisualization}
                            />
                        </div>

                        <div className="row">
                            <div className="columns small-12 medium-6 large-8 xlarge-9">

                                <div className="row">
                                    <div className="columns small-12"> 
                                        <div className="tour-button show-for-small-only"><a onClick={this.startTour}><i className="material-icons">help</i> Give me a tour</a></div>
                                        <ChartName onChange={_.debounce(this.saveTitle, 1000)} name={visualization.name} onEdit={this.editTitle} />
                                    </div>
                                </div>
                            
                                <div className="row">
                                    <div className="columns small-12"> 
                                    {items.length > 0 ? 
                                        <div className="chart-wrapper">
                                            <Chart vizId={id} chartType={visualization.type} items={items} chartProps={visualization.chartProps} currency={visualization.currency}/>
                                            <ChartStyleControls visualization={visualization} toggleInterpolation={this.toggleInterpolation}/>
                                            <div className="origin">Data from: <a href="http://www.iatiregistry.org/" target="_blank">IATI Registry (International Aid Transparency Initiative)</a></div>
                                        </div>
                                    : 
                                        <div className="chart-wrapper">
                                            <ChartPlaceholder />
                                        </div>
                                    }
                                    </div>
                                </div>

                                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                                    {context.length || items.length ?
                                    <div className="row">
                                        <div className="columns small-12 large-6">
                                            <div className="legend chart-filters">
                                                <h5>Context chart</h5>
                                                {context.length ? <ChartFilters context={context} onClick={this.removeContext}/>  : <p>No filters active yet. Set some on the right.</p> }
                                            </div>
                                        </div>
                                        <div className="columns small-12 large-6">
                                            <div className="legend chart-legend">
                                                <h5>Selected items for plotting chart</h5>
                                                {items.length ? <ChartLegend items={items} onRemove={this.removeItem} onHide={this.hideItem} /> : <p>No items selected yet. Select some on the right.</p>}
                                            </div>
                                        </div>
                                    </div>
                                    : null }
                                </ReactCSSTransitionGroup>

                                <div className="row description">
                                    <div className="columns small-12">
                                        <h3 className="chart-step">Add chart description</h3>
                                        <RichEditor saveDescription={this.saveDescription} defaultContent={visualization.description} />
                                    </div>
                                </div>
                            </div>
                            <div className="columns small-12 medium-6 large-4 xlarge-3">
                                <div className="tour-button hide-for-small-only"><a onClick={this.startTour}><i className="material-icons">help</i> Give me a tour</a></div>
                                <div className="builder-menu open">
                                    <SideBar 
                                        visualization={visualization}
                                        items={items}
                                        context={context}
                                        contextFilters={contextFilters}
                                        itemFilters={itemFilters}
                                        removeContext={this.removeContext}
                                        replaceContext={this.replaceContext}
                                        onChangeCurrency={this.changeCurrency}
                                        onItemChange={this.onItemChange}
                                        onContextChange={this.onContextChange}
                                        changeChartType={this.changeChartType}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        )

    }
})

import { 
    activeVisualizationSelector,
    visualizationItemSelector,
    visualizationContextSelector,
} from '../reducers'

function mapStateToProps(state, props) {
    const { 
        loadState,
        contextFilters,
        //saveState,
        entities: {
            itemFilters
        }
    } = state

    return {
        id: props.params.id,
        visualization: activeVisualizationSelector(state, props),
        items: visualizationItemSelector(state, props),
        context: visualizationContextSelector(state, props),
        contextFilters: contextFilters,
        itemFilters: itemFilters,
        loadingChart: loadState.loadingChart,
        uiState: state.user.uiState,
        //editing: saveState.editing,
    }
}

export default connect(mapStateToProps, {
    loadVisualization,
    toggleMainMenu,
    createVisualization,
    updateVisualization,
    forkVisualization,
    refreshVisualization,
    deleteVisualization,
    addItem,
    removeItem,
    replaceItem,
    addContext,
    removeContext,
    replaceContext,
    getItemFilters,
    getContextFilters,
    maxItemsReached,
    updateUserUI,
    clientError,
    setEditState
})(ChartBuilder)

