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

const declineInvitationSuccess = (body) => {
  return {
    type: constants.DECLINE_INVITATION_SUCCESS,
    payload: {
      invitations: body.invitations,
    }
  }
}

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

export const declineInvitation = (invitationId) => {
  return (dispatch) => {
    return network.invitationRequests('PUT', invitationId, {status: 'declined'})
    .then((response) => {
      if (!response.ok) {throw new Error('Signup failure: ', response)}
      return response.json();
    })
    .then((body) => {
      return dispatch(declineInvitationSuccess(body));
    })
    .catch((error) => {
      return dispatch(declineInvitationFailure(error.message));
    });
  }
};

