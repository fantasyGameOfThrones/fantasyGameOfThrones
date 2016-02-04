import network from '../network.jsx';
import * as constants from '../actionConstants.jsx';

const acceptInvitationSuccess = (body) => {
  return {
    type: constants.ACCEPT_INVITATION_SUCCESS,
    payload: {
      user: body.user,
      token: body.token
    }
  };
};

const acceptInvitationFailure = (message) => {
  return {
    type: constants.ACCEPT_INVITATION_FAILURE,
    payload: {
      error: message
    }
  };
};

export const acceptInvitation = (invitationId) => {
  return (dispatch) => {
    return network.acceptInvite('PUT', invitationId, {status: 'accepted'})
    .then((response) => {
      if (!response.ok) {throw new Error('Signup failure: ', response)}
      return response.json();
    })
    .then((body) => {
      return dispatch(acceptInvitationSuccess(body));
    })
    .catch((error) => {
      return dispatch(acceptInvitationFailure(error.message));
    });
  }
};


