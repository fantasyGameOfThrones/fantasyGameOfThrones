var router = require('express').Router();
var controller = require('../controllers/draftController');

router.get('/:draftId', controller.startDraft);
router.post('/:draftId', controller.submitDraft);

module.exports = router;