var router = require('express').Router();
var controller = require('../controllers/authController.js');

router.post('/login', controller.login);
router.post('/signup', controller.signup);

module.exports = router;