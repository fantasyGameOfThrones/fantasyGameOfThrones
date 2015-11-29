import { characters, players, user } from '../testData.jsx';
import { combineReducers } from 'redux';

let userData = ( state = user, action ) => {
  switch( action.type ){
    default:
      return state;
  }
};

let notDrafted = (char) => {
  return char.drafted === null;
};

let drafted = (char) => {
  return char.drafted;
}

let characterData = ( state = characters.filter(notDrafted), action ) => {
  switch( action.type ){
    case 'DRAFT_CHARACTER_SUCCESS':
      return characters.filter(notDrafted);
    default:
      return state;
  }
};

let playerData = ( state = players, action ) => {
  switch( action.type ){
    default:
      return state;
  }
};

let teamData = ( state = characters.filter(drafted), action ) => {
  switch( action.type ){
    case 'DRAFT_CHARACTER_SUCCESS':
      return characters.filter(drafted);
    default:
      return state;
  }
};

module.exports = combineReducers({
  userData,
  characterData,
  playerData,
  teamData,
});