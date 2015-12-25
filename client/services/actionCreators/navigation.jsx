import network from '../network.jsx';
import * as actions from '../actionConstants.jsx'

export const navigateTo = (tab)  => {
  return {
    type: actions.CHANGE_MAIN_COMPONENT,
    payload: {tab}
  }
};