
import _ from 'lodash'
import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import ReactSlider from 'react-slider'

import store from '../../app'

import { oipaKeyToName } from '../../name_mapping'

import { SearchableCheckboxList, Checkbox, Orderable} from '../general/List.react.jsx'

import { FoundationButtonList, FoundationButtonListItem } from '../foundation/List.react.jsx'
import { ModalContainer, ModalButton } from '../general/Modal.react.jsx'
import classNames from 'classnames'

import { ChartRangeFilter } from './ChartSlider'


import moment from 'moment'
import DatePicker from 'react-datepicker'
import replaceContext from '../../actions/async'
import { withRouter } from 'react-router'

class ChartDateFilter extends React.Component {
    constructor(props) {
        super(props)

        this.handleMinChange = this.handleMinChange.bind(this)
        this.handleMaxChange = this.handleMaxChange.bind(this)
    }

    handleMinChange(date) {
        if (!date) {
            if (!this.props.minId) return;

            return this.props.removeContext(this.props.minId)
        }

        this.props.replaceContext(
            'transaction_date_gte',
            date.format("YYYY-MM-DD"),
            "Minimum transaction date",
        )
    }

    handleMaxChange(date) {
        if (!date) {
            if (!this.props.maxId) return;

            return this.props.removeContext(this.props.maxId)
        }

        this.props.replaceContext(
            'transaction_date_lte',
            date.format("YYYY-MM-DD"),
            "Maximum transaction date",
        )
    }

    render() {
        const { minDate, maxDate } = this.props

        return (
            <div className="datepickers">
                <label className="label">Min. date</label>
                <DatePicker
                    dateFormat="YYYY-MM-DD"
                    selected={minDate}
                    startDate={minDate}
                    endDate={maxDate}
                    isClearable={true}
                    placeholderText="Minimum transaction date"
                    onChange={this.handleMinChange}
                />
                <label className="label">Max. date</label>
                <DatePicker
                    dateFormat="YYYY-MM-DD"
                    selected={maxDate}
                    startDate={minDate}
                    endDate={maxDate}
                    isClearable={true}
                    placeholderText="Maximum transaction date"
                    onChange={this.handleMaxChange}
                />
            </div>
        )
    }
}
ChartDateFilter.propTypes = {
    minId: React.PropTypes.string,
    maxId: React.PropTypes.string,
    removeContext: React.PropTypes.func.isRequired,
    replaceContext: React.PropTypes.func.isRequired,
    minDate: React.PropTypes.object, // momentjs
    maxDate: React.PropTypes.object, // momentjs
}

const ChartContext = React.createClass({
    /*
     * Chart context
     */

    // TODO: Let parent handle dispatches? - 2016-01-29
    propTypes: {
        context: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired,
        onContextChange: PropTypes.func,
    },

    onSuccess: function(selected) {
        // TODO: Call Set context(s) action here - 2016-01-28 
    },

    // remove by id when removing
    onToggle: function(filter, checked, type) {
        this.props.onContextChange(filter, checked, type);
    },

    render: function() {
        const { context, filters, loadState } = this.props

        const chartListFilters = _.map(this.props.filters, (filters, key) => {

            const selectedForThisType = _.filter(context, (item) => item.type == key)

            return (
                <FoundationButtonListItem
                    loadState={loadState}
                    title={oipaKeyToName[key]}
                    length={<span className="length">{filters.length}</span>}
                    key={key}>
                    <ChartListFilter 
                        key={key} 
                        type={key} 
                        contextFilters={filters}
                        selected={selectedForThisType}
                        onChange={this.onToggle}
                        title={'id'+key}
                        />
                </FoundationButtonListItem>
            )
        });

        const minDateObj = _.find(context, item => item.type === 'transaction_date_gte')
        const maxDateObj = _.find(context, item => item.type === 'transaction_date_lte')

        let minDate = moment(minDateObj && minDateObj.value) || moment()
        let maxDate = moment(maxDateObj && maxDateObj.value) || moment()

        return (
            <FoundationButtonList>
                {chartListFilters}

                <FoundationButtonListItem
                    loadState={loadState}
                    title={"Transaction Date"}
                    key={'transaction_date'}>
                    <ChartDateFilter 
                        removeContext={this.props.removeContext}
                        replaceContext={this.props.replaceContext}
                        minId={minDateObj ? minDateObj._id : null}
                        maxId={maxDateObj ? maxDateObj._id : null}
                        minDate={minDate}
                        maxDate={maxDate}
                        />
                </FoundationButtonListItem>
            </FoundationButtonList>
        )
    }
})

function mapStateToProps(state, props) {
    const { loadState } = state

    return {
        loadState: loadState,
    }
}

export default connect(mapStateToProps)(ChartContext)


let ChartListFilter = React.createClass({
    /*
     * Chart context by type
     * A filterable list of checkboxes
    */

    propTypes: {
        type: PropTypes.string, // the type being contained here
        contextFilters: PropTypes.array.isRequired, // by type
        selected: PropTypes.array,
        onChange: PropTypes.func, // selecting checkbox
        onSubmit: PropTypes.func,
    },

    getInitialState: function() {
        return {
            searchTerm: ''
        }
    },

    onChange: function(filter, event) {
        let checked = event.target.checked;
        this.props.onChange(filter, checked, this.props.type)
    },

    onSearch: function(searchValue){
        this.setState({searchTerm: searchValue})
    },

    render: function() {
        const { contextFilters, selected, type } = this.props

        // TODO: This should be done outside of render, in connect - 2016-03-15
        let orderedContextFilters = _.orderBy(contextFilters, [this.props.orderBy], [this.props.reverse ? 'desc' : 'asc']);

        let checkboxes = _.map(orderedContextFilters, (filter, i) => {

            // filter by searchInput value 
            if (filter.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1)
                return false

            const selectedItem = _.find(selected, {value: filter.id})

            const checked = selectedItem ? true : false

            if (selectedItem)
                filter._id = selectedItem._id

            return (
                <Checkbox 
                    id={filter.id + i}
                    key={filter.id + i} 
                    onChange={this.onChange.bind(this, filter)} // selected checkbox
                    checked={checked}
                    name={filter.name}
                    length={<span className="length">{filter.count}</span>}
                />
            )
        })

        return (
            <SearchableCheckboxList onSearch={this.onSearch}>
                <Orderable className="order-by" orderables={["name"]} active={"name"} active={this.props.orderBy} reverse={this.props.reverse}/>
                { !_.isEmpty(checkboxes) ? checkboxes : <p>No data found</p> }
            </SearchableCheckboxList>
        )
    }
})

// TODO: Should this connect here? - 2016-03-15
ChartListFilter = connect(function(state, props) {
    let { orderBy, reverse } = state.activeVisualization

    return {
        orderBy,
        reverse,
        ...props
    }
})(ChartListFilter)
