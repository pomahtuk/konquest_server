import React from 'react';
import ReactDOM from 'react-dom';

import AppNavbar from '../AppNavbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppNavbar authState={{ user: null, isInProgress: false }} />,
    div
  );
});
