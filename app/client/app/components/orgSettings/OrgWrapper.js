'use strict'

import React from 'react'
import { PageTitle, Button, PageTitleButtonsGroup1, OrgIdentifier, OrgName, TestButtons }       from './OrgComponentsList'
import PublisherMenuList      from '../publisher/PublisherMenuList'
import MultiSelectField       from '../lib/react-select/MultiSelect'
import MultiSelectLang        from '../lib/react-select/MultiSelectLang'

let OrgWrapper = function(props) {
  return (
    <div id="orgWrapper">
      <div className="rowPub">
        <PageTitleButtonsGroup1 pageTitleContent="Organisation settings" />

        <div className="row">

          <div className="columns small-12 medium-4">
            <div>
              <div><h6>Reporting organisation</h6><a href='#'><i className="material-icons iH6">info</i></a></div>
              <div className="input-group">
                <MultiSelectField />
              </div>
            </div>
            <div>
              <OrgIdentifier />
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <PublisherMenuList />
          </div>

        </div>

        <div className="row">

          <div className="columns small-12 medium-8">

            <div className="columns small-12 medium-6">
              <OrgName />

            </div>

            <div className="columns small-12 medium-6">
              <div><h6>Language</h6></div>

              <div className="input-group">
                <MultiSelectLang />
              </div>

            </div>

          </div>


        </div>

      </div>


    </div>
  )
}

export default OrgWrapper
