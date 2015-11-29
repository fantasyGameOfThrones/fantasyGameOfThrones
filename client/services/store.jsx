'use strict';

import reducer from '../reducers/appReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

var store = applyMiddleware( thunk )( createStore )( reducer );

store.subscribe(() => {
  console.log('current state:', store.getState());
});

module.exports = store;