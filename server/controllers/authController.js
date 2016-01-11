var db = require('../../db/dbInterface');
var User = db.User;
var League = db.League;
var helpers = require('../config/helpers');
var issueToken = helpers.issueToken;
var makeRoster = helpers.makeRoster;
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));

module.exports = {
  signup: function (req, res, next) {

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
  },

  login: function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    // eagerly load our league model and leaguemates
    User.findOne({where: {username}/*, include: [{model: League, include: [User]}]*/})
    .then(function(user) {
      if (!user.comparePassword(password)) {
        res.status(401).send('Invalid password');
      } else {
        user.roster = makeRoster(user.id);
        res.status(200).json({
          token: issueToken(username),
          user,
          characters: [],
          events: [],
        });
      }
    })
    .catch(function(err) {
      console.error('Error logging in user: ', err);
      res.status(500).send('Server error logging in user');
    });

    // db.loginUser({ username: user.username })
    //   .then(function (results) {
    //     if (results.length === 0) {
    //       // username is incorrect/not found
    //       res.status(200).json('User not found');
    //     } else {
    //       // decrypt password
    //       bcrypt.compare(user.password, results[0].password, function (err, result) {
    //         if (result) {
    //           // passwords match
    //           var token = jwt.encode(user.username, 'secret'); // PLACE SECRET IN AUTH FILE
    //           // query league table with league_id
    //           // query roster_data with user_id
    //             // then populate roster array with charIds and points in a tuple
    //           leagueDB.getLeagueInfo({ league_id: results[0].league_id }) // CHANGE THIS to USERS LEAGUE_ID
    //             .then(function (leagueArr) {
    //               // get users roster
    //               helperDB.getCharIdAndPoints({ leagueId: results[0].league_id })
    //                 .then(function (roster) {

    //                   var formattedRoster = addRosterToObjectArray(roster, leagueArr);

    //                   helperDB.getCharactersAndEvents({ user_id: results[0].user_id })
    //                     .then(function (charAndEventInfo) {
                          
    //                       res.json({
    //                         user : formattedRoster.filter(function (item) {
    //                           return item.username === user.username;
    //                         })[0],
    //                         league: {
    //                           // id:
    //                           // name:
    //                           // creatorId:
    //                           members: formattedRoster.filter(function (item) {
    //                             return user.username !== item.username;
    //                           })
    //                         },
    //                         characters: removeDups(charAndEventInfo.map(function (obj) {
    //                           return {
    //                             name: obj.name,
    //                             house: obj.house,
    //                             image: obj.image
    //                           };
    //                         })),
    //                         events: charAndEventInfo.map(function (obj) {
    //                           return {
    //                             id: obj.event_id,
    //                             type: obj.type,
    //                             description: obj.description,
    //                             episodeId: obj.episode,
    //                             points: obj.points
    //                           };
    //                         }),
    //                         token: token
    //                       });
    //                     });
    //                 });
    //             });
    //         } else {
    //           // passwords do not match
    //           res.json({
    //             token: false
    //           });
    //         }
    //       });
    //     }
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //     res.status(500).json('Server error');
    //   });
  }
};

/* HELPER FUNCTIONS FOR AUTH CONTROLLER
*/
//This function takes the requested roster table (league's entire roster) + league info
// and pushes new objects with a roster parameter to a result array
// the new parameter is an array of each persons roster (charid + points)
var addRosterToObjectArray = function (roster, league) {
  var results = [];
  var curUser;
  var obj;
  // iterate through league table, create new objects with rosters for each user
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
    // Build Roster Object: Keys are episodes
    // Each key is an array of tuples
    // Tuples are [char_id, charPointsFromEpisode]
    roster.forEach(function (item) {
      // as long as usernames match, add to character roster
      if (user.username === item.username) {
        obj.roster[item.episode] = obj.roster[item.episode] || [];
        obj.roster[item.episode].push([item.char_id, item.points]);
      }

    });

    results.push(obj);

  });

  return results;
};

// Helper Function to remove duplicates from character array
var removeDups = function (arr) {
  var hash = {};
  var result = [];
  arr.forEach(function (item) {
    if (!hash[item.name]) {
      hash[item.name] = true;
      result.push(item);
    } 
  });
  
  return result;
};
