
import _ from 'lodash'
import React, { PropTypes } from 'react'
import { InputNumber } from '../general/Input.react.jsx'

export class ChartRangeFilter extends React.Component {
    /*
     * Chart context by type
     * A range filter
    */

    static propTypes = {
        type: PropTypes.string, // the types being contained here, array of min, max
        selected: PropTypes.array, // array of two selected types

        minRange: PropTypes.number.isRequired,
        maxRange: PropTypes.number.isRequired,
        value: PropTypes.array,

        onChange: PropTypes.func,
    };

    render() {
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
}

// TODO: instead, make this components compose - 2016-03-03
export class ReactSliderInput extends React.Component {
    /*
     * react-slider input with number inputs
    */

    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        labels: PropTypes.array, // for values
    };

    state = {
        values: this.props.value
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.values) {
            this.setState({
                values: nextProps.values
            })
        }
    }

    onInputChange = (i, value) => {
        // let value = parseInt(event.target.value)
        let values = this.state.values

        this.setState({
            values: [
                ...values.slice(0, i),
                value,
                ...values.slice(i+1)
            ]
        })
    };

    onInputBlur = () => {
        this.props.onAfterChange(this.state.values)
    };

    syncInputs = (values) => {
        this.setState({
            values: values
        })
    };

    renderInputs = (values) => {
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
    };

    render() {

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
}
