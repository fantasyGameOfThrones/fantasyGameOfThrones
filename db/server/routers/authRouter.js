var router = require('express').Router();

var authController = require('../controllers/authController.js');

router.use('/login', authController.login);
router.use('/signup', authController.signup);

module.exports = router;