import { combineReducers } from 'redux';

var selectedPlayer = function( state = '', action ){
  switch( action.type ){
    case 'SET_SELECTED_PLAYER':
      return action.payload;
    default:
      return state;
  }
}

const contentDisplay = function(state = 'HOME', action){
  switch( action.type){
    case 'CHANGE_MAIN_COMPONENT':
      return action.payload.tab;
    default:
      return state;
  }
}

module.exports = combineReducers({
  selectedPlayer,
  contentDisplay,
});