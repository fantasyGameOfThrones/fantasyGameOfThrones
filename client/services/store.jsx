import { createStore } from 'redux';
import reducer from '../reducers/appReducer';

module.exports = {
  store: createStore( reducer )
};