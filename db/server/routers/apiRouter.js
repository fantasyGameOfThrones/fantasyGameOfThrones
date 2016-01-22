var router = require('express').Router();

var characterRouter = require('./characterRouter.js');
var draftRouter = require('./draftRouter');
var eventRouter = require('./eventRouter.js');
var leagueRouter = require('./leagueRouter.js');
var userRouter = require('./userRouter.js');

router.use('/characters', characterRouter);
router.use('/draft', draftRouter);
router.use('/events', eventRouter);
router.use('/leagues', leagueRouter);
router.use('/users', userRouter);

module.exports = router;