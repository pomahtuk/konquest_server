import api from '../api';
import { AUTH_SET_USER, AUTH_IN_PROGRESS, AUTH_FAIL, AUTH_CLEAN_FAIL } from '../constants/auth';

const setUser = user => ({
  type: AUTH_SET_USER,
  payload: user,
});

const setProgresState = isInProgress => ({
  type: AUTH_IN_PROGRESS,
  payload: isInProgress,
});

const setFailureState = errors => ({
  type: AUTH_FAIL,
  payload: errors,
});

const processError = (error) => {
  console.log(error);
  const { response } = error;
  return {
    type: 'Something went wrong',
    data: response.data,
    status: response.status,
  };
};

export const autheticateUser = credentials => (dispatch) => {
  let requestFailed = false;
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.loginWithCredentials(credentials)
    .then(response => response.data, (error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
      requestFailed = true;
    })
    .then((data) => {
      if (!requestFailed) {
        dispatch(setProgresState(false));
        // TODO: check for auth error
        dispatch(setUser(data.user));
      }
    });
};

export const createUser = credentials => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.registerUser(credentials)
    .then(response => response.data, (error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
    })
    .then((data) => {
      dispatch(setProgresState(false));
      // TODO: check for auth error
      dispatch(setUser(data.user));
    });
};

export const getCurrentUser = () => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.getCurrentUser()
    .then(response => response.data, (error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
    })
    .then((data) => {
      dispatch(setProgresState(false));
      dispatch(setUser(data.user));
    });
};

export const logoutUser = () => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.logoutUser()
    .then(response => response.data, (error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
    })
    .then((data) => {
      dispatch(setProgresState(false));
      dispatch(setUser(data.user));
    });
};


export const clearAuthError = () => ({
  type: AUTH_CLEAN_FAIL,
});
