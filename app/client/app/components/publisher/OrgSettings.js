"use strict"

import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import _                      from 'lodash'
import classNames             from 'classnames'
import { browserHistory }     from 'react-router'
import { toggleMainMenu }     from '../../actions/sync'

import MultiSelectField       from '../lib/react-select/MultiSelect'
import MultiSelectLang        from '../lib/react-select/MultiSelectLang'
import SelectFiletype         from '../lib/react-select/SelectFiletype'

import { PageTitle, PageTitleButtonsGroup1, OrgIdentifier, OrgName } from './PublisherElements'

let OrgSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() { this.props.toggleMainMenu(false) },

  render: function() {
    return (
      <div>
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

                <div className="columns small-12 medium-6">
                  <div><h6>Select Filetype</h6></div>
                  <div className="input-group">
                    <SelectFiletype />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state, props) { return {} }

export default connect(mapStateToProps, {toggleMainMenu,})(OrgSettings)
