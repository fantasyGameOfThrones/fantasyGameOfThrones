var router = require('express').Router();
var controller = require('./userController.js');

router.get('/:userid', controller.retrieve)
router.put('/:userid',  controller.update);
router.delete('/:userid', controller.delete);

module.exports = router;