import {
  loginSuccess,
  loginFailed,
} from '../actions';
import socket from '../../utils/api';

export const login = name => async dispatch => {
  try {
    socket.emit('new user', name);
    dispatch(loginSuccess(name));
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};
