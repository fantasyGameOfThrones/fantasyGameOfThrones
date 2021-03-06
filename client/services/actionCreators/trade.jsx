import network from '../network.jsx';
import * as constants from '../actionConstants.jsx';
import store from '../store.jsx';

export const changeTradeChar = (charId, type) => {
  let key = type === 'ADD' ? 'addCharId' : 'dropCharId';
  let payload = {};
  payload[key] = charId;

  return {
    type: `CHANGE_CHAR_TO_${type}`,
    payload: payload
  };
}

export const initiateTrade = (characters, currentEpisode) => {
  characters.currentEpisode = currentEpisode;
  return (dispatch) => {
    console.log('characters: ', characters);
    return network.trade(characters)
    .then((response) => {
      if (!response.ok) { throw new Error('Error initiating trade: ', response); }
      return response.json();
    })
    .then((resp) => {
      console.log('res: ', resp);
      dispatch({
        type: 'ROSTER_UPDATED',
        payload: resp
      })
    })
    .catch((err) => {
      console.log("Error in trade initiation: ", err.message);
    });
  }
  
};