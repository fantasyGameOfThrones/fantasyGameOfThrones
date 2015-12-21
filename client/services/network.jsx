'use strict';

import store from './store.jsx';
//json dev server @3000, web-server@4000, node@8000
//json server has no /api, node server to hae /api route 
let url = 'http://localhost:3000';


let makeParams = (method, body) => {

  let params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if(body){
    params.body = JSON.stringify(body);
  }
  if (store.getState().token){
    //attach the token if given
    params.headers['X-Access-Token'] = store.getState().token;
  }
  return params;
};

/*
  below is a working example of a request to the server
  current plan is to deprecate api/characters
*/
const getCharacters = () => {
  const params = makeParams('GET');
  return fetch( url + '/characters', params)
    .catch(( error ) => console.log(error));
};

const userRequests = (method, userID, rawParams={}) => {
  const params = makeParams(method, rawParams);
  return fetch(`${url}/users/${userID}`, params)
    .catch((error) => console.log(error))
};

const signup = ( username, password ) => {
  let params = makeParams( 'POST', { username, password } );

  // TODO: just return response
  return fetch( url + 'auth/signup', params )
    .catch(( error ) => {
      console.error( error );
    });
};

const login = ( username, password ) => {
  let params = makeParams( 'POST', { username, password } );

  return fetch( url + 'auth/login', params )
    .catch(( error ) => {
      console.error( error );
    });
};

export default {
  signup,
  login,
  getCharacters,
  userRequests,
};