import {combineReducers} from 'redux';
import * as actions from '../services/actionConstants.jsx';

let leagueReducer = (state = {}, action) => {
  switch(action.type) {
    case actions.LOGIN_SUCCESS:
      return action.payload.league;
    default:
      return state;
  }
};

let charactersReducer = (state = [], action) => {
  switch(action.type){
    case actions.LOGIN_SUCCESS:
      return action.payload.characters;
    default:
      return state;
  }
};

let eventsReducer = (state = [], action) => {
  switch(action.type) {
    case actions.LOGIN_SUCCESS:
      return action.payload.events;
    default:
      return state;
  }
};

let userReducer = (state = {}, action) => {
  switch(action.type){
    case actions.LOGIN_SUCCESS:
      return action.payload.user;
    case actions.UPDATE_USER_SUCCESS:
      return state;
    case actions.UPDATE_USER_FAILURE:
      return state;
    case actions.DELETE_USER:
      return state;
    default:
      return state;
  }
};

let tokenReducer = (state = null, action) => {
  switch(action.type){
    case actions.LOGIN_SUCCESS:
      return action.payload.token;
    default:
      return state;
  }
};

export default combineReducers({
  token: tokenReducer,
  user: userReducer,
  characters: charactersReducer,
  league: leagueReducer,
  events: eventsReducer,
});