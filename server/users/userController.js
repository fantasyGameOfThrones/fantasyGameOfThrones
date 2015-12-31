var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var db = require('../db/userDB.js');

var updateHelper = function (userObj, res) {
  db.updateUser(userObj, userObj.username)
    .then(function (results) {
      console.log('in user update :', results);
      res.json({
        completed: true
      });
    })
    .catch(function (err) {
      console.error("error with updating user: ", err);
    });
};

module.exports = {
  retrieve: function (req, res, next) {
    
  },
  
  update: function (req, res, next) {
    var user = req.body;

    if (user.password) {
      bcrypt.hash(user.password, null, null, function (err, hash) {
        user.password = hash;
        updateHelper(user, res);
      });
    } else {
      updateHelper(user, res);
    }
  },

  delete: function (req, res, next) {
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