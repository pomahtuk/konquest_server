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
  let response = error;
  if (error.response) {
    response = error.response;
  }
  return {
    type: 'Error happened :(',
    data: response.data ? response.data : response.name,
    status: response.status ? response.status : response.message,
  };
};

export const autheticateUser = credentials => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.loginWithCredentials(credentials)
    .then(response => response.data)
    .then((data) => {
      dispatch(setProgresState(false));
      if (data.error) {
        throw new Error(data.error.message);
      }
      return dispatch(setUser(data.user));
    })
    .catch((error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
      // for further processing
      throw error;
    });
};

export const createUser = credentials => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.registerUser(credentials)
    .then(response => response.data)
    .then((data) => {
      dispatch(setProgresState(false));
      if (data.error) {
        throw new Error(data.error.message);
      }
      return dispatch(setUser(data.user));
    })
    .catch((error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
      // for further processing
      throw error;
    });
};

export const getCurrentUser = () => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.getCurrentUser()
    .then(response => response.data)
    .then((data) => {
      dispatch(setProgresState(false));
      dispatch(setUser(data.user));
    })
    .catch((error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
      // for further processing
      throw error;
    });
};

export const logoutUser = () => (dispatch) => {
  // start auth progress
  dispatch(setProgresState(true));
  // call api
  return api.logoutUser()
    .then(response => response.data)
    .then((data) => {
      dispatch(setProgresState(false));
      dispatch(setUser(data.user));
    })
    .catch((error) => {
      // need to handle error properly
      dispatch(setProgresState(false));
      dispatch(setFailureState(processError(error)));
      // for further processing
      throw error;
    });
};

export const clearAuthError = () => ({
  type: AUTH_CLEAN_FAIL,
});
