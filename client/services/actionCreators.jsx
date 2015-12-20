'use strict';
import network from './network.jsx';
import store from './store.jsx';

exports.setSelectedPlayer = ( player ) => {
  return {
    type: 'SET_SELECTED_PLAYER',
    payload: { player },
  }
};

exports.navigateTo = (tab)  => {
  return {
    type: 'CHANGE_MAIN_COMPONENT',
    payload: {tab}
  }
};

/*DEMO
  below is a working example of a request to the server
  current plan is to deprecate api/characters
*/
exports.getCharacters = () => {
  return (dispatch) => {
    network.getCharacters()
      .then((response) => {
        if(!response.ok){throw response.statusText}
        return response.text()
          .then((body) => dispatch(getCharactersStatus(true, JSON.parse(body))))
      })
      .catch((err) => dispatch(getCharactersStatus(false, err)))
  }
};
function getCharactersStatus(responseOk, payload) {
  let success = responseOk ? 
    'GET_CHARACTERS_SUCCESS' : 'GET_CHARACTERS_FAILURE';
  console.log('#',{type:success,payload});
  return {
    type: success,
    payload
  };
};
//END DEMO


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
