var router = require('express').Router();
var controller = require('./characterController.js');

router.post('/', controller.create);
router.put('/:characterId', controller.update);
router.get('/:characterId', controller.retrieve);

module.exports = router;