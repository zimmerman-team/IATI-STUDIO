"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { browserHistory }     from 'react-router'
import { toggleMainMenu }     from '../../actions/sync'
import MultiSelectField       from '../lib/react-select/MultiSelect'
import MultiSelectLang        from '../lib/react-select/MultiSelectLang'
import { PublisherButton }    from '../general/List.react.jsx'

import {
	PageTitle, PageTitleButtonsGroup1, OrgIdentifier, OrgName, ValidationButton,
	PublisherInput, PublisherMenuList } from './PublisherElements'

let PublisherStart = React.createClass({

  render: function() {

    return (
      <div>
        <div id="orgWrapper">
          <div className="rowPub">

            <PageTitle pageTitleContent="Start publishing" />

            <div className="row">
              <div className="columns small-12">

                <div className="columns small-12 medium-8">
                  <div className="columns small-12 medium-6">
										<PublisherInput value='String' readOnly />
										<PublisherButton type="submit" value='Boolean'/>
                  </div>

                  <div className="columns small-12 medium-6">
										<PublisherInput className='inputValidated' value='String' disabled readOnly />
                  </div>
                </div>

                <div className="columns small-12 medium-4">
									<PublisherInput className='inputNotValidated' value='String' disabled readOnly />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
})

export default PublisherStart
