import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import AppNavbar from '../components/AppNavbar';
import AuthModals from './AuthModals';

import { logoutUser, getCurrentUser } from '../actions/auth';

class App extends Component {
  componentDidMount() {
    const { dispatch, auth } = this.props;
    if (!auth.user) {
      dispatch(getCurrentUser());
    }
  }

  render() {
    const { children, auth, dispatch } = this.props;

    return (
      <div className="App">
        <AuthModals />
        <AppNavbar
          authState={auth}
          logoutCallback={() => dispatch(logoutUser())}
        />
        <Grid>
          { children }
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
