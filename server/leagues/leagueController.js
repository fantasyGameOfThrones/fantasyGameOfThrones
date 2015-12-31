// Any function we use with League Routing goes here
var db = require('../db/leagueDB.js');

module.exports = {
  // When you create a new league, you are adding a moderator at same time
  // League Name and Username must be sent over
  create: function (req, res, next) {
    var league = req.body;

    db.addLeague(league)
      .then(function (results) {
        // update user with league_id, isMod = true
        console.log("league stored: ", results);
        res.json({
          league: {
            name: league.name
          }
        });
        // send json back? res.json({completed : true})
      })
      .catch(function (err) {
        console.error("error in league storage: ", err);
      });
  },

  update: function (req, res, next) {

    var league = req.body;

    db.updateLeague(league)
      .then(function (results) {
        console.log("league updated: ", results);
        res.json({
          completed: true
        });
      })
      .catch(function (err) {
        console.error("error in league update: ", err);
      });
  },

  retrieve: function (req, res, next) {
    var leagueName = req.params;
    db.getLeagueInfo(leagueName)
      .then(function (leagueInfo) {
        console.log("League Info: ", leagueInfo);
        res.json({
          //an array of users in league
          league: leagueInfo
        });
      });
  }
};