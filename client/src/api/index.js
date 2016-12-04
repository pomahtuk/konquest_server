import axios from 'axios';

const apiHost = '';

const getCurrentUser = () => axios.get(`${apiHost}/api/users/me`);

const loginWithCredentials = params => axios.post(`${apiHost}/api/users/login`, params);

const logoutUser = params => axios.get(`${apiHost}/api/users/logout`, params);

const registerUser = params => axios.post(`${apiHost}/api/users/register`, params);

export default {
  getCurrentUser,
  loginWithCredentials,
  registerUser,
  logoutUser,
};
