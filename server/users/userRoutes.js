var userControls = require('./userControls.js');

module.exports = function (app) {
  app.put('/update',  userControls.updateUser);
  app.delete('/delete', userControls.deleteUser);
};



