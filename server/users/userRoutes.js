var userControls = require('./userControls.js');

module.exports = function (router) {
  router.get('/:userid', userControls.retrieve)
  router.put('/:userid',  userControls.update);
  router.delete('/:userid', userControls.delete);
};