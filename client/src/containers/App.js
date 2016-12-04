import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import AppNavbar from '../components/AppNavbar';
import AuthModals from './AuthModals';

const App = ({ children, auth }) => (
  <div className="App">
    <AuthModals />
    <AppNavbar authState={auth} />
    <Grid>
      { children }
    </Grid>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.shape({
    user: PropTypes.object,
    isInProgress: PropTypes.bool,
  }).isRequired
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

const ConnectedApp = connect(
  mapStateToProps
)(App);

export default ConnectedApp;
