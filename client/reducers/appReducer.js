import { combineReducers } from 'redux';

import data from './dataReducer';
import ui from './uiReducer';

module.exports = combineReducers({
  data,
  ui,
});