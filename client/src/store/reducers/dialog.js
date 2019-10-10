import { DIALOG } from '../actionTypes';

const initialState = {
  open: false,
  come_from: '',
  type: ''
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
      };
    case `${DIALOG}_CLOSE`:
      return {
        ...state,
        open: false,
        // come_from: '',
        // type: ''
      };
    default:
      return state;
  }
};
