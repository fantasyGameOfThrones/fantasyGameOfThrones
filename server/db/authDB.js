var mysql = require('mysql');
var connection = require('./db');

exports.findUser = function (data) {
  var sql = mysql.format('SELECT * FROM users WHERE username = ?', [data.username]);
  return connection.queryAsync(sql);
};

exports.addNewUser = function (data) {
  var sql = mysql.format('INSERT INTO users SET ?', [data]);
  return connection.queryAsync(sql);
};