'use strict';
var bootScript = require('./bootDB.js');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var mysql = Promise.promisifyAll(require('mysql'));

var characterPath = __dirname + '/../../testData/characterData.txt';
var eventPath = __dirname + '/../../testData/eventData.txt';
var leaguePath = __dirname + '/../../testData/leagueData.txt';
var rosterDataPath = __dirname + '/../../testData/rosterData.txt';

module.exports = function() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    multipleStatements: true,
  });

  var bootConnection = Promise.promisifyAll(connection);

  bootConnection.query(bootScript, function(err) {
    if (err) { console.log('bootScript error: ', err); }
  });

  var insertUser = function(username, password, email) {
    var user = {username: username, password: bcrypt.hashSync(password), email: email};
    var query = mysql.format('INSERT INTO users SET ?', [user]);
    bootConnection.query(query)
    // .then(function(err, user) { if (err) console.log('error inserting user into db: ', err); });
  };

  var updateUser = function(id, league_id) {
    var query = mysql.format('UPDATE users SET league_id = ? WHERE user_id = ?', [league_id, id]);
    bootConnection.query(query);
  };

  var loadUsers = function() {
    insertUser('naomi', 'hello', 'naomiajacobs@gmail.com', 1);
    insertUser('ryan', 'hello', 'ryan.wholey@hackreactor.com', 1);
    insertUser('brian', 'hello', 'brian.graham@hackreactor.com', 1);
    insertUser('dan', 'hello', 'dan.thareja@hackreactor.com', 1);
    insertUser('zach', 'hello', 'zach.lester@hackreactor.com', 2);
    insertUser('beth', 'hello', 'beth.johnson@hackreactor.com', 2);
  };

  loadUsers();

  var seedData = 'USE got;' +
    ' LOAD DATA INFILE "' + characterPath + '" INTO TABLE characters FIELDS TERMINATED BY "," ENCLOSED BY \'"\' LINES TERMINATED BY "\n" IGNORE 1 ROWS;' +
    ' LOAD DATA INFILE "' + eventPath + '" INTO TABLE events FIELDS TERMINATED BY "," ENCLOSED BY \'"\' LINES TERMINATED BY "\n" IGNORE 1 ROWS;' +
    ' LOAD DATA INFILE "' + leaguePath + '" INTO TABLE leagues FIELDS TERMINATED BY "," ENCLOSED BY \'"\' LINES TERMINATED BY "\n" IGNORE 1 ROWS;' +
    ' LOAD DATA INFILE "' + rosterDataPath + '" INTO TABLE roster_data FIELDS TERMINATED BY "," ENCLOSED BY \'"\' LINES TERMINATED BY "\n" IGNORE 1 ROWS;';

  bootConnection.query(seedData, function(err) {
    if (err) { console.log('seedData error: ', seedData); }
  });

  var updateUsers = function() {
    updateUser(1, 1);
    updateUser(2, 1);
    updateUser(3, 1);
    updateUser(4, 1);
    updateUser(5, 2);
    updateUser(6, 2);
  };

  updateUsers();

  bootConnection.end();
  
};

