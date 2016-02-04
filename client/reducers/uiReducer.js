import {combineReducers} from 'redux';
import * as actions from '../services/actionConstants.jsx'

const contentDisplay = (state = 'HOME', action) => {
  switch(action.type){
    case actions.CHANGE_MAIN_COMPONENT:
      return action.payload.tab;
    case actions.CREATE_LEAGUE_SUCCESS:
      return 'HOME';
    case actions.CHANGE_ROSTER_USER:
      return 'ROSTERS';
    case actions.LEAVE_LEAGUE_SUCCESS: 
      return 'HOME';
    case actions.ACCEPT_INVITATION_SUCCESS:
      return 'HOME';
    case actions.LOGOUT:
      return 'HOME';
    default:
      return state;
  }
};

const authDisplay = (state = 'LOGIN', action) => {
  switch(action.type) {
    case actions.CHANGE_AUTH_DISPLAY:
      return action.payload.authDisplay;
    case actions.LOGOUT:
      return 'LOGIN';
    default:
      return state;
  }
};

const rosterUser = (state = {}, action) => {
  switch(action.type) {
    case actions.CHANGE_ROSTER_USER:
      return action.payload.user;
    case actions.LEAVE_LEAGUE_SUCCESS: 
      return {};
    case actions.LOGOUT:
      return {};
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