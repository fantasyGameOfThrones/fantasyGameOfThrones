'use strict';

import store from './store.jsx';
//json dev server @3000, web-server@4000, node@8000
//json server has no /api, node server to hae /api route 
let url = 'http://localhost:8000';


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
    params.headers['X-Access-Token'] = store.getState().auth.token;
    params.headers['username'] = store.getState().auth.self.username;
  }
  return params;
};

/*
  below is a working example of a request to the server
  current plan is to deprecate api/characters
*/
const getCharacters = () => {
  const params = makeParams('GET');
  return fetch(`${url}/api/characters`, params)
    .catch((error) => console.log(error));
};

const userRequests = (method, userID, rawParams = {}) => {
  const params = makeParams(method, rawParams);
  return fetch(`${url}/api/users/${userID}`, params)
    .catch((error) => console.log(error))
};

const leagueRequests = (method, leagueID, rawParams = {}) => {
  const params = makeParams(method, rawParams);
  const urlString = leagueID ? `${url}/api/leagues/${leagueID}` : `${url}/leagues`;
  return fetch(urlString, params)
    .catch((error) => console.log(error))
};

const signUp = (username, password) => {
  let params = makeParams('POST', {username, password});
  // TODO: just return response
  return fetch(`${url}/auth/signup`, params)
    .catch((error) => {
      console.error(error);
    });
};

const logIn = (username, password) => {
  let params = makeParams('POST', {username, password});
  return fetch(`${url}/auth/login`, params)
    .catch((error) => {
      console.error('error fetching: ', error);
    });
};

export default {
  signUp,
  logIn,
  getCharacters,
  userRequests,
  leagueRequests,
};