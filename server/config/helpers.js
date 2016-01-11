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

var makeRoster = function(id) {
  return {
    1: [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6]],
    2: [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6]],
    3: [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6]],
    4: [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6]],
  };
  // return db.RosterData.findAll({where: {userId: id}})
  // .then(function(rows) {
  //   console.log('rows: ', rows);
  // })
  // .catch(function(err) {
  //   console.error('Error making roster: ', err);
  //   return err;
  // });
};


module.exports = {
  verifyToken,
  issueToken,
  errorLogger,
  errorHandler,
  makeRoster
};