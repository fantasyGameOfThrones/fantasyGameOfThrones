/*************************************************************************
* DATABASE METHODS
* About this file:
*   The MYSQL queries are promisified, so all you need to do
*   to utilize these methods is to add a '.then(function (results)...'
*   to the end of the function call.
* PARAMS: Object
* RETURN: An Array of Results
**************************************************************************/
var connection = require('./db');
var mysql = require('mysql');
var Promise = require('bluebird');

/*******************************
* AUTH METHODS
********************************/

exports.findUser = function (data) {
  return connection.queryAsync('SELECT * FROM users WHERE username = ?', [data.username]);
};

exports.addNewUser = function (data) {
  var sql = 'INSERT INTO users SET ?';
  var inserts = [data];
  sql = mysql.format(sql, inserts);
  return connection.queryAsync(sql);
};

/*******************************
* USER METHODS
********************************/

exports.updateUser = function (data) {
  // find user
    // if not found, return 404
    // if found, do below:
  var sql = 'UPDATE users SET ? WHERE username = ?';
  var inserts = [data];
  // if (data.password) {
  //   // update password
  // } else if (data.isModerator) {
  //   inserts.push({ isModerator: data.isModerator });
  // } else if (data.league_id) {
  //   inserts.push({ league_id: data.league_id });
  // }
  inserts.push(data.username);
  sql = mysql.format(sql, inserts);
  return connection.queryAsync(sql);
};

// exports.deleteUser = function (data) {};

/*******************************
* CHARACTER METHODS
********************************/

exports.addCharacter = function (data) {
  return connection.queryAsync('INSERT INTO characters SET ?', data);
};

exports.updateCharacter = function (data) {
  var sql = 'UPDATE characters SET ? WHERE name = ?';
  var inserts = [data];
  inserts.push(data.name); // maybe add second param to function for name?
  sql = mysql.format(sql, inserts);
  return connection.queryAsync(sql);
};

exports.getCharacterInfo = function (data) {
  
};

/*******************************
* EVENT METHODS
********************************/

exports.addEvent = function (data) {
  return connection.queryAsync('INSERT INTO events SET ?', data);
};

exports.updateEvent = function (data) {

};

exports.getEventInfo = function (data) {

};

/*******************************
* LEAGUE METHODS
********************************/

exports.findLeague = function (data) {
  return connection.queryAsync('SELECT * from leagues WHERE name = ?', [data.name]);
};

exports.addLeague = function (data) {
  return connection.queryAsync('INSERT INTO leagues SET ?', data);
};

exports.updateLeague = function (data) {
  // update name, data object's 'newName' param holds the updated name
  var sql = 'UPDATE leagues SET ? WHERE name = ?';
  var inserts = [{ name : data.newName }, data.name];
  sql = mysql.format(sql, inserts);
  return connection.queryAsync(sql);
};

exports.removeLeague = function (data) {

};

exports.getLeagueInfo = function (data) {
  // Create Join Table
  return connection.queryAsync('SELECT users.username, leagues.name FROM users \
                               INNER JOIN leagues ON users.league_id = leagues.league_id \
                               WHERE leagues.league_id = ?', [data.league_id]);
};

process.on('exit', function() {
  connection.end();
});

