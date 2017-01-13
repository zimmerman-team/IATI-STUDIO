import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
          <div>
              <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
          </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
