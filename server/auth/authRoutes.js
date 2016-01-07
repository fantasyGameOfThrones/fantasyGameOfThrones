var authControls = require('./authControls.js');

module.exports = function (router) {
  router.post('/login', authControls.login);
  router.post('/signup', authControls.signup);
};