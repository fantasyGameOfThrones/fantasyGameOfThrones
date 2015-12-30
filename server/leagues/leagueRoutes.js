var leagueControls = require('./leagueControls');

module.exports = function (router) {
  router.post('/', leagueControls.create);
  router.get('/:leagueid', leagueControls.retrieve);
  router.put('/:leagueid', leagueControls.update);
};