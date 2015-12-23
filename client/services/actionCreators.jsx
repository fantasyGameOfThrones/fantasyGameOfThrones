'use strict';
import network from './network.jsx';
import * as actions from './actionConstants.jsx';

exports.navigateTo = (tab)  => {
  return {
    type: actions.CHANGE_MAIN_COMPONENT,
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
            dispatch({type: actions.UPDATE_USER_SUCCESS,payload:json});
          })
      })
      .catch((error) => dispatch({type: actions.UPDATE_USER_FAILURE,payload: error}));
  }
};

exports.deleteUser = (userID) => {
  return (dispatch) => {
    network.userRequests('DELETE', userID)
      .then((response) => {
        if(!response.ok){throw response.statusText}
        response.json()
          .then((json)=>{
            dispatch({type: actions.DELETE_USER,payload:json})
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
          .then((body) => dispatch({type: actions.GET_CHARACTERS_SUCCESS,payload:body}))
      })
      .catch((err) => dispatch({type: actions.GET_CHARACTERS_FAILURE, payload:err}))
  }
};
//END DEMO

exports.signUp = (username, password) => {
  return (dispatch) => {
    return network.signUp(username, password)
    .then((response) => {
      if (!response.ok) {throw new Error('Signup failure: ', response)}
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

function signUpSuccess(body) {
  return {
    type: actions.SIGNUP_SUCCESS,
    payload: {
      user: body.user,
      token: body.token
    }
  };
};

function signUpFailure(message) {
  return {
    type: actions.SIGNUP_FAILURE,
    payload: {
      error: message
    }
  };
};

// exports.logIn = (username, password) => {
//   return (dispatch) => {
//     return network.logIn(username, password)
//       .then((response) => {
//         if(!response.ok){throw response}
//         return response.json()
//           .then((json) => {
//             return dispatch({type:action.LOGIN_SUCCESS, payload:{user:json.user,token:json.token}});
//           })
//       })
//       .catch((err)=>{
//         return dispatch({type:action.LOGIN_FAILURE, payload:err});
//       })
//   }
// };

exports.logOut = () => {
  //add network logout logic here and in network.jsx
  return (dispatch)=> dispatch({type:action.LOGOUT});
};

exports.logIn = (username, password) => {
  return (dispatch) => {
    return network.logIn(username, password)
    .then((response) => {
      if (!response.ok) {throw new Error('Login failure: ', response)}
      return response.json();
    })
    .then((body) => {
      return dispatch(logInSuccess(body));
    })
    .catch((error) => {
      return dispatch(loginFailure(error.message));
    });
  }
};

function logInSuccess(body) {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: {
      token: body.token,
      user: body.user,
      league: body.league,
      characters: body.characters,
      events: body.events,
    }
  };
}

function logInFailure(message) {
  return {
    type: actions.LOGIN_FAILURE,
    payload: {
      error: message
    }
  };
}

