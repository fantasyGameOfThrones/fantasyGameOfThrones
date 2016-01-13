'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
import configureStore from './services/store.jsx';
import DevTools from './components/DevTools';


let rootElement = document.getElementById('app');


const store = configureStore();

render (
  <Provider store={ store }>
    
      <App >
        {process.env.NODE_ENV === 'devtools' ? <DevTools /> : null}
      </App>
    
  </Provider>,
  rootElement
);