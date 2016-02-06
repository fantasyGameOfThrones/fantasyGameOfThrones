var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

var authRouter = require('./routers/authRouter.js');
var apiRouter = require('./routers/apiRouter.js');

module.exports = function (app) {
  app.use(helpers.logger);
  app.use(helpers.cors);
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  app.use('/auth', authRouter);
  app.use('/api', apiRouter);
};