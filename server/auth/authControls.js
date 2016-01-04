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
                  helperDB.getCharIdAndPoints({ userId: results[0].user_id })
                    .then(function (roster) {
                      res.json({
                        user : {
                          username: user.username,
                          id: user.user_id,
                          // email: user.email,
                          leagueId: user.league_id,
                          roster: roster
                        },
                        league: {
                          // id:
                          // name:
                          // creatorId:
                          members: leagueArr

                          // members: [
                          //   {
                          //     username:
                          //     id:
                          //     //email:
                          //     leagueId:
                          //     roster: roster
                          //   }
                          // ]
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