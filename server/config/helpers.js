var jwt = require('jwt-simple');
var db = require('../../db/dbInterface');

var verifyToken = function(req, res, next) {
  var token = req.getHeader('X-Access-Token');
  var decoded = jwt.decode(token, 'areallybigsecret');
  //reject req if token fails authentication
  if (decoded.iss !== req.getHeader('username')) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};

var issueToken = function(username) {
  //TODO: include token expiration
  var token = jwt.encode({iss: username}, 'areallybigsecret');
  return token;
};

var errorLogger = function (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

var errorHandler = function (err, req, res, next) {
  res.sendStatus(500).send({ error: err.message });
};

var makeRoster = function(user) {
  var roster = {};
  return db.RosterData.findAll({where: {userId: user.dataValues.id}})
  .then(function(rows) {
    // call recursion without episodes to return empty roster
    // so that we still return a promise even when the user has no league
    var episodeLimit = user.dataValues.league ? user.dataValues.league.latestSeen : -1;
    return addEvents(rows, roster, episodeLimit);
  })
  .catch(function(err) {
    console.error('Error making roster: ', err);
    return err;
  });
};

// returns a promise
function addEvents(rows, roster, episodeLimit) {
  // base case
  if (rows.length === 0) {
    return roster;
  }

  var row = rows[0];
  var episode = +row.dataValues.episode;
  var characterId = row.dataValues.characterId;
  // if league hasn't seen episode yet, recurse without adding
  if (episode > episodeLimit) {
    rows.shift();
    return addEvents(rows, roster, episodeLimit);
  }
  // initialize episode bucket
  roster[episode] = roster[episode] || [];
  // find points, add to roster, and recurse
  return db.Event.sum('points', {where: {characterId, episode}})
  .then(function(sum) {
    roster[episode].push([characterId, sum || 0]);
    rows.shift();
    return addEvents(rows, roster, episodeLimit);
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
  makeRoster
};