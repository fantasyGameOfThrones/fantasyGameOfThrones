var db = require('../../db/dbInterface');
var League = db.League;
var RosterData = db.RosterData;
var User = db.User;
var formatLeagueDataForDraft = require('../config/helpers').formatLeagueDataForDraft;

var startDraft = function (req, res) {
  var id = req.params.leagueId;

  return League.findOne({
    where: {id},
    include: [{
      model: User,
      attributes: {
        include: ['id']
      }
    }]
  })
  .then(function(league) {
    var data = formatLeagueDataForDraft(league);
    console.log('data: ', data);
    res.status(200).json(data);
  })
  .catch(function(err) {
    console.error('Error retrieving league for draft: ', err);
    res.status(500).send('Server error retrieving league for draft');
  })
};

var submitDraft = function(req, res) {
  var id = req.params.leagueId;
  var draftData = req.body;
  // turn draftData into array of objects
  var rosterDataObjects = formatLeagueDataForDraft(draftData);
  return RosterData.bulkCreate(rosterDataObjects)
  .then(function() {
    // bulkCreate doesn't return anything, which is fine
    res.status(200).send();
  })
  .catch(function(err) {
    console.error('Error submitting draft data: ', err);
    res.status(500).send('Server error submitting draft data');
  });
}

module.exports = {
  startDraft,
  submitDraft,
};

startDraft({params:{leagueId: 1}});