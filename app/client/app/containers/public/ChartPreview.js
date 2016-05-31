import React, { PropTypes } from 'react'
import ChartView from './ChartView'

export const ChartPreview = (props) => (
    <ChartView isPreview={true} {...props} />
)

export default ChartPreview
