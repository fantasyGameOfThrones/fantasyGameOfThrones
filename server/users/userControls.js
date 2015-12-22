// var User = require('./userModel.js');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var db = require('../dbHelpers');
// SETUP AUTH ENDPOINT
module.exports = {
  updateUser: function (req, res, next) {
    var user = req.body;
    db.updateUser(user)
      .then(function (results) {
        console.log('in user update :', results);
        res.json({
          completed: true
        });
      });
  }
};