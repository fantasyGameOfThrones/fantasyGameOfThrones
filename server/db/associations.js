var createAssociations = function(db) {
  var User = db.models.user;
  var Character = db.models.character;
  var Event = db.models.event;
  var League = db.models.league;
  var RosterData = db.models.rosterData;

  // Associate many events to one character
  Event.belongsTo(Character);
  Character.hasMany(Event);

  // Associate one user to one league
  League.belongsTo(User, {as: 'moderator'});

  // Associate many users to one league
  User.belongsTo(League);
  League.hasMany(User);

  // Associate many users to many characters
  User.belongsToMany(Character, {through: RosterData});
  Character.belongsToMany(User, {through: RosterData});

};

module.exports = createAssociations;