var router = require('express').Router();
var controller = require('../controllers/leagueController');

router.post('/', controller.create);
router.get('/:leagueId', controller.retrieve);
router.put('/:leagueId', controller.update);

module.exports = router;