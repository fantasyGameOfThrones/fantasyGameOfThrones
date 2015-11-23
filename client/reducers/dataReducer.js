import { characters } from '../testData.jsx';
import { players } from '../testData.jsx';
import { combineReducers } from 'redux';


var characterData = function( state = characters, action ){
  switch( action.type ){
    default:
      return state;
  }
};

var playerData = function( state = players, action ){
  switch( action.type ){
    default:
      return state;
  }
};

module.exports = combineReducers({
  characterData,
  playerData,
});