'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/appReducer';
import thunk from 'redux-thunk';
import DevTools from './../components/DevTools'



const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  let store;
  
  store = finalCreateStore(reducer, initialState);

  if(module.hot){
    module.hot.accept('../reducers/appReducer', ()=>{
      store.replaceReducer(require('../reducers/appReducer'))
    });
  }

  if (process.env.NODE_ENV === 'devtools'){
    return store;
  } else {
    store = applyMiddleware(thunk)(createStore)(reducer);
    store.subscribe(()=>{
        console.log(store.getState()); 
    });
    return store;
  }
};