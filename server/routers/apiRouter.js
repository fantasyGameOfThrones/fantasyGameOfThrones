var router = require('express').Router();
var request = require('request-promise');
var dbUrl = process.env.DB_URL || 'http://localhost:2391';

var ok = function(code) {
  return code >= 200 && code < 300;
};

var dbRouter = function(req, res, next) {
  return request.post(dbUrl + '/api' + req.url, req.body)
  .then(function(dbRes) {
    if (!ok(dbRes.statusCode)) {
      res.status(500).send('Server error: ', dbRes.body);
    }

    res.status(200).json(dbRes.body);
  })
  .catch(function(err) {
    console.error('Error with req to database: ', err);
    res.status(500).send('Server error: ', err);
  });
};

router.use(dbRouter);

module.exports = router;