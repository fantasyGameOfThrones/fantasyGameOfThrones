var router = require('express').Router();
var controller = require('./leagueController');

router.post('/', controller.create);
router.get('/:leagueid', controller.retrieve);
router.put('/:leagueid', controller.update);

module.exports = router;