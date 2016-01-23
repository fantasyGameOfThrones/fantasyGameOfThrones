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

var cors = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    console.log('Got OPTIONS request');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", false);
    res.header("Access-Control-Max-Age", '86400'); // 24 hour)s
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, X-Access-Token, Content-Type, Accept, id");
    res.status(200).send();
    return;
  } else {
    console.log('Not an OPTIONS request');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Access-Token, X-Requested-With, Content-Type, Accept, id");

    next();
  }
}

module.exports = {
  verifyToken,
  issueToken,
  errorLogger,
  errorHandler,
  cors,
};