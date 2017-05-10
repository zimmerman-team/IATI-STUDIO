import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk'
import createSocketMiddleware from '../middleware/api'
import apiMiddleware from '../middleware/publicApi'

import io from 'socket.io-client'

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0

  let _socket = io('/');
  let socketMiddleware = createSocketMiddleware(_socket)

  const enhancer = compose(
    // Middleware you want to use in development:
    // applyMiddleware(d1, d2, d3),
    applyMiddleware(thunkMiddleware, socketMiddleware, apiMiddleware),
    // Required! Enable Redux DevTools with the monitors you chose
    //DevTools.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    //persistState(getDebugSessionKey()),
    // Uncomment to enable Redux dev tool browser extension
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  const store = createStore(
      rootReducer,
      initialState,
      enhancer
  )

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      return store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    }
    );
  }

  return store;
}
