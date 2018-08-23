import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducers from '~/domain/reducers';
import sagas from '~/domain/sagas';

/* eslint-disable no-underscore-dangle, no-undef */
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  })
  : compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware /* , logger */));

const store = createStore(reducers, enhancer);
const persistor = persistStore(store);
sagaMiddleware.run(sagas);

export default {
  store,
  persistor,
};
