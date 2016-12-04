import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import reducers from '../reducers';

// store
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  enhancer
);

export default store;
