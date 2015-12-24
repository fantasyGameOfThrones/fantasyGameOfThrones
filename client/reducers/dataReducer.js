import {combineReducers} from 'redux';

const leagueReducer = (state = {}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const charactersReducer = (state = [], action) => {
  switch(action.type){
    default:
      return state;
  }
};

const eventsReducer = (state = [], action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch(action.type){
    case 'UPDATE_USER_SUCCESS':
      console.log(action);
      return state;
    case 'UPDATE_USER_FAILURE':
      console.log(action);
      return state;
    case 'DELETE_USER':
      console.log(action);
      return state;
    default:
      return state;
  }
};

const authReducer = (state = {token:'devModeStartLoggedIn'}, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {token:action.payload.token, self:action.payload.user});
    case 'LOGIN_FAILURE':
      // login attempt/failure logic here, do something if many failed attempts
      return state;
    case 'LOGOUT':
      // also destroy cookie?
      return Object.assign({},state,{token:'',self:{}})
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  characters: charactersReducer,
  league: leagueReducer,
  events: eventsReducer,
  auth: authReducer
});