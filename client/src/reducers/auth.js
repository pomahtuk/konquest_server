import { AUTH_SET_USER, AUTH_IN_PROGRESS, AUTH_FAIL, AUTH_CLEAN_FAIL } from '../constants/auth';

const auth = (state = {
  user: null,
  isInProgress: false,
  error: null
}, action) => {
  switch (action.type) {
    case AUTH_IN_PROGRESS:
      return Object.assign({}, state, {
        isInProgress: action.payload,
        error: null,
      });
    case AUTH_SET_USER:
      return {
        user: action.payload,
        isInProgress: false,
        error: null,
      };
    case AUTH_FAIL:
      return Object.assign({}, state, {
        user: null,
        error: action.payload,
      });
    case AUTH_CLEAN_FAIL:
      return Object.assign({}, state, {
        error: null,
      });
    default:
      return state;
  }
};

export default auth;
