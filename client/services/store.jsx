import { createStore } from 'redux';
import reducer from '../reducers/appReducer';

var store = createStore( reducer );

module.exports = store;