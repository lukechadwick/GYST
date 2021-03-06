import request from '../utils/api';
import { saveUserToken } from '../utils/auth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: 'Login failed'
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return request('post', '/auth/login', creds)
      .then(response => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(response.body.message));
          return Promise.reject(response.body.message);
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.body.token);
          // Dispatch the success action
          dispatch(receiveLogin(userInfo));
        }
      })
      .catch(err => dispatch(loginError(err.response.body.message)));
  };
}

export function receiveImage(image) {
  return {
    type: 'IMAGE_RECEIVED',
    isFetching: false,
    isAuthenticated: true,
    image
  };
}

export function getProfileImage(id) {
  return dispatch => {
    let obj = { id };
    return request('get', '/image', obj)
      .then(response => {
        if (!response.ok) {
        } else {
          dispatch(receiveImage(response.body.image));
        }
      })
      .catch(err => dispatch(loginError(err.response.body.message)));
  };
}
