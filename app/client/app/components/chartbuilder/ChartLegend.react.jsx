import _ from 'lodash'
import React, { PropTypes } from 'react'

import { CheckboxList } from '../general/List.react.jsx'
import { Tooltip } from '../general/Tooltip.react.jsx'

import { oipaKeyToName, transactionTypeKeyToName } from '../../name_mapping'

/*
 * Legend for selected items
*/

export const ChartLegend = props => {
    const { items, onRemove, onHide } = props
    const list = items.map(i => (
        <tr key={i._id}>
            <td className="visibility">
                <div className="switch">
                    <label>
                        <input type="checkbox" onChange={onHide.bind(null, i._id)} checked={!i.hidden}/>
                        <span className="lever"></span>
                    </label>
                </div>
            </td>
            <td className="action">
                <Tooltip tooltip="Delete item from chart">
                    <a onClick={onRemove.bind(null, i._id)} className="delete">
                        <i className="material-icons">add_circle</i>
                    </a>
                </Tooltip>
            </td>
            <td className="color-cell">
                <div className="color" style={{background: i.itemProps.color}}></div>
            </td>
            <td className="desc">
                <span className="aggregations">{transactionTypeKeyToName[i.aggregations]}</span> in <span className="type">{oipaKeyToName[i.type].toLowerCase()}</span> <span className="name">{i.name}</span>
            </td>
        </tr>
    ))

    return (
        <table>
            <tbody>
                { list }
            </tbody>
        </table>
    )
};

ChartLegend.propTypes = {
    items: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
}

export const PublicChartLegend = props => {
    const { items } = props

    const shownItems = items.filter( (i, index) => {
        return !i.hidden
    })

    const lis = shownItems.map( (i, index) => {
        return (
            <li key={i._id}>
                <div className="color" style={{background: i.itemProps.color, borderColor:i.itemProps.color}}></div>
                <span className="aggregations">{transactionTypeKeyToName[i.aggregations]}</span> in <span className="type">{oipaKeyToName[i.type].toLowerCase()}</span> <span className="name">{i.name}</span>
            </li>
        )
    })

    const new_list = _.chunk(lis, Math.ceil(lis.length/4))

    return (
        <div className="row">
            {new_list.map( (i,index) => (
                <div key={index} className="columns small-12 medium-6 large-4 xlarge-3 end">
                    <ul className="legend-list">
                        {i.map( j => ( j ))} 
                    </ul>
                </div>
                )
            )}
        </div>
    )
};

/*
 * Legend for selected filters
*/
export const ChartFilters = props => {
    const { context, onClick } = props

    const lis = context.map(i => (
        <tr key={i._id}>
            <td className="action">
                <Tooltip tooltip="Remove filter from chart">
                    <a onClick={onClick.bind(null, i._id)} className="delete">
                        <i className="material-icons">add_circle</i>
                    </a>
                </Tooltip>
            </td>
            <td className="desc">
                <span className="type">{oipaKeyToName[i.type]} </span>
                <span className="name">{
                    _.includes(['transaction_date_lte', 'transaction_date_gte'], i.type) ? i.value : i.name
                }</span>
            </td>
        </tr>
    ))
    return (
        <table>
            <tbody>
                { lis }
            </tbody>
        </table>
    )
};

export const PublicChartFilters = props => {
    const { context } = props

    var grouped = _.groupBy(context, function(a){return a.type})

    var list_array = []
    for(var object in grouped) {
        var title
        if (object == 'recipient_country') { grouped[object].length > 1 ? title = 'In recipient countries' : title = 'In recipient country' }
        else if (object == 'recipient_region') { grouped[object].length > 1 ? title = 'In recipient regions' : title = 'In recipient region'}
        else if (object == 'sector') { grouped[object].length > 1 ? title = 'In sectors' : title = 'In sector'}
        else if (object == 'reporting_organisation') { grouped[object].length > 1 ? title = 'In reporting organisations' : title = 'In reporting organisation'}
        else if (object == 'document_link_category') { grouped[object].length > 1 ? title = 'With document link categories' : title = 'With document link category'}
        else if (object == 'activity_status') { grouped[object].length > 1 ? title = 'With activity statuses' : title = 'With activity status'}
        else if (object == 'collaboration_type') { grouped[object].length > 1 ? title = 'Of collaboration types' : title = 'Of collaboration type'}
        else if (object == 'default_flow_type') { grouped[object].length > 1 ? title = 'With default flow types' : title = 'With default flow type'}
        else if (object == 'default_aid_type') { grouped[object].length > 1 ? title = 'With default aid types' : title = 'With default aid type'}
        else if (object == 'default_finance_type') { grouped[object].length > 1 ? title = 'With default finance types' : title = 'With default finance type'}
        else if (object == 'default_tied_status') { grouped[object].length > 1 ? title = 'With default tied statuses' : title = 'With default tied status'}
        else if (object == 'policy_marker') { grouped[object].length > 1 ? title = 'With policy markers' : title = 'With policy marker'}
        else if (object == 'transaction_date_lte') { grouped[object].length > 1 ? title = 'Minimum transaction date' : title = 'Minimum transaction date'}
        else if (object == 'transaction_date_gte') { grouped[object].length > 1 ? title = 'Maximum transaction date' : title = 'Maximum transaction date'}
        else { title = '' }

        var list = grouped[object].map( (i, index) => {
                if (i.type == 'transaction_date_gte' || i.type == 'transaction_date_lte') {
                    return (
                        i.value
                    )
                }
                else {
                    return (
                        i.name
                    )
                }
            }
        )
        list_array.push({
            title: title,
            key: object,
            values: list,
        })
    }

    return (
        <div className="filters">
            {!_.isEmpty(list_array) ? 
                list_array.map( i => {
                    return (
                        <span key={i.key}>{i.title} {i.values.map( (j, index) => ( <span key={index}><b>{j}</b>{index == i.values.length - 1 ? '... ' : ', '}</span> ) )}</span>
                    )
                }
            )

            : null}
        </div>
    )
};
