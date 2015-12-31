var controller = require('./eventController');

module.exports = function (router) {
  router.post('/', controller.create);
  router.get('/:eventid', controller.retrieve);
  router.put('/:eventid', controller.update);
};