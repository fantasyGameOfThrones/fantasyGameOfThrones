import network from '../network.jsx';
import * as constants from '../actionConstants.jsx';

const acceptInvitationSuccess = (body) => {
  return {
    type: constants.ACCEPT_INVITATION_SUCCESS,
    payload: {
      user: body.user,
      invitations: body.invitations,
      characters: body.characters,
      events: body.events,
      invitations: body.invitations,
      league: body.user.league,
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
    return network.invitationRequests('PUT', invitationId, {status: 'accepted'})
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


