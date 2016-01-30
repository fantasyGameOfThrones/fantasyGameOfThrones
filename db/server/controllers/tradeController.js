var db = require('../../dbInterface');
var helpers = require('../helpers.js');
var RosterData = db.RosterData;
var User = db.User;

var update = function (req, res) {
  // assuming passing in currentEpisode through request
  var character = req.body.addCharId;
  var nextEpisode = req.body.currentEpisode + 1;
  var dropChar = req.body.dropCharId;
  console.log('char, dropChar, and nextep and userId: ', character, dropChar, nextEpisode, req.headers.id);
  return RosterData.create({
    episode: nextEpisode,
    userId: req.headers.id,
    characterId: character
  }).then(function () {
      console.log('created rosterdata');
      return RosterData.findOne({
        where: { 
          characterId: req.body.dropCharId,
          userId: req.headers.id,
          episode: nextEpisode 
        }
      })
      .then(function (dropChar) {
        console.log(' in drop mode: ', dropChar);
        return dropChar.destroy();
      })
      .then(function () {
        return User.findOne({
          where: { id : req.headers.id }
        })
        .then(function (user) {
          console.log('got user: ', user);
          return helpers.makeRoster(user, nextEpisode);
        })
        .then(function (roster) {
          console.log('got to roster: ', roster);
          res.status(200).json(roster);
        })
      })
    })
    .catch(function (err) {
      res.status(500).send("Error trading characters: ", err);
    });
};

module.exports = {
  update
};