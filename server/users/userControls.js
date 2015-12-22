var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var db = require('../db/userDB.js');

module.exports = {
  updateUser: function (req, res, next) {
    var user = req.body;

    if (user.password) {
      bcrypt.hash(user.password, null, null, function (err, hash) {
        user.password = hash;
      });
    }

    db.updateUser(user)
      .then(function (results) {
        console.log('in user update :', results);
        res.json({
          completed: true
        });
      })
      .catch(function (err) {
        console.error("error with updating user: ", err);
      });
  },

  deleteUser: function (req, res, next) {
    var user = req.body;
    db.deleteUser(user)
      .then(function (results) {
        console.log("user deleted: ", results);
      })
      .catch(function (err) {
        console.error("something wrong with deleting user: ", err);
      });
  }
};