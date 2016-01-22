var router = require('express').Router();
var controller = require('../controllers/draftController');

router.get('/:leagueId', controller.startDraft);
router.post('/:leagueId', controller.submitDraft);

module.exports = router;