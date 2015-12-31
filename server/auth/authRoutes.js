var controller = require('./authController.js');

module.exports = function (router) {
  router.post('/login', controller.login);
  router.post('/signup', controller.signup);
  // Placeholder route for testing
  router.get('/placeholder', controller.placeholder);
};