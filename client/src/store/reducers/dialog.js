import { DIALOG } from '../actionTypes';

const initialState = {
  open: false,
  come_from: '',
  type: '',
  removeAfterTime: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${DIALOG}_OPEN`:
      return {
        ...state,
        open: true,
        come_from: payload.from,
        type: payload.type,
        removeAfterTime: payload.removeAfterTime || false,
      };
    case `${DIALOG}_CLOSE`:
      return {
        ...state,
        open: false,
        removeAfterTime: false,
        come_from: '',
        type: ''
      };
    default:
      return state;
  }
};
