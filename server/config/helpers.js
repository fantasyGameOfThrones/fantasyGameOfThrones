var jwt = require('jwt-simple');
var db = require('../../db/dbInterface');

var verifyToken = function(req, res, next) {
  var token = req.headers['x-access-token'];
  var decoded = jwt.decode(token, 'areallybigsecret');
  //reject req if token fails authentication
  if (decoded.iss !== +req.headers['id']) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};

var issueToken = function(id) {
  //TODO: include token expiration
  var token = jwt.encode({iss: id}, 'areallybigsecret');
  return token;
};

var errorLogger = function (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

var errorHandler = function (err, req, res, next) {
  res.sendStatus(500).send({ error: err.message });
};

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
    roster[episode].push([characterId, sum || 0]);
    rows.shift();
    return addEvents(rows, roster, episodeLimit, totalPoints);
  })
  .catch(function(err) {
    console.error('Roster error: ', row, err);
  });
}


module.exports = {
  verifyToken,
  issueToken,
  errorLogger,
  errorHandler,
  makeRoster,
  makeRosters
};