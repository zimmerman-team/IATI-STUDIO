
"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'

import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import { CollectionCard, CollectionSwitch, OrderButton } from '../components/collections/CollectionElements.react.jsx'
import SplashScreen from '../components/collections/CollectionSplash.react.jsx'

import { GeneralLoader } from '../components/general/Loaders.react.jsx'

import { toggleMainMenu } from '../actions/sync'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { YetAnotherLoader } from '../components/general/Loaders.react.jsx'
import { loadVisualizations, updateVisualization, forkVisualization } from '../actions/async'

function loadData(props) {
    props.loadVisualizations(false)
}

let CollectionList = React.createClass({

   /* getDefaultProps: function() {
        return {
            visualizations: VisItems,
            switchState: {
                themes: true,
                charts: true,
                iatidata: true
            },
            themecount: _.filter(VisItems, ['type', 'themes']).length,
            chartcount: _.filter(VisItems, ['type', 'charts']).length,
            iatidatacount: _.filter(VisItems, ['type', 'iatidata']).length,
        }
    },*/

    getInitialState: function() {
        return {
            orderBy: 'last_updated',
            orderByReverse: false,
        };
    },

    componentDidMount: function() {
        store.dispatch(toggleMainMenu(true))
        loadData(this.props)
    },

    onOrderClick: function(orderBy, e) {
        if (orderBy == this.state.orderBy){ 
            this.setState({orderByReverse: !this.state.orderByReverse})
        } else {
            this.setState({orderBy: orderBy})
        }
    },

    sortViz: function(viz, type, reverse) {
        let visualizationsSorted
        let rev
        if (type == 'name') {
            rev = 'asc'
            if (reverse) rev = 'desc'
            visualizationsSorted = _.orderBy(viz, function(n) {
                return n[type].toLowerCase();
            }, rev);
        }
        else if (type == 'created' || type == 'last_updated') {
            rev = 'desc'
            if (reverse) rev = 'asc'
            visualizationsSorted = _.orderBy(viz, function(n) {
                return new Date(n[type]);
            }, rev);
        }
        return visualizationsSorted
    },

    archiveItem: function(item){
        this.props.updateVisualization(item, { archived: true, archivedDate: Date.now(), public: false })
    },

    render: function() {
        if (this.props.loadState.loadingAllViz) {
            return <YetAnotherLoader />
        }

        const {
            navState,
            visualizations,
            loadState
        } = this.props

        let wrapClass = classNames('pusher',{
            'pushed' : navState.menuState
        })

        var visualizationsFiltered = _.filter(visualizations, { 'archived': false });
        var visualizationsSorted = this.sortViz(visualizationsFiltered, this.state.orderBy, this.state.orderByReverse)

        let orderName = classNames({
            active : this.state.orderBy == 'name',
            reverse : this.state.orderByReverse
        })

        let orderCreated = classNames({
            active : this.state.orderBy == 'created',
            reverse : this.state.orderByReverse
        })

        let orderModified = classNames({
            active : this.state.orderBy == 'last_updated',
            reverse : this.state.orderByReverse
        })

        let orderByClass = classNames('order-by', {
            inactive : _.isEmpty(visualizationsSorted)
        })

        //console.log(visualizations)
        //console.log(visualizationsSorted)

        return (
            <div className={wrapClass}>
                <div id="collection-wrapper">
                    <SplashScreen />
                    <div className="row controls">
                        <div className="columns small-12">
                            <h2 className="page-title">Dashboard</h2> 
                            <CollectionSwitch type="charts" count={visualizationsFiltered.length} />
                            <div className={orderByClass}>
                                <span className="label">Sort by</span>
                                <OrderButton name="name" onClick={this.onOrderClick.bind(this, 'name')} className={orderName}/>
                                <span className="separator">|</span>
                                <OrderButton name="created" onClick={this.onOrderClick.bind(this, 'created')} className={orderCreated}/>
                                <span className="separator">|</span>
                                <OrderButton name="modified" onClick={this.onOrderClick.bind(this, 'last_updated')} className={orderModified}/>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="collections row">
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
                            {loadState.loadingAllViz ? 
                                <GeneralLoader/> 
                            : 
                                visualizationsSorted.map( (item, i) => {
                                    return (
                                        <CollectionCard
                                            key={item._id}
                                            id={item._id}
                                            title={item.name}
                                            description={item.description}
                                            type={'charts'}
                                            type_detail={item.type}
                                            archiveItem={this.archiveItem.bind(this, item)}
                                            dateCreated={item.created} 
                                            lastUpdated={item.last_updated}
                                            forkVisualization={this.props.forkVisualization}
                                            public={item.public}
                                        />
                                    )
                                })
                            }
                        </ReactCSSTransitionGroup>

                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
                            {_.isEmpty(visualizationsSorted) ? 
                                <div className="columns small-12 empty-message">
                                    <p>Your library is currently empty. Create a chart by using the menu on the left.</p>
                                </div>
                            : null }
                        </ReactCSSTransitionGroup>

                    </div>
                </div>
            </div>
        )
    }
})

import { myVisualizationsSelector } from '../reducers'

function mapStateToProps(state, props) {

    const {
        loadState,
        navState
    } = state

    return {
        visualizations: myVisualizationsSelector(state, props),
        loadState: loadState,
        navState: navState
    }
}

export default connect(mapStateToProps, {
    loadVisualizations,
    updateVisualization,
    forkVisualization
})(CollectionList)
