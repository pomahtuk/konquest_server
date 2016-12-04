import React from 'react';
import ReactDOM from 'react-dom';

import Login from '../Login';

// store
import store from '../../helpers/createStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login store={store} />, div);
});
