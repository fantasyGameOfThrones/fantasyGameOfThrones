var db = require('../../dbInterface');
var User = db.User;
var League = db.League;
var Character = db.Character;
var Event = db.Event;
var helpers = require('../helpers.js');
var makeRoster = helpers.makeRoster;
var makeRosters = helpers.makeRosters;

var signup = function (req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  //check if user already exists
  User.findOne({where: {username}})
  .then(function(user) {
    if (user) {
      res.status(409).send('User already exists.');
    } else {
      return User.create({username, password, email})
    }
  })
  .then(function(user) {
    return makeRoster(user)
    .then(function(roster) {
      return Character.findAll()
      .then(function(characters) {
        return Event.findAll()
        .then(function(events) {
          user.dataValues.roster = roster;
          // TODO: make this work by excluding password instead of deleting
          delete user.dataValues.password;
          res.status(200).json({
            user,
            characters,
            events,
          });
        });
      });
    });
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Server error signing up user');
  });
};

var login = function (req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  // eagerly load our league model and leaguemates
  User.findOne({
    where: {username},
    include: [{
      model: League,
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        }
      }]
    }],
    // TODO: why does this break things?
    // attributes: {
    //   exclude: ['password']
    // }
  })
  .then(function(user) {
    if (!user.comparePassword(password)) {
      res.status(401).send('Invalid password');
    } else {
      // TODO: also add rosters for leaguemates
      return makeRoster(user)
      .then(function(roster) {
        return Character.findAll()
        .then(function(characters) {
          return Event.findAll()
          .then(function(events) {
            user.dataValues.roster = roster;
            // TODO: make this work by excluding password instead of deleting
            delete user.dataValues.password;
            if (!user.dataValues.league) {
              res.status(200).json({
                user,
                characters,
                events,
              });
            } else {
            return makeRosters(user.dataValues.league.users, user.dataValues.league.latestSeen)
              .then(function(rosters) {
                //assign all rosters to the appropriate user model
                user.dataValues.league.users.forEach(function(leagueUser) {
                  var id = leagueUser.dataValues.id;
                  leagueUser.dataValues.roster = rosters[id];
                });
                res.status(200).json({
                  user,
                  characters,
                  events,
                });
              })
            }
          })
        })
      });
    }
  })
  .catch(function(err) {
    console.error('Error logging in user: ', err);
    res.status(500).send('Server error logging in user');
  });
};

module.exports = {signup, login};