'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
import store from './services/store.jsx';

let rootElement = document.getElementById('app');

render (
  <Provider store={ store }>
    <App />
  </Provider>,
  rootElement
)