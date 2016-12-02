import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// external styles
import 'bootstrap/dist/css/bootstrap.css';

// app component
// import App from './containers/App/App';
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import reducers from './reducers';

// styles
import './assets/index.css';

// store
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={Layout}>
        {/* <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/> */}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
