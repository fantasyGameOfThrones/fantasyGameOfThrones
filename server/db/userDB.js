var mysql = require('mysql');
var connection = require('./db');

exports.updateUser = function (data, userId) {
  var sql = mysql.format('UPDATE users SET ? WHERE user_id = ?', [data, userId]);
  return connection.queryAsync(sql);
};

exports.deleteUser = function (data) {
  var sql = mysql.format('DELETE FROM users WHERE user_id = ?', [data.userId]);
  return connection.queryAsync(sql);
};