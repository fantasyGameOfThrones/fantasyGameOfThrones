var mysql = require('mysql');
var connection = require('./db');

exports.addEvent = function (data) {
  var sql = mysql.format('INSERT INTO events SET ?', [data]);
  return connection.queryAsync(sql);
};

exports.updateEvent = function (data, id) {
  var sql = mysql.format('UPDATE events SET ? WHERE event_id = ?', [data, id]);
  return connection.queryAsync(sql);
};

exports.getEventInfo = function (data) {

};