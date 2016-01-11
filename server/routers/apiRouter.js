var router = require('express').Router();

var userRouter = require('../routers/userRouter.js')
var leagueRouter = require('../routers/leagueRouter.js')
var characterRouter = require('../routers/characterRouter.js')
var eventRouter = require('../routers/eventRouter.js')

router.use('/users', userRouter);
router.use('/leagues', leagueRouter);
router.use('/characters', characterRouter);
router.use('/events', eventRouter);

module.exports = router;