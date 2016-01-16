import {combineReducers} from 'redux';
import * as actions from '../services/actionConstants.jsx';


const league = (state = {members:[]}, action) => {
  switch(action.type) {
    case actions.LOGIN_SUCCESS:
      return action.payload.league;
    case actions.CREATE_LEAGUE_SUCCESS:
      console.log('got here!');
      return action.payload.league || [];
    case actions.LOGOUT:
      return {members: []};
    default:
      return state;
  }
};

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

const user = (state = {}, action) => {
  // TODO: move these over to auth.self
  switch(action.type){
    case actions.LOGIN_SUCCESS:
      return action.payload.user;
    case actions.UPDATE_USER_SUCCESS:
      return state;
    case actions.UPDATE_USER_FAILURE:
      return state;
    case actions.DELETE_USER:
      return state;
    case actions.LOGOUT:
      return {};
    default:
      return state;
  }
};

const auth = (state = {token: '', self: {}}, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {token: action.payload.token, self: action.payload.user});
    case 'LOGIN_FAILURE':
      // login attempt/failure logic here, do something if many failed attempts
      return state;
    case 'LOGOUT':
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
    case actions.LOGOUT:
      return {draftStatus: 'PRE_DRAFT'};
    default:
      return state;
  }
};

export default combineReducers({
  user,
  characters,
  league,
  events,
  auth,
  draft
});