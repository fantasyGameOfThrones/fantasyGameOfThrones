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

//or characters
// let charactersReducer = (state=[], action) => {
//   switch(action.type){
//     case 'GET_INITIAL_DATA_SUCCESS':
//       return action.payload.characters
//   }
// };
// let characterData = ( state = [], action ) => {
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

export default combineReducers({
  userData,
  characterData,
  playerData,
  teamData,
  characterData
  // characters: charaReducer
});