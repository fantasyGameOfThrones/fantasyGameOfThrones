import {combineReducers} from 'redux';
import * as constants from '../services/actionConstants.jsx'

const contentDisplay = (state = 'HOME', action) => {
  switch(action.type){
    case constants.CHANGE_MAIN_COMPONENT:
      return action.payload.tab;
    case constants.CREATE_LEAGUE_SUCCESS:
      return 'HOME';
    case constants.CHANGE_ROSTER_USER:
      return 'ROSTERS';
    case constants.LEAVE_LEAGUE_SUCCESS: 
      return 'HOME';
    case constants.LOGOUT:
      return 'HOME';
    default:
      return state;
  }
};

const authDisplay = (state = 'LOGIN', action) => {
  switch(action.type) {
    case constants.CHANGE_AUTH_DISPLAY:
      return action.payload.authDisplay;
    case constants.LOGOUT:
      return 'LOGIN';
    default:
      return state;
  }
};

const rosterUser = (state = {}, action) => {
  switch(action.type) {
    case constants.CHANGE_ROSTER_USER:
      return action.payload.user;
    case constants.LEAVE_LEAGUE_SUCCESS: 
      return {};
    case constants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  contentDisplay,
  authDisplay,
  rosterUser
});