import network from '../network.jsx';
import * as constants from '../actionConstants.jsx'

export const updateUser = (userID, updateData) => {
  return (dispatch) => {
    network.userRequests('PUT', userID, updateData)
      .then((response) => {
        if(!response.ok){ throw new Error('Update user failed: ', response)}
        return response.json()  
      })
      .then((json) => {
        dispatch({type: constants.UPDATE_USER_SUCCESS,payload:json});
      })
      .catch((error) => dispatch({type: constants.UPDATE_USER_FAILURE,payload: error}));
  }
};

export const deleteUser = (userID) => {
  return (dispatch) => {
    network.userRequests('DELETE', userID)
      .then((response) => {
        if(!response.ok){throw response.statusText}
        return response.json() 
      })
      .then((json)=>{
        dispatch({type: constants.DELETE_USER,payload:json})
      })
      .catch((err) => console.log(err))
  }
};