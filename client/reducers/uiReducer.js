import { combineReducers } from 'redux';

const contentDisplay = function(state = 'HOME', action){
  switch( action.type){
    case 'CHANGE_MAIN_COMPONENT':
      return action.payload.tab;
    default:
      return state;
  }
};

export default combineReducers({
  contentDisplay,
});