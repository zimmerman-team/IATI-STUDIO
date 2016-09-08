'use strict'

import React from 'react'
import { PageTitle, Button, PageTitleButtonsGroup1 }       from './OrgComponentsList'
import SelectReactComponentsList       from './SelectReactComponentsList'

let OrgWrapper = function(props) {
  return (
    <div id="orgWrapper">
      <div className="rowPub">
        <PageTitleButtonsGroup1 pageTitleContent="Organisation settings" />
        <Select />
      </div>
    </div>
  )
}

export default OrgWrapper
