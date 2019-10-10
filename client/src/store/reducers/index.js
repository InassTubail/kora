import { combineReducers } from "redux";

import user from './user';
import dialog from './dialog';

export default combineReducers({
  user,
  dialog,
});
