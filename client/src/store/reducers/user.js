import { USER } from '../actionTypes';

const initialState = {
  isLoggedIn: false,
  info: {
    username: '',
    is_playing: false,
    with: null,
    room: null,
    person: null,
    level: 1,
    score: 0,
  },
  users: [],
  error: null,
  success: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${USER.LOGIN}_SUCCESS`:
      return {
        ...state,
        isLoggedIn: true,
        info: {
          username: payload,
          is_playing: false,
          with: null,
          room: null,
          person: null,
          level: 1,
          score: 0,
        },
      };
    case `${USER.USERS}`:
      return {
        ...state,
        users: payload,
      };
    case `${USER.LOGIN}_FAILED`:
      return {
        ...state,
        isLoggedIn: false,
        info: {},
        error: payload.message,
      };
    case `${USER.UPLOAD}`:
      return {
        ...state,
        info: payload,
      }
    default:
      return state;
  }
};
