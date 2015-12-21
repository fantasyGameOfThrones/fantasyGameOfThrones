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

exports.updateUser = (userID, updateData) => {
  return (dispatch) => {
    network.userRequests('PUT', userID, updateData)
      .then((response) => {
        if(!response.ok){ throw new Error('Update user failed: ',response)}
        response.json()
          .then((json) => {
            dispatch({type: action.UPDATE_USER_SUCCESS,payload:json});
          })
      })
      .catch((error) => dispatch({type: action.UPDATE_USER_FAILURE,payload: error}));
  }
};

exports.deleteUser = (userID) => {
  return (dispatch) => {
    network.userRequests('DELETE', userID)
      .then((response) => {
        if(!response.ok){throw response.statusText}
        response.json()
          .then((json)=>{
            dispatch({type: action.DELETE_USER,payload:json})
          })
      })
      .catch((err) => console.log(err))
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
        return response.json()
          .then((body) => dispatch({type: action.GET_CHARACTERS_SUCCESS,payload:body}))
      })
      .catch((err) => dispatch({type: action.GET_CHARACTERS_FAILURE, payload:err}))
  }
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
