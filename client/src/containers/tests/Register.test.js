import React from 'react';
import ReactDOM from 'react-dom';

import Register from '../Register';

// store
import store from '../../helpers/createStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Register store={store} />, div);
});
