import network from '../network.jsx';
import * as constants from '../actionConstants.jsx';

export const signUp = (username, password) => {
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

const signUpSuccess = (body) => {
  return {
    type: constants.SIGNUP_SUCCESS,
    payload: {
      user: body.user,
      token: body.token
    }
  };
};

const signUpFailure = (message) => {
  return {
    type: constants.SIGNUP_FAILURE,
    payload: {
      error: message
    }
  };
};

export const logIn = (username, password) => {
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

const logInSuccess = (body) => {
  return {
    type: constants.LOGIN_SUCCESS,
    payload: {
      token: body.token,
      user: body.user,
      league: body.league,
      characters: body.characters,
      events: body.events,
    }
  };
};

const logInFailure = (message) => {
  return {
    type: constants.LOGIN_FAILURE,
    payload: {
      error: message
    }
  };
};

export const logOut = () => {
  //add network logout logic here and in network.jsx
  return (dispatch)=> dispatch({type:constants.LOGOUT});
};



