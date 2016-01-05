var jwt = require('jwt-simple');
var db = require('../db/authDB.js');
var leagueDB = require('../db/leagueDB');
var helperDB = require('../db/helpersDB.js')
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  // function: signUp -> Checks to see if username exists already
  // If not, store in DB
  // Returns: A json object with a jwt token 
  // Returns { token : false } if user exists already
  signup: function (req, res, next) {

    var user = req.body;

    db.loginUser({ username: user.username })
      .then(function (results) {
        if (results.length === 0) {
          // store user in DB after hashing password
          bcrypt.hash(user.password, null, null, function (err, hash) {

            user.password = hash;

            db.addNewUser(user)
              .then(function (storedUser) {

                console.log('User Stored: ', storedUser); 

                var token = jwt.encode(user.username, 'secret'); // PLACE SECRET IN AUTH FILE

                res.json({
                  user : {
                    username: user.username
                  },
                  token: token
                });
              });
          });
        } else {
          // username already exists
          res.json({
            token: false
          });
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  },

  // Function: login -> looks for username
  // if found, verifies password
  login: function (req, res, next) {

    var user = req.body;

    db.loginUser({ username: user.username })
      .then(function (results) {
        if (results.length === 0) {
          // username is incorrect/not found
          res.sendStatus(404);
        } else {
          // decrypt password
          bcrypt.compare(user.password, results[0].password, function (err, result) {
            if (result) {
              // passwords match
              var token = jwt.encode(user.username, 'secret'); // PLACE SECRET IN AUTH FILE
              // query league table with league_id
              // query roster_data with user_id
                // then populate roster array with charIds and points in a tuple
              leagueDB.getLeagueInfo({ name: 'johnsnow' })
                .then(function (leagueArr) {
                  // get users roster
                  helperDB.getCharIdAndPoints({ leagueId: results[0].league_id })
                    .then(function (roster) {

                      var formattedRoster = addRosterToObjectArray(roster, leagueArr);

                      res.json({
                        user : formattedRoster.filter(function (item) {
                          return item.username === user.username;
                        })[0],
                        league: {
                          // id:
                          // name:
                          // creatorId:
                          members: formattedRoster.filter(function (item) {
                            return user.username !== item.username;
                          })
                        },
                        characters: [
                          // {
                          //   name:
                          //   house:
                          //   image: 
                          // }
                        ],
                        events: [
                          // {
                          //   id: ,
                          //   type: , 
                          //   description: ,
                          //   episodeId: ,//fk of episode
                          //   points:
                          // }
                        ],
                        token: token
                      });
                    });
                });
            } else {
              // passwords do not match
              res.json({
                token: false
              });
            }
          });
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  },

  // Test function as of now to test User query
  placeholder: function (req, res, next) {
    db.findUser({ username: req.body.username })
      .then(function (results) {
        console.log('results: ', results);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
};
//This function takes the requested roster table + league info
// and pushes new objects with a roster parameter to a result array
// the new parameter is an array of each persons roster (charid + points)
var addRosterToObjectArray = function (roster, league) {
  var results = [];
  var curUser;
  var obj;

  league.forEach(function (user) {

    if (curUser !== user.user_id) {

      curUser = user.user_id;
      obj = {};

    }

    for (var key in user) {

      if (key === 'user_id') {
        obj.id = user[key];
      } else {
        obj[key] = user[key];
      }
    }

    obj.roster = {};

    roster.forEach(function (item) {

      if (user.username === item.username) {
        obj.roster[item.episode] = obj.roster[item.episode] || [];
        obj.roster[item.episode].push([item.char_id, item.points]);
      }

    });

    results.push(obj);

  });

  return results;
};