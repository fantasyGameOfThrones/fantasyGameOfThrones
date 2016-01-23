var router = require('express').Router();
var request = require('request-promise');
var dbUrl = process.env.DB_URL;

var ok = function(code) {
  return code >= 200 && code < 300;
};

var dbRouter = function(req, res, next) {
  var options = {
    method: req.method,
    uri: dbUrl + '/api' + req.url,
    json: true,
    body: req.body,
  };

  return request(options)
  .then(function(dbRes) {
    console.log('got resp back from db: ', dbRes);
    if (!ok(dbRes.statusCode)) {
      res.status(500).send('Server error: ', dbRes);
    } else { res.status(200).json(dbRes); }
  })
  .catch(function(err) {
    console.error('Error with req to database: ', err.message);
    res.status(500).send('Server error: ', err);
  });
};

router.use(dbRouter);

module.exports = router;