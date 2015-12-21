'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/appReducer';
import thunk from 'redux-thunk';
import DevTools from '../components/DevTools.jsx';
import { persistState } from 'redux-devtools';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);


function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
};

function configureStore(initialState) {
  const store = finalCreateStore(createStore)(reducer, initialState);
  if(module.hot) {
    module.hot.accept('../reducers/appReducer', () =>
      store.replaceReducer(require('../reducers/appReducer'))
    );
  }
  return store;
};

export default configureStore();




// let store = applyMiddleware( thunk )( createStore )( reducer );

// store.subscribe(() => {
//   console.log('current state:', store.getState());
// });

// module.exports = store;