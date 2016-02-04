var createAssociations = function(db) {
  var User = db.models.user;
  var Character = db.models.character;
  var Event = db.models.event;
  var League = db.models.league;
  var RosterData = db.models.rosterData;
  var Invitation = db.models.invitation;

  // Associate many events to one character
  Event.belongsTo(Character);
  Character.hasMany(Event);

  // Associate one user as moderator to one league
  League.belongsTo(User, {as: 'moderator', constraints: false});

  // Associate many users to one league
  User.belongsTo(League, {constraints: false});
  League.hasMany(User, {constraints: false});

  // Associate many invitations to one league
  Invitation.belongsTo(League, {constraints: false});
  Invitation.belongsTo(User, {as: 'moderator', constraints: false});

};

module.exports = createAssociations;