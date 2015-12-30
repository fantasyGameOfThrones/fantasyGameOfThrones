var authControls = require('./authControls.js');

module.exports = function (router) {
  router.post('/login', authControls.login);
  router.post('/signup', authControls.signup);
  // Placeholder route for testing
  router.get('/placeholder', authControls.placeholder);
};