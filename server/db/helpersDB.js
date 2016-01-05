var mysql = require('mysql');
var connection = require('./db');

// ROSTER_DATA QUERIES

/*
* function: createNew
* arg: data: an object with 4 properties:
*        user_id, char_id, league_id, episode num 
* TODO: add error handling if data object is missing parameters needed to run query  
*/
exports.addCharacter = function (data) {
  var sql = mysql.format('INSERT INTO roster_data SET ?', [data]);
  return connection.queryAsync(sql);
};

exports.dropCharacter = function (data) {
  var sql = mysql.format('DELETE FROM roster_data WHERE user_id = ?' +
                         'AND char_id = ? AND league_id = ? AND episode = ?',
                         [data.user_id, data.char_id, data.league_id, data.episode]);
  return connection.queryAsync(sql);
};

// data object contains user_id and league_id
exports.getRosterData = function (data) {
  var sql = mysql.format('SELECT * FROM roster_data WHERE user_id = ? AND league_id = ?', [data.user_id, data.league_id]);
  return connection.queryAsync(sql);
};

// Grabs current users points and char_id
exports.getCharIdAndPoints = function (data) {
  var sql = mysql.format('SELECT DISTINCT events.points, events.char_id, events.episode, users.username \
                          FROM events \
                          INNER JOIN roster_data \
                          ON events.episode = roster_data.episode \
                          INNER JOIN users ON roster_data.user_id = users.user_id \
                          WHERE roster_data.league_id = 1 \
                          ORDER BY users.username, roster_data.episode', [data.leagueId]);
  return connection.queryAsync(sql);
};

// OTHER QUERIES USED BY MULTIPLE CONTROLLERS

// This query will pull all users roster in the same league
// SELECT points, events.char_id, users.username 
// FROM events 
// INNER JOIN roster_data 
// ON events.char_id = roster_data.char_id 
// INNER JOIN users 
// ON roster_data.user_id = users.user_id 
// WHERE roster_data.league_id = 1
// ORDER BY users.username;

