import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'

import createSocketMiddleware from '../middleware/api'
import apiMiddleware from '../middleware/publicApi'

import io from 'socket.io-client'

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0

  let _socket = io('/');
  let socketMiddleware = createSocketMiddleware(_socket)

  const enhancer = applyMiddleware(thunk, socketMiddleware, apiMiddleware);

  return createStore(rootReducer, initialState, enhancer);
};
