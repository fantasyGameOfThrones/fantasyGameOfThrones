var Sequelize = require('sequelize');

// env variables
var env = process.env.NODE_ENV;
var dbUser = process.env.DB_USER || 'root';
var dbPass = process.env.DB_PASS || null;

// seed data
var seedData = require('../dbData/formattedData.js');

var dbName = process.env.DB_NAME;

var defineModels = require('./models/models');
var createAssociations = require('./associations');

// var shouldLog = env === 'development' || env === 'testing';
var db = new Sequelize(dbName, dbUser, dbPass, {dialect: 'mysql', logging: false});
defineModels(db);
createAssociations(db);

var Character = db.models.character;
var Event = db.models.event;
var League = db.models.league;
var RosterData = db.models.rosterData;
var User = db.models.user;
var Invitation = db.models.invitation;

// if testing, syncing will drop tables
// if not testing, syncing will only add tables that were missing
var shouldForce = (env === 'testing' || env === 'development');

var init = function() {

  return db.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
    return db.sync({force: shouldForce})
    .then(function() {
      return Character.bulkCreate(seedData.characters);
    })
    .then(function() {
      return Event.bulkCreate(seedData.events);
    })
    .then(() => {
      return Invitation.bulkCreate(seedData.invitations);
    })
    .then(function() {
      if (env === 'testing' || env === 'development') {
        return User.bulkCreate(seedData.users)
          .then(function() {
            return League.bulkCreate(seedData.leagues);
          })
          .then(function() {
            // add leagues to users since leagues weren't created yet
            User.update({leagueId: 1}, {where: {id: {'$lte': 4}}});
            User.update({leagueId: 2}, {where: {id: {'$lte': 6, '$gt': 4}}});
            return RosterData.bulkCreate(seedData.rosters);
          });
      }
      return;
    })  
    .catch(function(err) {
      console.error('Error seeding database: ', err);
    });
  });
};

module.exports = {
  db,
  init,
  Character: db.models.character,
  Event: db.models.event,
  League: db.models.league,
  RosterData: db.models.rosterData,
  User: db.models.user,
  Invitation: db.models.invitation,
};
