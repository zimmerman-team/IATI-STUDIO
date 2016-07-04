import React, { PropTypes } from 'react'
import loader from '../../../img/loader.svg'
import sadChart from '../../../img/sad-chart.svg'

var loader_url = require


// TODO: this sucks, make this better - 2016-05-19

/*
 * hasLoaded is a method returning true/false
*/
export const LoaderWrapper = function(hasLoaded, Component, LoaderComponent, onLoad) {
    return props => {
		if (hasLoaded(props)) {
		    return <Component {...props} />
		}
		else if (props.errorMessage) {
			return (
				<div className="row">
	                <div className="columns small-12 medium-10 large-8 small-centered error-page">
	                	<img src={sadChart} />
	                    <h4>Something went wrong</h4>
	                    <p>This is the error code we got:</p>
	                    <p>{props.errorMessage}</p>
	                </div>
	            </div>
			)
		}
		else {
		    if (onLoad) onLoad(props)

		    return <LoaderComponent />
		}
    }
}

export const YetAnotherLoader = props => (
    <div id="loader">Loading...</div>
)

export const GeneralLoader = props => (
	<div id="general-loader">
		<img src={loader} /> Loading... 
	</div>
)

export const ChartLoader = props => (
	<div className={'chart-loader ' + props.className}>
        <div className="content">
            <img src={loader} /> Updating... 
        </div>
    </div>
)


