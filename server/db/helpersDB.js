var mysql = require('mysql');
var connection = require('./db');

// ROSTER_DATA QUERIES
// data = object with insert props. (user_id, char_id, league_id, episode num)
exports.createNew = function (data) {
 var sql = mysql.format('INSERT INTO roster_data SET ?', [data]);
 return connection.queryAsync(sql);
};


// OTHER QUERIES USED BY MULTIPLE CONTROLLERS