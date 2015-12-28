import network from '../network.jsx';
import * as constants from '../actionConstants.jsx'

export const navigateTo = (tab)  => {
  return {
    type: constants.CHANGE_MAIN_COMPONENT,
    payload: {tab}
  }
};