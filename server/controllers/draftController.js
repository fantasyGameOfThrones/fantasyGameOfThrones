var db = require('../../db/dbInterface');
var League = db.League;
var RosterData = db.RosterData;
var User = db.User;
var helpers = require('../config/helpers');
var formatLeagueDataForDraft = helpers.formatLeagueDataForDraft;
var formatDraftData = helpers.formatDraftData;

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
  var draftData = req.body;
  // turn draftData into array of objects
  var rosterDataObjects = formatDraftData(draftData);
  console.log(rosterDataObjects);
  return RosterData.bulkCreate(rosterDataObjects)
  .then(function(resp) {
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

// submitDraft({
//   body: {
//     league: {
//       leagueId: 1,
//       users: [
//         {
//           id: 1,
//           characters: [43, 44, 45],
//         },
//         {
//           id: 2,
//           characters: [46, 47, 48],
//         }
//       ]
//     }
//   }
// });







