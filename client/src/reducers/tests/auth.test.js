import auth from '../auth';

const errorPayload = {
  type: 'Something went wrong',
  data: 'Unauthorized',
  status: 401,
};

const userPayload = {
  username: 'john',
};

const authInitialState = {
  user: null,
  isInProgress: false,
  error: null
};

const authWithUserState = {
  user: userPayload,
  isInProgress: false,
  error: null
};

const authWithErrorState = {
  user: null,
  isInProgress: false,
  error: errorPayload,
};

const authInProgressState = {
  user: null,
  isInProgress: true,
  error: null,
};

const authStoppedProgressState = {
  user: null,
  isInProgress: false,
  error: null,
};

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      auth(undefined, {})
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_IN_PROGRESS', () => {
    expect(
      auth(authInitialState, {
        type: 'AUTH_IN_PROGRESS',
        payload: true
      })
    ).toEqual(authInProgressState);

    expect(
      auth(authWithErrorState, {
        type: 'AUTH_IN_PROGRESS',
        payload: false
      })
    ).toEqual(authStoppedProgressState);
  });

  it('should handle AUTH_SET_USER', () => {
    expect(
      auth(authInitialState, {
        type: 'AUTH_SET_USER',
        payload: userPayload
      })
    ).toEqual({
      user: userPayload,
      isInProgress: false,
      error: null
    });

    expect(
      auth(authWithUserState, {
        type: 'AUTH_SET_USER',
        payload: null
      })
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_FAIL', () => {
    expect(
      auth(authInitialState, {
        type: 'AUTH_FAIL',
        payload: errorPayload,
      })
    ).toEqual({
      user: null,
      isInProgress: false,
      error: errorPayload
    });
  });

  it('should handle AUTH_CLEAN_FAIL', () => {
    expect(
      auth(authWithErrorState, {
        type: 'AUTH_CLEAN_FAIL',
      })
    ).toEqual(authInitialState);
  });
});
