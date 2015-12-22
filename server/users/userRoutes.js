var userControls = require('./userControls.js');

module.exports = function (app) {
  app.post('/update',  userControls.updateUser);
  // app.post('/signup', add function );
};



