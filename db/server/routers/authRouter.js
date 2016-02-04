var router = require('express').Router();
var logger = require('../helpers.js').logger;

var authController = require('../controllers/authController.js');

router.use('/login', logger, authController.login);
router.use('/signup', logger, authController.signup);

module.exports = router;