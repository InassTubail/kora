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
    invite: [],
    accpet: []
  },
  users: [],
  error: null,
  success: '',
  play: {
    // room: '',
    role: '',
    isMyRole: false,
    color: '',
    number1: 0,
    number2: 0,
    answers: [],
    redScore: 0,
    blueScore: 0,
    redTeam: [],
    blueTeam: [],
    numberOfQuestion: 0,
    resultPrevPlayer: 0,
    timer: 0
  }
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
          invite: [],
          accpet: []
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
    case `${USER.UPDATE_GAME}`:
      return {
        ...state,
        play: payload,
      }
    default:
      return state;
  }
};
