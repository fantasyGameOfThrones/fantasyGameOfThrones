var router = require('express').Router();
var controller = require('../controllers/userController.js');

router.get('/:userId', controller.retrieve)
router.put('/:userId',  controller.update);
router.delete('/:userId', controller.delete);

module.exports = router;