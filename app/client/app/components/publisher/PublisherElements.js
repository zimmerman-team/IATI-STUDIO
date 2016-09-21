import _ from 'lodash'
import React from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import store from '../../app'
import { SearchableCheckboxList, CheckboxList, Checkbox, Orderable, SubmitButton } from '../general/List.react.jsx'
import { FoundationAccordion, FoundationAccordionItem, FoundationButtonList, FoundationButtonListItem } from '../foundation/List.react.jsx'
import { ModalContainer, ModalButton, Portal } from '../general/Modal.react.jsx'
import { oipaKeyToName, oipaKeyToDesc } from '../../name_mapping'

// TODO: Call actions in parent view - 2016-01-29
const PublisherElements = React.createClass({

    propTypes: {
        items: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired,
        onItemChange: PropTypes.func.isRequired,
    },

    onSuccess: function(i) {
        // TODO: Call Set Item(s) action here - 2016-01-28
    },

    onToggle: function(item, aggregation, checked, type) {
        this.props.onItemChange(item, aggregation, checked, type)
    },

    render: function() {
        const { items } = this.props

        const contextFilters = _.map(this.props.filters, (filters, key) => {
            // TODO: How to implement onCancel? - 2016-01-28

            const selectedForType = _.filter(items, (item) => item.type == key)

            // TODO: This should happen outside of render - 2016-03-16
            // filters = _.filter(filters, (obj) => {
            //     return obj.name.toLowerCase().indexOf(searchState.toLowerCase()) != -1
            // });

            return (
                <PublisherElementsType
                    key={key}
                    type={key}
                    contextFilters={filters}
                    selected={selectedForType}
                    onToggle={this.onToggle}
                    />
            )
        })

        return (
            <FoundationButtonList>
                {contextFilters}
            </FoundationButtonList>
        )
    }
})


function mapStateToProps(state, props) {
    const { } = state

    return {}
}

export default connect(mapStateToProps)(PublisherElements)


// all possible aggregations
// const AGGREGATIONS = ['disbursement', 'commitment', 'expenditure']
const AGGREGATIONS = [
    {
        id: 'disbursement',
        name: 'Disbursement',
        desc: 'Disbursement is the amount of money transferred to another organisation in the aid delivery chain (e.g. a partner organisation being funded).'
    },
    {
        id: 'commitment',
        name: 'Commitment',
        desc: 'Commitment is the total agreed budget.'
    },
    {
        id: 'expenditure',
        name: 'Expenditure',
        desc: 'Expenditure is the outlay on goods and services and project overheads.'
    },
    {
        id: 'incoming_fund',
        name: 'Incoming Funds',
        desc: 'Incoming funds are the funds received from a funding source (e.g. a donor).'
    }
]

let PublisherElementsType = React.createClass({
    /*
     * Publisher contextFilters by type
    */

    propTypes: {
        type: PropTypes.string, // the type being contained here
        contextFilters: PropTypes.array.isRequired, // by type
        items: PropTypes.array, // selected items/elements

        onToggle: PropTypes.func, // selecting checkbox
        onSubmit: PropTypes.func,
    },

    getInitialState: function() {
        return {
            searchTerm: ''
        }
    },

    onToggle: function(item, aggregation_index, event) {
        let checked = event.target.checked;
        let aggregation = AGGREGATIONS[aggregation_index].id

        this.props.onToggle(item, aggregation, checked, this.props.type)
    },

    onSearch: function(searchTerm){
        this.setState({searchTerm: searchTerm})
    },

    render: function() {
        const filters = this.props.contextFilters
        const items = this.props.selected
        const type = this.props.type

        // TODO: This should be done outside of render, in connect - 2016-03-15
        const orderedFilters = _.orderBy(filters, [this.props.orderBy], [this.props.reverse ? 'desc' : 'asc']);

        const list = _.map(orderedFilters, (filter, i) => {

            // filter by searchInput value
            if (filter.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) == -1)
                return false

            // list of selected items
            const selected = _.chain(items)
                .filter({ type: type, id: filter.id })
                .map(item => Object.assign({}, item, { checked: true, _id: item._id }))
                .value()

            let accordionClasses = classNames({
                "has-count": !!filter.filtered
            })

            return (
                <FoundationAccordionItem
                    title={filter.name}
                    key={filter.id}
                    liClass={accordionClasses}>

                    <PublisherElementsAggregation
                        filter={filter}
                        selected={selected}
                        onChange={this.onToggle.bind(this, filter)}
                        title={filter.id}
                    />
                </FoundationAccordionItem>
            )
        })

        return (
            <FoundationButtonListItem
                title={oipaKeyToName[type]}
                active={false}
                from="items"
                length={<span className="length">{orderedFilters.length}</span>}
                tooltip={oipaKeyToDesc[type]}
                {...this.props}>

                    {this.props.type == 'reporting_organisation' ?
                        <ModalButton name="Your organisation not listed?" className="not-here" closeButton="Close">
                            <div className="modal-inside">
                                <h6>Your organisation not listed?</h6>
                                <p>If your organisation reports data to the IATI registry and is not listed here, there may be no transactions in your data or we may have trouble parsing your transactions. Please contact us with with your organisation identifier for more information on <a href="mailto:enquiry@iatistudio.com">enquiry@iatistudio.com</a>.</p>
                            </div>
                        </ModalButton>
                     : null}

                <FoundationAccordion onSearch={this.onSearch}>
                    <Orderable
                        className="order-by"
                        orderables={["name"]}
                        active={"name"}
                        active={this.props.orderBy}
                        reverse={this.props.reverse}
                    />

                    { !_.isEmpty(list) ? list : <p>No data found</p> }
                </FoundationAccordion>

            </FoundationButtonListItem>
        )
    }
})
// TODO: Should this connect here? - 2016-03-15
PublisherElementsType = connect(function(state, props) {
    let { orderBy, reverse } = state.activeVisualization
    let { loadState } = state

    return {
        orderBy,
        reverse,
        loadState,
        ...props
    }
})(PublisherElementsType)


