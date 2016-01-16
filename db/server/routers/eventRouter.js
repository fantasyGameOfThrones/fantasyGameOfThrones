var router = require('express').Router();
var controller = require('../controllers/eventController');

router.post('/', controller.create);
router.get('/:eventid', controller.retrieve);
router.put('/:eventid', controller.update);

module.exports = router;