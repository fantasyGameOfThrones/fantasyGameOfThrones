var sequelize = require('sequelize');

var dbEnv = process.env.NODE_ENV;
// get testdata


var url
if (dbEnv === 'development' || dbEnv === 'testing') {
  url = 'mysql://localhost:3306/got';
} else {
  url = process.env.DATABASE_URL;
}

var schema = 'got';

var defineModels = require('./models/models');
var createAssociations = require('./associations');

var db = new sequelize(url, {});
defineModels(db);
createAssociations(db);

// if testing, syncing will drop tables
// if not testing, syncing will only add tables that were missing
var shouldForce = dbEnv === 'testing';

var init = function() {
  return db.sync({force: shouldForce})
    .then(function() {
      //seed character and event data
      if (dbEnv === 'development') {
        // seed user and league and roster data
      }
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
