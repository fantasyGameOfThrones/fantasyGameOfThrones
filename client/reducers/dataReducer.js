import {combineReducers} from 'redux';
import * as constants from '../services/actionConstants.jsx';


const league = (state = {}, action) => {
  switch(action.type) {
    case constants.LOGIN_SUCCESS:
      return action.payload.league || {};
    case constants.CREATE_LEAGUE_SUCCESS:
      return action.payload.league || {};
    case constants.UPDATE_LEAGUE_SUCCESS:
      return action.payload.league || {};
    case constants.LEAVE_LEAGUE_SUCCESS:
      return {};
    case constants.ACCEPT_INVITATION_SUCCESS:
      return action.payload.league;
    case constants.LOGOUT:
      return {};
    default:
      return state;
  }
};

const invitations = (state = [], action) => {
  switch(action.type) {
    case constants.LOGIN_SUCCESS:
      return action.payload.invitations || [];
    case constants.SIGNUP_SUCCESS:
      return action.payload.invitations || [];
    case constants.ACCEPT_INVITATION_SUCCESS:
      return action.payload.invitations;
    case constants.DECLINE_INVITATION_SUCCESS:
      return action.payload.invitations;
    default:
      return state;
  }
}

const characters = (state = [], action) => {
  switch(action.type){
    case constants.LOGIN_SUCCESS:
      return action.payload.characters;
    case constants.LOGOUT:
      return [];

    case constants.ACCEPT_INVITATION_SUCCESS:
      return action.payload.characters;
    default:
      return state;
  }
};

const events = (state = [], action) => {
  switch(action.type) {
    case constants.LOGIN_SUCCESS:
      return action.payload.events;
    case constants.ACCEPT_INVITATION_SUCCESS:
      return action.payload.events;
    case constants.LOGOUT:
      return [];
    default:
      return state;
  }
};

const auth = (state = {token: '', self: {}}, action) => {
  switch(action.type){
    case constants.SIGNUP_SUCCESS:
      return Object.assign({}, state, {token: action.payload.token, self: action.payload.user});

    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, {token: action.payload.token, self: action.payload.user});

    case constants.ACCEPT_INVITATION_SUCCESS:
      return Object.assign({}, state, {self: action.payload.user});

    case constants.ROSTER_UPDATED:
      let stateCpy = Object.assign({}, state);
      stateCpy.self.roster = action.payload;
      return Object.assign({}, stateCpy);

    case constants.LEAVE_LEAGUE_SUCCESS:
      return Object.assign({}, state, {self: action.payload.user});

    case constants.LOGIN_FAILURE:
      // login attempt/failure logic here, do something if many failed attempts
      return state;

    case constants.LOGOUT:
      // also destroy cookie?
      return Object.assign({},state,{token: '', self:{}});

    default:
      return state;
  }
};

const draft = (state={draftStatus:'PRE_DRAFT'}, action) => {
  switch(action.type) {
    case constants.START_DRAFT:
      return Object.assign({},state, {draftStatus:'MID_DRAFT'});

    case constants.LEAVE_LEAGUE_SUCCESS:
      return {draftStatus: 'PRE_DRAFT'}

    case constants.LOGOUT:
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