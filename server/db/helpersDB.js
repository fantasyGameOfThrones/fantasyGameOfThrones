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
  var sql = mysql.format('SELECT * FROM roster_data WHERE user_id = ? AND league_id = ?', [data.user_id, data.league_id])
  return connection.queryAsync(sql);
};


// OTHER QUERIES USED BY MULTIPLE CONTROLLERS