'use strict';

var makeParams = function(method, body) {

  var params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  if (Store.getState().token) {
    //attach the token if given
    params.headers['X-Access-Token'] = Store.getState().token;
  }

  return params;

};