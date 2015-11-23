import { combineReducers } from 'redux';

var selectedPlayer = function( state = '', action ){
  switch( action.type ){
    case 'SET_SELECTED_PLAYER':
      return action.payload;
    default:
      return state;
  }
}

module.exports = combineReducers({
  selectedPlayer,
});