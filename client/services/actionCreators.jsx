'use strict';
import network from './network.jsx';
import * as action from './actionConstants.jsx';
//make this work
// import { ...constants } from './actionConstants.jsx';

exports.navigateTo = (tab)  => {
  return {
    type: action.CHANGE_MAIN_COMPONENT,
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
    action.GET_CHARACTERS_SUCCESS : action.GET_CHARACTERS_FAILURE;
  console.log('#',{type:success,payload});
  return {
    type: success,
    payload
  };
};
//END DEMO

exports.signUp = (username, password) => {
  return (dispatch) => {
    return network.signUp(username, password)
    .then((response) => {
      if (!response.ok) { throw new Error('Signup failure: ', response) }
      return response.json();
    })
    .then((body) => {
      return dispatch(signUpSuccess(body));
    })
    .catch((error) => {
      return dispatch(signUpFailure(error.message));
    });
  }
};

function signUpStatus(body) {
  return {
    type: action.SIGNUP_SUCCESS,
    payload: {
      user: body.user,
      token: body.token
    }
  };
};

function signUpFailure(message) {
  return {
    type: action.SIGNUP_FAILURE,
    payload: {
      error: message
    }
  };
};
