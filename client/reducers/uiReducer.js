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
    case 'ROSTER_UPDATED':
      return action.payload;
    default:
      return state;
  }
};

const tradeDisplay = (state = {dropCharId: null, addCharId: null}, action) => {
  switch(action.type) {
    case 'CHANGE_CHAR_TO_DROP':
      return { dropCharId: action.payload.dropCharId, addCharId: state.addCharId };
    case 'CHANGE_CHAR_TO_ADD':
      return { dropCharId: state.dropCharId, addCharId: action.payload.addCharId };
    default:
      return state;
  }
};

export default combineReducers({
  contentDisplay,
  authDisplay,
  rosterUser,
  tradeDisplay
});