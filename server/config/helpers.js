module.exports = {
  errorLogger: function (err, req, res, next) {
    console.error(err.stack);
    next(err);
  },

  errorHandler: function (err, req, res, next) {
    res.sendStatus(500).send({ error: err.message });
  }
};