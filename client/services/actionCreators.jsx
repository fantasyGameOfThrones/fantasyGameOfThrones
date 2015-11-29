'use strict';
import network from './network.jsx';
import store from './store.jsx';

exports.setSelectedPlayer = ( player ) => {
  return {
    type: 'SET_SELECTED_PLAYER',
    payload: { player },
  }
};

exports.draftCharacter = ( character ) => {
  //mocked function for now:
  console.log('state: ', store.getState());
  character.drafted = store.getState().data.userData.name;
  return draftCharacterSuccess( character );

  //Real function for when we have a server:
  // return ( dispatch ) => {
  //   return network.draftCharacter( character )
  //   .then(( response ) => {
  //     return response.json()
  //     .then(( body ) => {
  //       if( response.ok ) {
  //         return dispatch( draftCharacterSuccess( body.character ));
  //       } else {
  //         return dispatch( draftCharacterFailure( body.error ));
  //       }
  //     });
  //   });
  // }
};

function draftCharacterSuccess( character ){
  return {
    type: 'DRAFT_CHARACTER_SUCCESS',
    payload: { character },
  }
};

function draftCharacterFailure( error ){
  return {
    type: 'DRAFT_CHARACTER_FAILURE',
    payload: { error },
  }
};
