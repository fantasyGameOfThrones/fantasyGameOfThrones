var jwt = require('jwt-simple');

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

var issueToken = function(req, res, next) {
  var id = res.body.user.id;

  //TODO: include token expiration
  var token = jwt.encode({iss: id}, 'areallybigsecret');
  res.body.token = token;
  res.status(200).json(res.body);
};

var errorLogger = function (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

var errorHandler = function (err, req, res, next) {
  res.sendStatus(500).send({ error: err.message });
};

module.exports = {
  verifyToken,
  issueToken,
  errorLogger,
  errorHandler,
};