import React, { PropTypes } from 'react'

export const ValidationErrors = (props) => {
  const errors = props.errors

  if (!errors) {
    return <noscipt />
  }

  // const fields = Object.keys(errors)

  // if (!fields.length) {
  //   return <noscript />
  // }

  // const errorList = fields.map(field => (
  //   <li>Invalid field {field}: {errors[field]}</li>
  // ))

  return (
    <div className="error">
        { errors }
    </div>
  )
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
