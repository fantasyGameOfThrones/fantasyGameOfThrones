var router = require('express').Router();
var controller = require('../controllers/invitationController.js');

router.post('/', controller.create);
router.put('/:invitationId', controller.update);
// router.get('/:invitationId', controller.retrieve);

module.exports = router;