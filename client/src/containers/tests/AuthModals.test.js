import React from 'react';
import ReactDOM from 'react-dom';

import AuthModals from '../AuthModals';

// store
import store from '../../helpers/createStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthModals store={store} />, div);
});
