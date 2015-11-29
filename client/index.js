'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
import store from './services/store.jsx';

var rootElement = document.getElementById('app');

render (
  <Provider store={ store }>
    <App />
  </Provider>,
  rootElement
)