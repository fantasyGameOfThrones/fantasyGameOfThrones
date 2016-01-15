var router = require('express').Router();
var request = require('request-promise');
var dbUrl = process.env.DB_URL || 'http://localhost:2391';

var authRouter = function(req, res, next) {
  return request.post({
    url: dbUrl + '/auth' + req.url,
    body: req.body,
    json: true
  })
  .then(function(dbRes) {
    res.body = dbRes.body;
    next();
  })
  .catch(function(err) {
    console.error('Error with req to database: ', err);
    res.body = err;
    next();
  });
};

router.use(authRouter);

module.exports = router;