var Promise = require('bluebird');
var mysql = Promise.promisifyAll(require('mysql'));
var seedDB = require('./seedDB.js');

seedDB();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'got',
});

connection = Promise.promisifyAll(connection);

module.exports = connection;