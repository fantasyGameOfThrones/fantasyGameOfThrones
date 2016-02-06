var router = require('express').Router();
var logger = require('../helpers.js').logger;

var characterRouter = require('./characterRouter.js');
var draftRouter = require('./draftRouter');
var tradeRouter = require('./tradeRouter');
var eventRouter = require('./eventRouter.js');
var leagueRouter = require('./leagueRouter.js');
var userRouter = require('./userRouter.js');
var invitationRouter = require('./invitationRouter.js');

router.use('/characters', logger, characterRouter);
router.use('/draft', logger, draftRouter);
router.use('/events', logger, eventRouter);
router.use('/leagues', logger, leagueRouter);
router.use('/users', logger, userRouter);
router.use('/trade', logger, tradeRouter);
router.use('/invitations', logger, invitationRouter);

module.exports = router;