import network from '../network.jsx';
import * as constants from '../actionConstants.jsx';
import store from '../store.jsx';

export const changeTradeChar = (charId, type) => {
  let key = type === 'ADD' ? 'addCharId' : 'dropCharId';
  let payload = {};
  payload[key] = charId;

  console.log('da payload: ', payload);

  return {
    type: `CHANGE_CHAR_TO_${type}`,
    payload: payload
  };
}

export const initiateTrade = (characters) => {
  return (dispatch) => {
    // const params = makeParams('POST', characters);
    console.log('characters: ', characters);
    return network.trade(characters)
    .then((response) => {
      if (!response.ok) {console.log('onooooo');}
      console.log('got into response');
      return response.json();
    })
    .then((resp) => {
      console.log('we here2')
      console.log('res: ', resp);
    });

  }
  
};