var Promise = require('bluebird');
var mysql = Promise.promisifyAll(require('mysql'));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'got'
});

connection = Promise.promisifyAll(connection);

module.exports = connection;