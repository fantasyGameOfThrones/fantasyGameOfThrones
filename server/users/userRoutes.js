var controller = require('./userController.js');

module.exports = function (router) {
  router.get('/:userid', controller.retrieve)
  router.put('/:userid',  controller.update);
  router.delete('/:userid', controller.delete);
};