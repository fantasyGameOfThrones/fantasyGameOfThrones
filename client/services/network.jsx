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
  if (store.getState().data.auth.token){
    //attach the token if given
    params.headers['x-access-token'] = store.getState().data.auth.token;
    params.headers['id'] = store.getState().data.auth.self.id;
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

const userRequests = (method, rawParams = {}) => {
  const params = makeParams(method, rawParams);
  const id = store.getState().data.auth.self.id;
  return fetch(`${url}/api/users/${id}`, params)
    .catch((error) => console.log(error))
};

const leagueRequests = (method, leagueID, rawParams = {}) => {
  const params = makeParams(method, rawParams);
  const urlString = leagueID ? `${url}/api/leagues/${leagueID}` : `${url}/api/leagues`;
  return fetch(urlString, params)
    .catch((error) => console.log(error))
};

const signUp = (username, email, password) => {
  let params = makeParams('POST', {username, email, password});
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

const trade = (body) => {
  const params = makeParams('POST', body);
  return fetch(`${url}/api/trade`, params)
    .catch((error) => console.error(error))
}

export default {
  signUp,
  logIn,
  getCharacters,
  userRequests,
  leagueRequests,
  trade
};