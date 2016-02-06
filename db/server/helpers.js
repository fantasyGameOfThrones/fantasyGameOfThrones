var db = require('../dbInterface');

var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-Access-Token, X-Requested-With, Content-Type, Accept, id");

  if (req.method === 'OPTIONS') { res.send(200); }
  next();
};

var logger = (req, res, next) => {
  console.log('Serving ', req.method, ' request to ', req.url);
  next();
}

// makeRosters can handle making rosters for multiple users
// It does this by calling addRosters, which calls makeRoster for each user
var makeRosters = function(users, episodeLimit) {
  var usersCopy = Array.prototype.slice.call(users);
  return addRosters(usersCopy, {}, episodeLimit)
  .catch(function(err) {
    console.error('Error making rosters for users: ', err);
  });
};

// makeRoster creates a roster for a single user by calling addEvents
// and returning a promise
var makeRoster = function(user, episodeLimit) {
  var roster = {};

  // if episodeLimit was passed in, this is being called within makeRosters
  // so the user model doesn't have a league attached
  // and we're passing the limit in
  // if episodeLimit was not passed in, we must calculate it ourselves
  if (!episodeLimit) {
    episodeLimit = user.dataValues.league ? user.dataValues.league.latestSeen : -1;
  }

  return db.RosterData.findAll({where: {userId: user.dataValues.id}})
  .then(function(rows) {
    // call recursion without episodes to return empty roster
    // so that we still return a promise even when the user has no league
    return addEvents(rows, roster, episodeLimit, 0);
  })
  .catch(function(err) {
    console.error('Error making roster: ', err);
    return err;
  });
};

function addRosters(users, rosters, episodeLimit) {
  if (users.length === 0) {
    return rosters;
  }

  var user = users[0];
  var id = user.dataValues.id;
  return makeRoster(user, episodeLimit)
  .then(function(roster) {
    rosters[id] = roster;
    users.shift();
    return addRosters(users, rosters, episodeLimit);
  })
  .catch(function(err) {
    console.error('Error making roster for user: ', err);
  });
};

// populates roster with character and event data
function addEvents(rows, roster, episodeLimit, totalPoints) {
  // base case
  if (rows.length === 0) {
    roster.points = totalPoints;
    return roster;
  }

  var row = rows[0];
  var episode = +row.dataValues.episode;
  var characterId = row.dataValues.characterId;
  var droppedFor = row.dataValues.droppedFor;
  var updatedAt = row.dataValues.updatedAt;
  // if league hasn't seen episode yet, recurse without adding
  if (episode > episodeLimit) {
    rows.shift();
    return addEvents(rows, roster, episodeLimit, totalPoints);
  }
  // initialize episode bucket
  roster[episode] = roster[episode] || [];
  // find points, add to roster, and recurse
  return db.Event.sum('points', {where: {characterId, episode}})
  .then(function(sum) {
    totalPoints += (sum || 0);
    roster[episode].push([characterId, sum || 0, droppedFor, updatedAt]);
    rows.shift();
    return addEvents(rows, roster, episodeLimit, totalPoints);
  })
  .catch(function(err) {
    console.error('Roster error: ', row, err);
  });
};

var formatLeagueDataForDraft = function(league) {
  // TODO: we shouldn't allow leagues to draft if there's only one member
  var result = {
    leagueId: league.dataValues.id,
    users: [],
  };

  league.users.forEach(function(user) {
    result.users.push({
      id: user.dataValues.id,
      // TODO: how should we send this if team is between seasons? do they
      // have to redraft?
      characters: [],
    });
  });

  return result;
};

var formatDraftData = function(draftData) {
  var rosterDataObjects = [];
  draftData.league.users.forEach(function(user) {
    user.characters.forEach(function(character) {
      rosterDataObjects.push({
        userId: user.id,
        characterId: character,
        // TODO: MAKE THIS WORK FOR LATER SEASONS
        episode: 1,
      });
    });
  });
  return rosterDataObjects;
};

module.exports = {
  makeRoster,
  makeRosters,
  cors,
  formatLeagueDataForDraft,
  formatDraftData,
  logger,
};

