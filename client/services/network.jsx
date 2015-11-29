'use strict';

import store from './store.jsx';
let url = 'http://localhost:8080/';

let makeParams = ( method, body ) => {

  let params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if ( body ) {
    params.body = JSON.stringify( body );
  }

  if ( store.getState().token ) {
    //attach the token if given
    params.headers[ 'X-Access-Token' ] = store.getState().token;
  }

  return params;

};

// let signup = ( username, password ) => {
//   let params = makeParams( 'POST', { username, password } );

//   // TODO: just return response
//   return fetch( url + 'auth/signup', params )
//     .catch(( error ) => {
//       console.error( error );
//     });
// };

// let login = ( username, password ) => {
//   let params = makeParams( 'POST', { username, password } );

//   return fetch( url + 'auth/login', params )
//     .catch(( error ) => {
//       console.error( error );
//     });
// };

let draftCharacter = ( character ) => {
  let params = makeParams( 'POST', { character } );
  let teamId = store.getState().team.id;

  return fetch( url + 'teams/' + teamId, params )
    .catch(( error ) => {
      console.error( error );
    });
};

module.exports = {
  // signup,
  // login,
  draftCharacter,
};