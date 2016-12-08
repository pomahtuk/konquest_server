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
import Register from './containers/Register';
import NotFound from './components/NotFound';

import ConnectedGameField from './containers/ConnectedGameField';

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
        {/* user-related routes */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* game-related routes */}
        <Route path="/game" component={ConnectedGameField} />
        {/* Default not found route */}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
