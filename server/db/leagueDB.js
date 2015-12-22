var mysql = require('mysql');
var connection = require('./db');

exports.findLeague = function (data) {
  var sql = mysql.format('SELECT * from leagues WHERE name = ?', [data.name]);
  return connection.queryAsync(sql);
};

exports.addLeague = function (data) {
  var sql = mysql.format('INSERT INTO leagues SET ?', [data]);
  return connection.queryAsync(sql);
};

exports.updateLeague = function (data) {
  // update name, data object's 'newName' param holds the updated name
  var sql = mysql.format('UPDATE leagues SET ? WHERE name = ?', 
                    [{ name : data.newName }, data.name]);
  return connection.queryAsync(sql);
};

exports.removeLeague = function (data) {
  var sql = mysql.format('DELETE FROM leagues WHERE name = ?', [data.name]);
  return connection.queryAsync(sql);
};

exports.getLeagueInfo = function (data) {
  // Create Join Table
  var sql = mysql.format('SELECT users.username, leagues.name FROM users \
                      INNER JOIN leagues ON users.league_id = leagues.league_id \
                      WHERE leagues.league_id = ?', [data.league_id]);
  return connection.queryAsync(sql);
};