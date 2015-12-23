var mysql = require('mysql');
var connection = require('./db');

exports.updateUser = function (data, username) {
  var sql = mysql.format('UPDATE users SET ? WHERE username = ?', [data, username]);
  return connection.queryAsync(sql);
};

exports.deleteUser = function (data) {
  var sql = mysql.format('DELETE FROM users WHERE username = ?', [data.username]);
  return connection.queryAsync(sql);
};