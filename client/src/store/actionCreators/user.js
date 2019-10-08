import {
  // enableLoading,
  loginSuccess,
  loginFailed,
} from '../actions';
const io = require('socket.io-client');

const socket = io.connect('http://localhost:8080');

export const login = name => async dispatch => {
  try {
    // dispatch(enableLoading());
    socket.emit('new user', name);
    // if (response.data.token)
      // localStorage.setItem('ors_token', response.data.token);
    dispatch(loginSuccess(name));
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};
