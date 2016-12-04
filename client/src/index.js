import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// external styles
import 'bootstrap/dist/css/bootstrap.css';

// app component
import App from './containers/App';
import Login from './containers/Login';
import NotFound from './components/NotFound';

// store
import store from './helpers/createStore';

// styles
import '../public/main.css';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Login} />
        {/* <Route path="bar" component={Bar}/> */}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
