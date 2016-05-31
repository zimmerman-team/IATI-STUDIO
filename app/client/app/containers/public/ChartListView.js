
import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {ChartViewList} from '../../components/public/ChartViewEmbed'

import { browserHistory } from 'react-router'
import querystring from 'querystring' 

import { withRouter } from 'react-router'

import { 
    YetAnotherLoader
} from '../../components/general/Loaders.react.jsx'

import { 
    fetchVisualizationsPublic,
    updateVisualization,
    forkVisualization,
    createVisualization,
} from '../../actions/async'

import { toggleMainMenu } from '../../actions/sync'

import { visualizationItemSelector, visualizationContextSelector, } from '../../reducers'

import { isLoggedIn, isAdmin, publicVisualizationsSelector } from '../../reducers'

import { InputText } from '../../components/general/Input.react.jsx'

import { Radiobutton } from '../../components/general/List.react.jsx'

import DocumentTitle from "react-document-title"

const ChartViewGetter = connect((state, props) => {
    return {
        ...props,
        items: visualizationItemSelector(state, props),
        context: visualizationContextSelector(state, props),
    }
})(ChartViewList)

export const ChartTypeSelector = props => {
   return  (
        <div>
            <Radiobutton
                value=""
                id="all"
                onChange={props.onChange}
                checked={props.value == '' ? true : false }
                name="chartType"
                labelName="All chart types"
                className="with-gap"
            />
            <Radiobutton
                value="bar-chart"
                id="bar-chart"
                onChange={props.onChange}
                checked={props.value == 'bar-chart' ? true : false }
                name="chartType"
                labelName="Bar chart"
                className="with-gap"
            />
            <Radiobutton
                value="stacked-bar-chart"
                id="stacked-bar-chart"
                onChange={props.onChange}
                checked={props.value == 'stacked-bar-chart' ? true : false }
                name="chartType"
                labelName="Stacked bar chart"
                className="with-gap"
            />
            <Radiobutton
                id="line-chart"
                value="line-chart"
                onChange={props.onChange}
                checked={props.value == 'line-chart' ? true : false }
                name="chartType"
                labelName="Line chart"
                className="with-gap"
            />
            <Radiobutton
                id="bubble-chart"
                value="bubble-chart"
                onChange={props.onChange}
                checked={props.value == 'bubble-chart' ? true : false }
                name="chartType"
                labelName="Bubble chart"
                className="with-gap"
            />
            {/* <Radiobutton
                id="radar-chart"
                value="radar-chart"
                onChange={props.onChange}
                checked={props.value == 'radar-chart' ? true : false }
                name="chartType"
                labelName="Radar chart"
                className="with-gap"
            /> */}
            <Radiobutton
                id="tree-map"
                value="tree-map"
                onChange={props.onChange}
                checked={props.value == 'tree-map' ? true : false }
                name="chartType"
                labelName="Tree map"
                className="with-gap"
            />
            <Radiobutton
                id="pie-chart"
                value="pie-chart"
                onChange={props.onChange}
                checked={props.value == 'pie-chart' ? true : false }
                name="chartType"
                labelName="Pie chart"
                className="with-gap"
            />
        </div>
    )
}
ChartTypeSelector.propTypes = {
    value: PropTypes.string.isRequired,
}

class ChartOrderBySelector extends React.Component {
    constructor(props) {
        super(props)

        this.onOrderClick = this.onOrderClick.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.isReversed = this.isReversed.bind(this)
    }

    isSelected(option) {
      return this.props.orderBy.indexOf(option) >= 0
    }

    isReversed() {
       return this.props.orderBy.charAt(0) === '-'
    }

    onOrderClick(value, e) {
        // to query param
        e.preventDefault()

        if (this.isSelected(value)) { 
            return this.props.onChange((this.isReversed() ? '' : '-') + value)
        }
        else {
            return this.props.onChange('-' + value)
        }
    }

