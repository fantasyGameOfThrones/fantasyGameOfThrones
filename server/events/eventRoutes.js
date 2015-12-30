var eventControls = require('./eventControls');

module.exports = function (router) {
  router.post('/', eventControls.create);
  router.get('/:eventid', eventControls.retrieve);
  router.put('/:eventid', eventControls.update);
};