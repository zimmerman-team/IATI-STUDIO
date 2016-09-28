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


var Greetr = require('./testNodeGreetr');
var greeter1 = new Greetr();

greeter1.on('greet', function(data) {
	 { /*console.log('Someone greeted!: ' + data); */ }
});
greeter1.greet('Alessandro');


let publisher = require('./')

let TestNodeSettings = React.createClass({ // A stateful container all children are stateless

  getInitialState: function() { return {} },

  componentDidMount: function() {},
  componentWillMount: function() { this.props.toggleMainMenu(false) },

  render: function() {

		console.log(publisher)

    return (
      <div>
        <div id="orgWrapper">
          <div className="rowPub">

            <PageTitle pageTitleContent="Test Node.js" />

            <div className="row">
              <div className="columns small-12">

                <div className="columns small-12 medium-8">
                  <div className="columns small-12 medium-6">
										<PublisherInput value='String' />
										<PublisherButton type="submit" value='Boolean' />
                  </div>

                  <div className="columns small-12 medium-6">
										<PublisherInput className='inputValidated' value='String' disabled />
                  </div>
                </div>

                <div className="columns small-12 medium-4">
									<PublisherInput className='inputNotValidated' value='String' disabled />
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

export default connect(mapStateToProps, {toggleMainMenu,})(TestNodeSettings)
