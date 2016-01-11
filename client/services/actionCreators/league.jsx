import network from '../network.jsx';
import * as constants from '../actionConstants.jsx'

const createLeagueSuccess = (body) => {
  return {
    type: constants.CREATE_LEAGUE_SUCCESS,
    payload: {
      league: body
    }
  };
};

const createLeagueFailure = (message) => {
  return {
    type: constants.CREATE_LEAGUE_FAILURE,
    payload: {
      error: message
    }
  };
};

export const createLeague = (name) => {
  return (dispatch) => {
    return network.leagueRequests('POST', null, {name})
    .then((response) => {
      if (!response.ok) {throw new Error('League creation failure: ', response)}
      return response.json();
    })
    .then((body) => {
      return dispatch(createLeagueSuccess(body));
    })
    .catch((error) => {
      return dispatch(createLeagueFailure(error.message));
    });
  }
};
