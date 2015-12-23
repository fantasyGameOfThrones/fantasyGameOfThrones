var leagueControls = require('./leagueControls');

module.exports = function (app) {
  app.post('/new', leagueControls.addLeague);
  app.put('/update', leagueControls.updateLeague);
  app.get('/:name', leagueControls.getLeagueInfo);
};