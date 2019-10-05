import { DIALOG } from '../actionTypes';

export const openDialog = payload => ({
  type: `${DIALOG}_OPEN`,
  payload,
});
export const closeDialog = () => ({
  type: `${DIALOG}_CLOSE`,
});
