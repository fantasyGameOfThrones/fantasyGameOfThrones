import network from '../network.jsx';
import * as constants from '../actionConstants.jsx';

const signUpSuccess = (body) => {
  console.log('sign up success!', body);
  return {
    type: constants.SIGNUP_SUCCESS,
    payload: {
      user: body.user,
      token: body.token
    }
  };
};

const signUpFailure = (message) => {
  console.log('signUpFailure: ', message);
  return {
    type: constants.SIGNUP_FAILURE,
    payload: {
      error: message
    }
  };
};

export const signUp = (username, email, password) => {
  return (dispatch) => {
    return network.signUp(username, email, password)
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

const logInSuccess = (body) => {
  var action = {
    type: constants.LOGIN_SUCCESS,
    payload: {
      token: body.token,
      user: {
        id: body.user.id,
        username: body.user.username,
        email: body.user.email,
        roster: body.user.roster,
      },
      league: body.user.league,
      characters: body.characters,
      events: body.events,
    }
  };
  return action;
};

const logInFailure = (message) => {
  return {
    type: constants.LOGIN_FAILURE,
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
      console.log('Error logging in: ', error);
      return dispatch(logInFailure(error.message));
    });
  }
};

export const logOut = () => {
  //add network logout logic here and in network.jsx
  return (dispatch)=> dispatch({type:constants.LOGOUT});
};



