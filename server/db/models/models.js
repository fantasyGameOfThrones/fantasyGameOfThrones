var defineCharacter = require('./character.js');
var defineEvent = require('./event.js');
var defineLeague = require('./league.js');
var defineRosterData = require('./rosterData.js');
var defineUser = require('./user.js');

module.exports = function(db) {
  defineCharacter(db);
  defineEvent(db);
  defineLeague(db);
  defineRosterData(db);
  defineUser(db);
};