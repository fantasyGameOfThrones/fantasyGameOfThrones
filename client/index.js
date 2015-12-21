'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
import store from './services/store.jsx';
//remove in production
import DevTools from './components/DevTools.jsx';


console.log(store);
let rootElement = document.getElementById('app');

render (
  <Provider store={ store }>
    <App>
      <DevTools/>
    </App>
  </Provider>,
  rootElement
);