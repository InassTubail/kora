import { USER } from '../actionTypes';

export const enableLoading = () => ({ type: USER.LOADING });

export const loginSuccess = payload => ({
  type: `${USER.LOGIN}_SUCCESS`,
  payload,
});
export const getUsers = payload => ({
  type: `${USER.USERS}`,
  payload,
});
export const loginFailed = payload => ({
  type: `${USER.LOGIN}_FAILED`,
  payload,
});

export const updateUser = payload => ({
  type: `${USER.UPLOAD}`,
  payload,
});

export const updateGame = payload => ({
  type: `${USER.UPDATE_GAME}`,
  payload,
});
export const replay_Game = () => ({
  type: `${USER.REPLAY_GAME}`
});
export const clearError = () => ({ type: USER.CLEAR_ERROR });
export const hideUpdateSuccessMessage = () => ({
  type: USER.CLEAR_SUCCESS,
});