    render() {
        const { options, orderBy } = this.props

        const orderByButtons = options.map( (option, index, array) => (
            <span key={index}>
                <button 
                    className={classNames({
                        active: this.isSelected(option.value),
                        reverse: this.isReversed()
                    })}
                    onClick={this.onOrderClick.bind(this, option.value)}>
                    {option.name}
                </button>
                { index === array.length-1 ? null : <span className="separator">|</span> }
            </span>
        ))

        return (
            <div className="order-by">
                <span className="label">Sort by</span>
                { orderByButtons }
            </div>
            
        )
    }
}
ChartOrderBySelector.propTypes = {
   options: PropTypes.arrayOf(PropTypes.shape({
       name: PropTypes.string,
       value: PropTypes.string,
   })).isRequired, // the available order by's
   orderBy: PropTypes.string.isRequired, // the query param
}

class ChartListSideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.props.filters

        this.onSubmit = this.onSubmit.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.fetchNewVisualizations(this.state)
    }

    onSearchChange(e) {
        this.setState({
            'search': e.target.value,
        })
    }

    onTypeChange(e) {
        this.setState({
            'type': e.target.value,
        })
    }

    render() {
        const { 
            search,
            type,
        } = this.state

        return (
            <div className="list-sidebar">
                <form onSubmit={this.onSubmit}>
                    <InputText 
                        placeholder="Search IATI Studio..."
                        value={search}
                        onChange={this.onSearchChange }
                    />
                    <ChartTypeSelector 
                        value={type} 
                        onChange={this.onTypeChange }
                    />

                    <a 
                        className="button"
                        onClick={this.onSubmit}
                    >Apply filters</a>
                </form>
            </div>
            
        )
    }
}
ChartListSideBar.propTypes = {
    filters: PropTypes.object.isRequired,
    fetchNewVisualizations: PropTypes.func.isRequired,
}

const ChartOrder = (props) => {
    return (
        <ChartOrderBySelector 
            orderBy={props.orderBy} 
            options={[
                { name: 'name', value: 'name' },
                { name: 'created', value: 'created' },
                { name: 'modified', value: 'last_updated' },
            ]}
            onChange={(value) => props.fetchNewVisualizations({ orderBy: value })}
        />
    )
}
ChartOrder.propTypes = {
    orderBy: PropTypes.string.isRequired,
    fetchNewVisualizations: PropTypes.func.isRequired,
}

import classNames from 'classnames'

class ChartListPageSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { pageCount, changePage, lastPage } = this.props

        const previousClass = classNames({
            'pagination-previous': true,
            'disabled': pageCount === 1,
        })

        const nextClass = classNames({
            'pagination-next': true,
            'disabled': pageCount === lastPage,
        })

        const minPage = _.max([pageCount - 6, 1])
        const maxPage = _.min([pageCount + 6, lastPage])

        const prevPage = pageCount - 1;
        const nextPage = pageCount + 1;
        
        const pages = _.map(_.range(minPage, maxPage + 1), num => {

            const pageClass = classNames({
                'current': num === pageCount,
            })

            if (num === pageCount) {
                return (
                    <li>
                        <span 
                            className={pageClass} 
                            show-for-sr="You're on page"
                        > {num}</span>
                    </li>
                )
            }
            else {
                return (
                    <li>
                        <a 
                            onClick={() => changePage(num)}
                            className={pageClass} 
                            href="#" 
                            aria-label={`Page ${num}`}
                        >{num}</a>
                    </li>
                )
            }
        })


        return (
            <ul className="pagination" role="navigation" aria-label="Pagination">
                <li className={previousClass}><a onClick={() => changePage(prevPage)} href="#" aria-label="Previous page">Previous <span className="show-for-sr">page</span></a></li>
                { pages }
                <li className={nextClass}><a onClick={() => changePage(nextPage)} href="#" aria-label="Next page">Next <span className="show-for-sr">page</span></a></li>
            </ul>           
        )
    }
}
ChartListPageSelector.propTypes = {
    pageCount: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
}


function loadData(props) {
    // TODO: how do we handle pagination? - 2016-05-19
    props.fetchVisualizationsPublic(props.pageCount, props.filters)
}

