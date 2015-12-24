var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  var userRouter = express.Router();
  var leagueRouter = express.Router();
  var characterRouter = express.Router();
  var eventRouter = express.Router();
  var authRouter = express.Router();

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../dist'));

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.use('/api/users', userRouter);
  app.use('/api/leagues', leagueRouter);
  app.use('/api/characters', characterRouter);
  app.use('/api/events', eventRouter);
  app.use('/api/auth', authRouter);


  //NEED TO: add requires for userRoutes etc, inject the routers into each
  // Need files for userRoutes, league, character, events
  require('../users/userRoutes.js')(userRouter);
  require('../leagues/leagueRoutes.js')(leagueRouter);
  // require('../server/characters/characterRoutes.js')(characterRouter);
  // require('../server/events/eventRoutes.js')(eventRouter);
  require('../auth/authRoutes.js')(authRouter);
};