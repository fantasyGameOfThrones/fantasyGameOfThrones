import network from '../network.jsx';
import * as actions from '../actionConstants.jsx'

export const updateUser = (userID, updateData) => {
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

export const deleteUser = (userID) => {
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