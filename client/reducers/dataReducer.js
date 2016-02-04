import {combineReducers} from 'redux';
import * as actions from '../services/actionConstants.jsx';


const league = (state = {}, action) => {
  switch(action.type) {
    case actions.LOGIN_SUCCESS:
      return action.payload.league || {};
    case actions.CREATE_LEAGUE_SUCCESS:
      return action.payload.league || {};
    case actions.UPDATE_LEAGUE_SUCCESS:
      return action.payload.league || {};
    case actions.LEAVE_LEAGUE_SUCCESS:
      return {};
    case actions.LOGOUT:
      return {};
    default:
      return state;
  }
};

const invitations = (state = [], action) => {
  switch(action.type) {
    case actions.LOGIN_SUCCESS:
      return action.payload.invitations || [];
    case actions.SIGNUP_SUCCESS:
      return action.payload.invitations || [];
    default:
      return state;
  }
}

const characters = (state = [], action) => {
  switch(action.type){
    case actions.LOGIN_SUCCESS:
      return action.payload.characters;
    case actions.LOGOUT:
      return [];
    default:
      return state;
  }
};

const events = (state = [], action) => {
  switch(action.type) {
    case actions.LOGIN_SUCCESS:
      return action.payload.events;
    case actions.LOGOUT:
      return [];
    default:
      return state;
  }
};

const auth = (state = {token: '', self: {}}, action) => {
  switch(action.type){
    case actions.SIGNUP_SUCCESS:
      return Object.assign({}, state, {token: action.payload.token, self: action.payload.user});
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {token: action.payload.token, self: action.payload.user});
    case 'ROSTER_UPDATED':
      let stateCpy = Object.assign({}, state);
      stateCpy.self.roster = action.payload;
      return Object.assign({}, stateCpy);
    case actions.LEAVE_LEAGUE_SUCCESS:
      return Object.assign({}, state, {self: action.payload.user});
    case actions.LOGIN_FAILURE:
      // login attempt/failure logic here, do something if many failed attempts
      return state;
    case actions.LOGOUT:
      // also destroy cookie?
      return Object.assign({},state,{token: '', self:{}})
    default:
      return state;
  }
};

const draft = (state={draftStatus:'PRE_DRAFT'}, action) => {
  switch(action.type) {
    case 'START_DRAFT':
      return Object.assign({},state, {draftStatus:'MID_DRAFT'});
    case actions.LEAVE_LEAGUE_SUCCESS:
      return {draftStatus: 'PRE_DRAFT'}
    case actions.LOGOUT:
      return {draftStatus: 'PRE_DRAFT'};
    default:
      return state;
  }
};

export default combineReducers({
  characters,
  league,
  events,
  auth,
  draft,
  invitations
});