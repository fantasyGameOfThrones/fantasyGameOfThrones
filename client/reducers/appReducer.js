import { combineReducers } from 'redux';

import data from './dataReducer';
import ui from './uiReducer';

export default combineReducers({
  data,
  ui,
});