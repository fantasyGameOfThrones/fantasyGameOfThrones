var authControls = require('./authControls.js');

module.exports = function (app) {
  app.post('/login', authControls.login);
  app.post('/signup', authControls.signUp);
  app.get('/getUser', authControls.getUser);
};