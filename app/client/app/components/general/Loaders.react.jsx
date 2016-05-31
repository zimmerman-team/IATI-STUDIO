import React, { PropTypes } from 'react'
import loader from '../../../img/loader.svg'

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


