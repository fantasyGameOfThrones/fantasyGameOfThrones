var mysql = require('mysql');
var connection = require('./db');

exports.findLeague = function (data) {
  var sql = mysql.format('SELECT * from leagues WHERE league_id = ?', [data.leagueId]);
  return connection.queryAsync(sql);
};

exports.addLeague = function (data) {
  var sql = mysql.format('INSERT INTO leagues SET ?', [data]);
  return connection.queryAsync(sql);
};

exports.updateLeague = function (data) {
  // update name, data object's 'newName' param holds the updated name
  var sql;
  if (data.newName) {
    sql = mysql.format('UPDATE leagues SET ? WHERE name = ?', 
                    [{ name : data.newName }, data.name]);
  } else if (data.newUserId) {
    sql = mysql.format('UPDATE leagues SET ? WHERE user_id = ?',
                    [{ user_id: data.newUserId }, data.userId]);
  }
  
  return connection.queryAsync(sql);
};

exports.removeLeague = function (data) {
  var sql = mysql.format('DELETE FROM leagues WHERE name = ?', [data.name]);
  return connection.queryAsync(sql);
};

exports.getLeagueInfo = function (data) {
  // Create Join Table
  var sql = mysql.format('SELECT users.user_id, users.username, leagues.league_id FROM users \
                      INNER JOIN leagues ON users.league_id = leagues.league_id \
                      WHERE leagues.league_id = ?', [data.league_id]);
  return connection.queryAsync(sql);
};