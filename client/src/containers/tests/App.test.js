import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '../App';

// store
import store from '../../helpers/createStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