const default_viz = {
    name: "",
    description: "",
}

class ChartListView extends React.Component {
    constructor(props) {
        super(props)

        this.fetchNewVisualizations = this.fetchNewVisualizations.bind(this)
        this.changePage = this.changePage.bind(this)
        this.newChart = this.newChart.bind(this)
    }

    componentWillMount() {
        loadData(this.props)
        this.props.toggleMainMenu(false)
    }

    componentDidUpdate(prevProps) {
        const { filters, pageCount } = this.props

        if ((filters !== prevProps.filters) || (pageCount !== prevProps.pageCount)) {
            const params = Object.assign({}, filters, { pageCount })

            this.props.location.query = params
            this.props.router.replace(this.props.location)
        }
    }

    fetchNewVisualizations(filters) {
        this.props.fetchVisualizationsPublic(1, Object.assign(
           {},
           this.props.filters,
           filters,
        ))
    }

    changePage(page) {
        this.props.fetchVisualizationsPublic(page, this.props.filters)
    }

    newChart() {
        this.props.createVisualization(default_viz)
            .then(action => action.response.result)
            .then(viz_id => this.props.router.push(`/chartbuilder/${viz_id}`))
    }

    render() {
        const { visualizations, count, filters, pageCount } = this.props

        const visibleVisualizations = _.map(visualizations, viz => (
            <ChartViewGetter 
                isAdmin={this.props.isAdmin}
                key={viz._id}
                id={viz._id}
                visualization={viz}
            />
        ))

        return (
            <DocumentTitle title='IATI Studio | Community Feed'>
                <div className="row">
                    <div className="columns small-12">
                        <div className="list-head controls">
                            <h2 className="page-title">Community Feed</h2>
                            <div className="switch charts"><label><span className="label"><span className="badge">{ count }</span><span className="type">Results</span></span></label></div>
                            {this.props.isLoggedIn ?
                                <a onClick={this.newChart} className="button alert"><i className="material-icons">create</i>Add chart</a>
                            :   <a href="/auth/signup" className="button alert"><i className="material-icons">create</i>Add chart</a> }
                            <ChartOrder 
                                fetchNewVisualizations={this.fetchNewVisualizations}
                                orderBy={filters.orderBy} />
                        </div>
                    </div>
                    <div className="medium-6 large-4 xlarge-3 columns">
                        <ChartListSideBar
                            fetchNewVisualizations={this.fetchNewVisualizations}
                            filters={ _.omit(this.props.filters, 'orderBy') }
                        />
                    </div>

                    { this.props.isFetching ? <YetAnotherLoader />
                      :
                       <div>
                          <div className="medium-6 large-8 xlarge-9 columns">
                              <div className="row">
                                  { count ? visibleVisualizations : "Nothing found. Try some different terms." }
                              </div>
                          </div>
                          {count > 6 ? 
                          <div className="columns small-12 text-center">
                              <ChartListPageSelector 
                                  pageCount={this.props.pageCount}
                                  lastPage={this.props.lastPage}
                                  changePage={this.changePage}
                              />
                          </div>
                          : null }
                       </div>
                    }
                </div>
            </DocumentTitle>
        )
    }
}
ChartListView.propTypes = {
    visualizations: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    pageCount: PropTypes.number.isRequired,
    count: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
}

function mapStateToProps(state, props) {
    const {
        loadState,
        pagination: {
            publicVisualizationPagination: {
                isFetching,
                filters,
                pageCount,
                count,
                pageSize,
                lastPage,
            },
        }
    } = state

    return {
        visualizations: publicVisualizationsSelector(state, props),
        loadState,
        isFetching,
        count,
        pageCount,
        pageSize,
        lastPage,
        filters,
        isLoggedIn: isLoggedIn(state),
        isAdmin: isAdmin(state)
    }
}



export default connect(mapStateToProps, {
    fetchVisualizationsPublic,
    forkVisualization,
    toggleMainMenu,
    createVisualization,
})(withRouter(ChartListView))
