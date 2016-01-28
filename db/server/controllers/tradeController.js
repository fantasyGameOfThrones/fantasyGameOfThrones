var db = require('../../dbInterface');
var helpers = require('../helpers.js');
var RosterData = db.RosterData;

var update = function (req, res) {
  // assuming passing in currentEpisode through request
  var character = req.body.addCharId;
  var nextEpisode = req.body.currentEpisode + 1;
  console.log('char and nextep: ', character, nextEpisode);
  return RosterData.create({
    episode: nextEpisode,
    userId: req.headers.id,
    characterId: character
  }).then(function () {
    console.log('created rosterdata');
    return User.findOne({
      where: { id : userId }
    })
    .then(function (user) {
      console.log('got user: ', user.id);
      return helpers.makeRoster(user);
    })
    .then(function (roster) {
      console.log('got to roster: ', roster);
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