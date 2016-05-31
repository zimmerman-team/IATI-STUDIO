
import _ from 'lodash'
import React, { PropTypes } from 'react'
import { InputNumber } from '../general/Input.react.jsx'

export const ChartRangeFilter = React.createClass({
    /*
     * Chart context by type
     * A range filter
    */

    propTypes: {
        type: PropTypes.string, // the types being contained here, array of min, max
        selected: PropTypes.array, // array of two selected types

        minRange: PropTypes.number.isRequired,
        maxRange: PropTypes.number.isRequired,
        value: PropTypes.array,

        onChange: PropTypes.func,
    },

    render: function() {
        let { contextFilters } = this.props
        
        let min = this.props.min || this.props.minRange
        let max = this.props.max || this.props.maxRange

        return (
            <ReactSliderInput
                className='horizontal-slider'
                pearling={true}
                value={[min, max]}
                onAfterChange={this.props.onChange}
                min={this.props.minRange}
                max={this.props.maxRange}
                withBars
            />
        )
    }
})

// TODO: instead, make this components compose - 2016-03-03
export const ReactSliderInput = React.createClass({
    /*
     * react-slider input with number inputs
    */

    propTypes: {
        min: PropTypes.number,
        max: PropTypes.number,
        labels: PropTypes.array, // for values
    },

    getInitialState: function() {
        return {
            values: this.props.value
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.values) {
            this.setState({
                values: nextProps.values
            })
        }
    },

    onInputChange: function(i, value) {
        // let value = parseInt(event.target.value)
        let values = this.state.values

        this.setState({
            values: [
                ...values.slice(0, i),
                value,
                ...values.slice(i+1)
            ]
        })
    },

    onInputBlur: function() {
        this.props.onAfterChange(this.state.values)
    },

    syncInputs: function(values) {
        this.setState({
            values: values
        })
    },

    renderInputs: function(values) {
        let n = values.length
        
        return _.map(values, (value, i) => {
            let minRange = i > 0 ? values[i-1] : this.props.min 
            let maxRange = i < n-1 ? values[i+1] : this.props.max

            return (
                <div className="selected-budget" key={i}>
                   <label>
                       {/*<span className="label">{i == 0 ? 'Min' : 'Max'}</span>*/}
                        <InputNumber 
                            id="max-budget"
                            min={minRange}
                            max={maxRange}
                            value={values[i]}
                            defaultValue={values[i]}
                            onBlur={this.onInputBlur}
                            onChange={this.onInputChange.bind(this, i)}
                        />
                       {/*<span className="fake-line"></span>*/}
                   </label>
                </div>
            )
        })
    },

    render: function() {

        let inputs = this.renderInputs(this.state.values)

        return (
            <div className="budget-slider">
                <ReactSlider 
                    {...this.props}
                    value={this.state.values}
                    onChange={this.syncInputs}/>
                {inputs}
            </div>
        )
    }
})
