
"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'

import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import { CollectionCardArchive, CollectionSwitch, OrderButton } from '../components/collections/CollectionElements.react.jsx'

import { GeneralLoader } from '../components/general/Loaders.react.jsx'
import { ModalButton } from '../components/general/Modal.react.jsx'

import { toggleMainMenu } from '../actions/sync'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { YetAnotherLoader } from '../components/general/Loaders.react.jsx'

import { loadVisualizations, updateVisualization, deleteVisualization, emptyVisualisationTrash } from '../actions/async'


function loadData(props) {
    // TODO: load only trashed visualizations - 2016-05-23
    props.loadVisualizations(false)
}
    
let Archive = React.createClass({

    getInitialState: function() {
        return {
            orderBy: 'archivedDate',
            orderByReverse: false,
        };
    },

    componentWillMount: function() {
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

    restoreViz: function(viz){
        this.props.updateVisualization(viz._id, { archived: false })
    },

    deleteViz: function(viz){
        //var r = confirm("This will permanently delete this viz. Are you sure?");
        this.props.deleteVisualization(viz._id)
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
        else if (type == 'archivedDate') {
            rev = 'desc'
            if (reverse) rev = 'asc'
            visualizationsSorted = _.orderBy(viz, function(n) {
                return new Date(n[type]);
            }, rev);
        }
        return visualizationsSorted
    },
    emptyTrash: function() {
        this.props.emptyVisualisationTrash()

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

        var visualizationsFiltered = _.filter(visualizations, { 'archived': true });
        var visualizationsSorted = this.sortViz(visualizationsFiltered, this.state.orderBy, this.state.orderByReverse)

        let orderName = classNames({
            active : this.state.orderBy == 'name',
            reverse : this.state.orderByReverse
        })

        let orderArchive = classNames({
            active : this.state.orderBy == 'archivedDate',
            reverse : this.state.orderByReverse
        })

        let emptyButtonClass = classNames('button alert', {
            inactive : _.isEmpty(visualizationsSorted)
        })

        let orderByClass = classNames('order-by', {
            inactive : _.isEmpty(visualizationsSorted)
        })

        return (
            <div className={wrapClass}>
                <div id="collection-wrapper" className="archive">
                    <div className="row controls">
                        <div className="columns small-12">
                            <div className="text-center">
                                <TrashButton onEmpty={this.emptyTrash} className={emptyButtonClass} />
                            </div>
                            <hr className="top-hr"/>
                            <h2 className="page-title">Trash</h2>
                            <CollectionSwitch type="charts" count={visualizationsFiltered.length} />
                            <div className={orderByClass}>
                                <span className="label">Sort by</span>
                                <OrderButton name="name" onClick={this.onOrderClick.bind(this, 'name')} className={orderName}/>
                                <span className="separator">|</span>
                                <OrderButton name="date deleted" onClick={this.onOrderClick.bind(this, 'archivedDate')} className={orderArchive}/>
                            </div>
                            <hr />
                        </div>
                    </div>
                <div className="collections row">
                    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
                        {loadState.loadingAllViz ? 
                            <GeneralLoader/> 
                        : 
                            visualizationsSorted.map( (viz, i) => {
                                return (
                                    <CollectionCardArchive
                                        key={viz._id}
                                        id={viz._id}
                                        title={viz.name}
                                        description={viz.description}
                                        type={'charts'}
                                        type_detail={viz.type}
                                        restoreViz={this.restoreViz.bind(this, viz)}
                                        deleteViz={this.deleteViz.bind(this, viz)}
                                        dateArchived={viz.archivedDate} 
                                    />
                                )
                            })
                        }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}> 
                        {_.isEmpty(visualizationsSorted) ? 
                            <div className="columns small-12 empty-message">
                                <p>The trash is currently empty</p>
                            </div>
                        : null }
                    </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        )
    }
})

const TrashButton = props => {
    return (
        <ModalButton name="Empty trash" className={props.className} closeButton="Cancel" actionButton="Empty trash" action={props.onEmpty}>
            <div>
                <h6>Empty trash?</h6>
                <p>You&#39;re about to delete all items in your trash.<br />
                <b>Warning: this action cannot be undone</b></p>
            </div>
        </ModalButton>
    )
}

import { trashedVisualizationsSelector } from '../reducers'

function mapStateToProps(state, props) {

    const {
        loadState,
        navState
    } = state

    return {
        visualizations: trashedVisualizationsSelector(state, props),
        loadState: loadState,
        navState: navState
    }
}

export default connect(mapStateToProps, {
    loadVisualizations,
    deleteVisualization,
    updateVisualization,
    emptyVisualisationTrash,
})(Archive)
