var router = require('express').Router();
var controller = require('../controllers/tradeController.js');

router.post('/', controller.update);

module.exports = router;