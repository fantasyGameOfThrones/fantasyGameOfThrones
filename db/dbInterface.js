var Sequelize = require('sequelize');

// env variables
var dbEnv = process.env.NODE_ENV;
var dbUser = process.env.DB_USER || 'root';
var dbPass = process.env.DB_PASS || null;

// seed data
var seedData = require('./testData/formattedData');


var url
if (dbEnv === 'development' || dbEnv === 'testing') {
  url = 'got';
} else {
  url = process.env.DATABASE_URL;
}


var defineModels = require('./models/models');
var createAssociations = require('./associations');

var db = new Sequelize(url, dbUser, dbPass, {dialect: 'mysql', logging: false});
defineModels(db);
createAssociations(db);

var Character = db.models.character;
var Event = db.models.event;
var League = db.models.league;
var RosterData = db.models.rosterData;
var User = db.models.user;

// if testing, syncing will drop tables
// if not testing, syncing will only add tables that were missing
var shouldForce = (dbEnv === 'testing' || dbEnv === 'development');

var init = function() {
  return db.sync({force: shouldForce})
    .then(function() {
      return Character.bulkCreate(seedData.characters);
    })
    .then(function() {
      return Event.bulkCreate(seedData.events);
    })
    .then(function() {
      if (dbEnv === 'testing' || dbEnv === 'development') {
        return User.bulkCreate(seedData.users)
          .then(function() {
            return League.bulkCreate(seedData.leagues);
          })
          .then(function() {
            // add leagues to users since leagues weren't created yet
            User.update({leagueId: 1}, {where: {id: 1}});
            User.update({leagueId: 1}, {where: {id: 2}});
            User.update({leagueId: 1}, {where: {id: 3}});
            User.update({leagueId: 1}, {where: {id: 4}});
            User.update({leagueId: 2}, {where: {id: 5}});
            User.update({leagueId: 2}, {where: {id: 6}});
            return RosterData.bulkCreate(seedData.rosters);
          });
      }
      return;
    })  
    .catch(function(err) {
      console.error('Error seeding database: ', err);
    });
};

module.exports = {
  db,
  init,
  Character: db.models.user,
  Event: db.models.event,
  League: db.models.league,
  RosterData: db.models.rosterData,
  User: db.models.user,
};
