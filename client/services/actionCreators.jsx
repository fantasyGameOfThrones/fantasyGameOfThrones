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

exports.login = (username, password) => {
  return (dispatch) => {
    return network.login(username, password)
    .then((response) => {
      if (!response.ok) {throw new Error('Login failure: ', response)}
      return response.json();
    })
    .then((body) => {
      return dispatch(loginSuccess(body));
    })
    .catch((error) => {
      return dispatch(loginError(error.message));
    });
  }
};

function loginSuccess(body) {
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

function loginFailure(message) {
  return {
    type: actions.LOGIN_FAILURE,
    payload: {
      error: message
    }
  };
}

exports.draftCharacter = (character) => {
  //mocked function for now:
  // console.log('state: ', store.getState());
  // character.drafted = store.getState().data.userData.name;
  // return draftCharacterSuccess( character );

  // Real function for when we have a server:
  return ( dispatch ) => {
    return network.draftCharacter( character )
    .then(( response ) => {
      if (!response.ok) { throw new Error('Draft char, res not ok: ', response); }
      return response.json()
    })
    .then(( body ) => {
        return dispatch( draftCharacterSuccess( body.character ));
    })
    .catch(( error ) => {
      return dispatch( draftCharacterFailure(error.message));
    });
  }
};

function draftCharacterSuccess( character ){
  return {
    type: DRAFT_CHARACTER_SUCCESS,
    payload: { character },
  }
};

function draftCharacterFailure( error ){
  return {
    type: DRAFT_CHARACTER_FAILURE,
    payload: { error },
  }
};
