var db = require('../../db/dbInterface');
var User = db.User;
var League = db.League;
var Character = db.Character;
var Event = db.Event;
var helpers = require('../config/helpers');
var issueToken = helpers.issueToken;
var makeRoster = helpers.makeRoster;
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));

var signup =function (req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  //check if user already exists
  User.findOne({where: {username}})
  .then(function(user) {
    if (user) {
      res.status(409).send('User already exists.');
    } else {
      return User.create({username, password: hash, email});
    }
  })
  .then(function(user) {
    delete user.password;
    var token = issueToken(user.username);
    res.status(200).json({user, token});
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
    }]
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
          console.log('characters: ', characters);
          return Event.findAll()
          .then(function(events) {
            res.status(200).json({
              token: issueToken(username),
              user,
              roster,
              characters,
              events,
            });
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
