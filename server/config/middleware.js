var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

var authRouter = require('../routers/authRouter.js');
var apiRouter = require('../routers/apiRouter.js');

module.exports = function (app) {
  app.use(helpers.cors);
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist'));

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // for auth, issue token once we have the user model
  // for all else, verify token before hitting the db
  app.use('/auth', authRouter, helpers.issueToken);
  app.use('/api', helpers.verifyToken, apiRouter);
};