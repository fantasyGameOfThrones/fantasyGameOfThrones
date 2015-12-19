var bodyParser = require('body-parser');
// var helpers = require('./helpers.js');

module.exports = function (app, express) {
  var userRouter = express.Router();
  var leagueRouter = express.Router();
  var characterRouter = express.Router();

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../dist'));

  app.use('/api/users', userRouter);
  app.use('/api/leagues', leagueRouter);
  app.use('/api/characters', characterRouter);

  //NEED TO: add requires for userRoutes and postRoutes, inject the routers into each
  // Need files for userRoutes, league, character
};