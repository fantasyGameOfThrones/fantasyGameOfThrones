var controller = require('./leagueController');

module.exports = function (router) {
  router.post('/', controller.create);
  router.get('/:leagueid', controller.retrieve);
  router.put('/:leagueid', controller.update);
};