'use strict'

import React from 'react'
import { PageTitle, Button, PageTitleButtonsGroup1 }       from './OrgComponentsList'
import MultiSelectField       from '../react-select/MultiSelect'

let OrgWrapper = function(props) {
  return (
    <div id="orgWrapper">
      <div className="rowPub">
        <PageTitleButtonsGroup1 pageTitleContent="Organisation settings" />
        <MultiSelectField />
      </div>
    </div>
  )
}

export default OrgWrapper
