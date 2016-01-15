var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

var authRouter = require('./routers/authRouter.js');
var apiRouter = require('./routers/apiRouter.js');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist'));

  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

  app.use('/auth', authRouter);
  app.use('/api', apiRouter);

};