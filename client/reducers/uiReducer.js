import {combineReducers} from 'redux';
import * as constants from '../services/actionConstants.jsx'

const contentDisplay = (state = 'HOME', action) => {
  switch(action.type){
    case constants.CHANGE_MAIN_COMPONENT:
      return action.payload.tab;
    case constants.CREATE_LEAGUE_SUCCESS:
      return 'HOME';
    default:
      return state;
  }
};

const authDisplay = (state = 'LOGIN', action) => {
  switch(action.type) {
    case constants.CHANGE_AUTH_DISPLAY:
      return action.payload.authDisplay;
    default:
      return state;
  }
};

export default combineReducers({
  contentDisplay,
  authDisplay,
});