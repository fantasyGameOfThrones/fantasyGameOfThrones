var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

var authRouter = require('../routers/authRouter.js');
var userRouter = require('../routers/userRouter.js')
var leagueRouter = require('../routers/leagueRouter.js')
var characterRouter = require('../routers/characterRouter.js')
var eventRouter = require('../routers/eventRouter.js')

module.exports = function (app) {
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../dist'));

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.use('/api/users', userRouter);
  app.use('/api/leagues', leagueRouter);
  app.use('/api/characters', characterRouter);
  app.use('/api/events', eventRouter);
  app.use('/api/auth', authRouter);
};