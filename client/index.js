'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app.jsx';
import reducer from './reducers/appReducer';

var store = createStore( reducer );

var rootElement = document.getElementById('app');

render (
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)