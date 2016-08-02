import React, { PropTypes } from 'react'
import _ from 'lodash'

export const ValidationErrors = (props) => {
  const errors = props.errors

  if (!errors || _.isEmpty(errors)) {
    return <noscipt />
  }

  // const fields = Object.keys(errors)

  // if (!fields.length) {
  //   return <noscript />
  // }

  // const errorList = fields.map(field => (
  //   <li>Invalid field {field}: {errors[field]}</li>
  // ))

  // else if (!_.isEmpty(errors)) {
  //   const fields = Object.keys(errors)
  //   const errorList = fields.map(field => (
  //     <div>{errors[field]}</div>
  //   ))
  //   return (
  //     <div className="error">
  //         { errorList }
  //     </div>
  //   )
  // }

  else {
    return (
      <div className="error">
          { errors }
      </div>
    )
  }
}

export const RenderErrors = (props) => {
  const errors = props.errors

  if (!errors || !errors.length) {
    return <noscript />
  }

  let errorList = errors.map(error => (
    <li>{error}</li>
  ))

  return (
    <div className="error">
      <ul>
        {errorList}
      </ul>
    </div>
  )
}
