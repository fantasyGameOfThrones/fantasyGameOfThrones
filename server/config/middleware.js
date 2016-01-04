var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

var authRouter = require('../auth/authRoutes.js');
var userRouter = require('../users/userRoutes.js')
var leagueRouter = require('../leagues/leagueRoutes.js')
var characterRouter = require('../characters/characterRoutes.js')
var eventRouter = require('../events/eventRoutes.js')

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