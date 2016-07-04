"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'

import { connect } from 'react-redux'
import store from '../app'

import classNames from 'classnames'

import sadChart from '../../img/sad-chart.svg'

export const ErrorPage = React.createClass({
	render: function() {
		return (
			<div className="row">
                <div className="columns small-12 medium-10 large-8 small-centered error-page">
                    <img src={sadChart} />
                    <h4>Something went wrong</h4>
                    <p>We cannot find the page you are looking for</p>
                </div>
            </div>
		)
	}
})