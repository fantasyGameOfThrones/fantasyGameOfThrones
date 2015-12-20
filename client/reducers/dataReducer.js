import { characters, players, user } from '../testData.jsx';
import { combineReducers } from 'redux';

let userReducer = ( state = {}, action ) => {
  switch( action.type ){
    default:
      return state;
  }
};

let leagueReducer = (state = {}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

let charactersReducer = (state = [], action) => {
  switch(action.type){
    default:
      return state;
  }
};

let eventsReducer = (state = [], action) => {
  switch(action.type) {
    default:
      return state;
  }
};

let userData = ( state = user, action ) => {
  switch( action.type ){
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  characters: charactersReducer,
  league: leagueReducer,
  events: eventsReducer
});