const PublisherElementsAggregation = React.createClass({

    propTypes: {
        filter: PropTypes.object.isRequired,
        selected: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func,
    },

    render: function() {
        const { filter, selected } = this.props

        const checkboxes = _.map(AGGREGATIONS, (aggregation, i) => (
            <Checkbox
                id={filter.id + i}
                key={filter.id + i}
                onChange={this.props.onChange.bind(this, i)} // selected checkbox
                checked={ _.find(selected, item => item.aggregations === aggregation.id) ? true : false }
                name={aggregation.name}
                tooltip={aggregation.desc}
            />
        ))

        return (
            <CheckboxList>
                { checkboxes }
            </CheckboxList>
        )
    }
})

export const ValidationButton = (props) => {
   return  (
        <div>
            <SubmitButton
                value={ this.state.validationKey == "VALIDATED" }
                id=""
                onChange={props.onChange}
                checked={props.value == '' ? true : false }
                name="chartType"
                labelName="All chart types"
                className="with-gap"
            />
        </div>
    )
}

export function PageTitle (props) {
  return (
    <div className='row'>

        <div className='columns small-12 medium-6'>
          <h2 className="title-page">{props.pageTitleContent}</h2>
        </div>

        <div className='columns small-12 medium-6'>
          <ButtonGroup />
        </div>

        <div className='columns small-12'>
        <hr className="margin1rem" />
        </div>

      </div>
  )
}

export function Button(props) {
  return (
      <a href="#" className="button no-margin">{ props.text }</a>
  )
}

export function ButtonGroup(props) {
  return (
    <div className='a-destra'>
      <Button text="Save draft"/>
      <Button text="Validation state: incomplete" />
      <Button text="Publish"/>
    </div>
  )
}

export function PageTitle(props) {
  return (
    <div className='row'>
      <div className='columns small-12 medium-6'>
        <h2 className="title-page">{props.pageTitleContent}</h2>
      </div>
      <div className='columns small-12'>
        <hr />
      </div>
    </div>
  )
}

export function PageTitleButtonsGroup1(props) {
  return (
    <div className='row'>
      <div className='columns small-12 medium-6'>
        <h2 className="title-page">{props.pageTitleContent}</h2>
      </div>
      <div className='columns small-12 medium-6'>
        <div className="a-destra">
          <Button text="Save draft"/>
          <Button text="Validation state: incomplete" />
          <Button text="Publish"/>
        </div>
      </div>
      <div className='columns small-12'>
        <hr />
      </div>
    </div>
  )
}

export function OrgIdentifier(props) {
  return (
    <div>
      <div>
        <h6>Organisation identifier</h6>
        <a href='#'><i className="material-icons iH6">info</i></a>
      </div>
      <div className="input-group">
        <input className="input-group-field" type="text" placeholder="Null" />
      </div>
    </div>
  )
}

export function OrgName(props) {
  return (
    <div>
      <div>
        <h6>Text <span className="colorRed">*</span></h6>
      </div>
      <div className="input-group">
        <input className="input-group-field" type="text" placeholder="Null" />
      </div>
    </div>
  )
}

export const PublisherInput = (props) => {
  return (
    <div className="input-group">
      <input type='text' id={props.id} {...props} />
    </div>
  )
}

export const PublisherCheckbox = (props) => {
  return (
    <div className="input-group">
      <input  id={props.id} {...props} />
    </div>
  )
}

export const PublisherMenuList = (props) => {
  return (
    <div className="menuTendinaOuter">
      <div className="menuTendinaInner">
        <ul className="menuTendina">
          <li>
            <a href="#">Registry settings</a><i className="material-icons iMenuList">keyboard_arrow_up</i>
            <ul className="menuTendinaNested">
              <li><a href="#">API key</a></li>
              <li><a href="#">Publishing options</a></li>
              <li><a href="#">Datasets</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Activity defaults</a><i className="material-icons iMenuList">keyboard_arrow_down</i>
          </li>
        </ul>
      </div>
    </div>
  )
}
