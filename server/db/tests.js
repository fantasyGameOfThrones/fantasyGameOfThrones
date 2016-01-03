var mysql = require('mysql');
var expect = require('chai').expect;
var authDB = require('./authDB');
var userControls = require('./userDB');
var leagueDB = require('./leagueDB');
var eventDB = require('./eventDB');
var characterDB = require('./characterDB');
var helperDB = require('./helpersDB');

/********************************************************
* Run this file first from root dir to drop/recreate DB 
* and tables: 'mysql -u root < server/db/schema.sql'
* Then Run: 'mocha server/db/tests.js'
*********************************************************/

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'got'
});

var users = [
  {
    username: 'user1',
    password: 'password'
  },
  {
    username: 'user2',
    password: 'password'
  },
  {
    username: 'user3',
    password: 'password'
  }
];

describe('Auth DB Queries', function () {

  it('Should insert a new user into the DB', function (done) {
    
    authDB.addNewUser(users[0])
      .then(function (results) {
        
        authDB.findUser({username: users[0].username})
          .then(function (user) {
            expect(user[0].username).to.equal('user1');
            done();
          });
      })
      .catch(function (err) {
        console.error('error in new user test: ', err);
        done(err);
      });
  });

});

describe('League DB Queries', function () {

  it('Should insert a new league into the DB', function (done) {

    leagueDB.addLeague({name: 'targaryan', user_id: 1})
      .then(function (leagueCreated) {

        leagueDB.findLeague({ leagueId: 1 })
          .then(function (league) {
            expect(league[0].name).to.equal('targaryan');
            done();
          })
          .catch(function (err) {
            console.error('error in new league test: ', err);
            done(err);
          });
      });
  });

  it('Should update league with a different user_id', function (done) {
    // add new user to become new league mod
    authDB.addNewUser(users[1])
      .then(function (results) {
        // then update league with new user_id
        leagueDB.updateLeague({userId: 1, newUserId: 2})
          .then(function (idUpdated) {
            leagueDB.findLeague({ leagueId: 1 })
              .then(function (leagueFound) {
                expect(leagueFound[0].user_id).to.equal(2);
                done();
              });
          });
      })
      .catch(function (err) {
        console.error('something wrong in updating league user_id test: ', err);
        done();
      });
  });

  it('Should update league name', function (done) {
    leagueDB.updateLeague({name: 'targaryan', newName: 'johnsnow'})
      .then(function (results) {
        leagueDB.findLeague({ leagueId: 1 })
          .then(function (league) {
            // check for same id as original league stored
            expect(league[0].league_id).to.equal(1);
            done();
          })
          .catch(function (err) {
            console.error('something wrong updating league name: ', err);
            done(err);
          });
      });
  });

});

describe('User DB Queries', function () {

  it('Should update users league', function (done) {
    
  });

});


describe('Events DB Queries', function () {
  it('Should insert a new event into the DB', function (done) {

  });

});

describe('Characters DB Queries', function () {
  it('Should insert a new character into the DB', function (done) {

  });

});

describe('Helper DB Queries', function () {
  it('Should insert user roster data into ROSTER_DATA', function () {

  });

  it('Should delete user roster data from ROSTER_DATA', function () {

  });
});
