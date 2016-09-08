'use strict'

import React from 'react'

export function Button(props) {
  return (
      <a href="#" className="button no-margin">{ props.text }</a>
  )
}

export function PageTitle (props) {
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

export function PageTitleButtonsGroup1 (props) {
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
