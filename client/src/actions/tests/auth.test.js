import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from '../auth';
import * as types from '../../constants/auth';

import apiHost from '../../../../config/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userCredentials = {
  username: 'john',
  psaaword: '1111',
};

const authInitialState = {
  user: null,
  isInProgress: false,
  error: null
};

describe('auth actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('clearAuthError should create AUTH_CLEAN_FAIL action', () => {
    expect(actions.clearAuthError()).toEqual({
      type: 'AUTH_CLEAN_FAIL',
    });
  });

  it('autheticateUser should set loading state before and after execution', (done) => {
    const userObject = {
      username: 'john'
    };

    const expectedActions = [
      { type: types.AUTH_IN_PROGRESS, payload: true },
      { type: types.AUTH_IN_PROGRESS, payload: false },
      { type: types.AUTH_SET_USER, payload: userObject }
    ];

    const store = mockStore({ auth: authInitialState });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user: userObject
        }
      });
    });

    return store.dispatch(actions.autheticateUser(userCredentials))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
