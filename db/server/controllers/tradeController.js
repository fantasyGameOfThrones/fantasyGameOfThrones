var db = require('../../dbInterface');
var helpers = require('../helpers.js');
var RosterData = db.RosterData;

var update = function (req, res) {
  // assuming passing in currentEpisode through request
  var character = req.body.newCharId;
  var nextEpisode = req.body.currentEpisode + 1;

  return RosterData.create({
    episode: nextEpisode,
    userId: req.headers.id,
    characterId: character
  }).then(function () {
    return User.findOne({
      where: { id : req.headers.id }
    })
    .then(function (user) {
      return helpers.makeRoster(user);
    })
    .then(function (roster) {
      res.status(200).json(roster);
    })
  })
  .catch(function (err) {
    res.status(500).send("Error trading characters: ", err);
  });
};

module.exports = {
  update
};