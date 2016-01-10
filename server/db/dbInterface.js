var sequelize = require('sequelize');

var dbEnv = process.env.NODE_ENV;
// get testdata

var shouldForce = false;

var url
if (dbEnv === 'development' || dbEnv === 'testing') {
  url = `mysql://localhost:3306/got`;
} else {
  url = process.env.DATABASE_URL;
}

var schema = 'got';

var defineModels = require('./models/models');
var createAssociations = require('./associations');

var db = new Sequelize(url, {});
defineModels(db);
createAssociations(db);

if (dbEnv = 'testing') { shouldForce = true; }

var init = function() {
  return db.sync({force: shouldForce})
    .then(function() {
      if (dbEnv === 'development') {
        // seed data
      }
    });
};

module.exports = {
  db,
  Character: db.models.user,
  Event: db.models.event,
  League: db.models.league,
  RosterData: db.models.rosterData,
  User: db.models.user,
};
