'use strict';

import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/appReducer';
import thunk from 'redux-thunk';

let store = applyMiddleware( thunk )( createStore )( reducer );

// store.subscribe(() => {
//   console.log('current state:', store.getState());
// });

module.exports = store;