var mysql = require('mysql');
var expect = require('chai').expect;
var authControls = require('./authDB');
var userControls = require('./userDB');
var leagueControls = require('./leagueDB');
var eventControls = require('./eventDB');
var characterControls = require('./characterDB');

/********************************************************
* Run this file first from root dir to drop/recreate DB 
* and tables: 'mysql -u root < server/db/schema.sql'
* Then Run: 'mocha server/db/tests/js'
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

describe('Auth Controller', function () {

  it('Should insert a new user into the DB', function (done) {
    
    authControls.addNewUser(users[0])
      .then(function (results) {
        
        authControls.findUser({username: users[0].username})
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

describe('League Controller', function () {

  it('Should insert a new league into the DB', function (done) {

    leagueControls.addLeague({name: 'targaryan', user_id: 1})
      .then(function (leagueCreated) {

        leagueControls.findLeague({name: 'targaryan'})
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

  });

  it('Should update league name', function (done) {
    leagueControls.updateLeague({name: 'targaryan', newName: 'johnsnow'})
      .then(function (results) {
        leagueControls.findLeague({name: 'johnsnow'})
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

describe('User Controller', function () {

  it('Should update users league', function (done) {
    
  });

});


describe('Events Controller', function () {
  it('Should insert a new event into the DB', function (done) {

  });

});

describe('Characters Controller', function () {
  it('Should insert a new character into the DB', function (done) {

  });

});
