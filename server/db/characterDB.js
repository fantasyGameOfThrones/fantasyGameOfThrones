var mysql = require('mysql');
var connection = require('./db');

exports.addCharacter = function (data) {
  var sql = mysql.format('INSERT INTO characters SET ?', [data]);
  return connection.queryAsync(sql);
};

// Data is an object
// charId is the characters id
exports.updateCharacter = function (data, charId) {
  var sql = mysql.format('UPDATE characters SET ? WHERE char_id = ?', [data, charId]);
  return connection.queryAsync(sql);
};

exports.getCharacterInfo = function (data) {
  
};