var mysql = require('mysql');
var expect = require('chai').expect;
var authDB = require('./authDB');
var userDB = require('./userDB');
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

var characters = [
  {
    name: 'billy',
    house: 'rednecks',
    image: 'http://www.google.com'
  }
];

var events = [
  {
    type: 'killed',
    description: 'this dudes mom kills this dude billy',
    points: 150,
    season: 6,
    episode: 1,
    char_id: 1
  }
];

describe('Auth DB Queries', function () {

  it('Should insert a new user into the DB', function (done) {
    
    authDB.addNewUser(users[0])
      .then(function (results) {
        
        authDB.findUser({ userId: 1 })
          .then(function (user) {
            expect(user[0].username).to.equal('user1');
            done();
          });
      })
      .catch(function (err) {
        console.error('error in new user test: ', err);
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
        
        leagueDB.updateLeague({ userId: 1, newUserId: 2 })
          .then(function (idUpdated) {
            // Should also update users table: old user isMod to false
            // And update newUser isMod to true
            userDB.updateUser({ isModerator: false }, 1)
              .then(function (updated) {
                userDB.updateUser({ isModerator: true }, 2)
                  .then(function (updated) {
                    // verify league was updated
                    leagueDB.findLeague({ leagueId: 1 })
                      .then(function (leagueFound) {
                        expect(leagueFound[0].user_id).to.equal(2);
                        done();
                      });   
                  });
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
    userDB.updateUser({ league_id: 1}, 2)
      .then(function (updated) {
        authDB.findUser({ userId: 2 })
          .then(function (user) {
            expect(user[0].league_id).to.equal(1);
            done();
          });
      })
      .catch(function (err) {
        console.error('something wrong update users league test: ', err);
        done();
      });
  });
});

describe('Characters DB Queries', function (done) {
  it('Should insert a new character into the DB', function (done) {
    characterDB.addCharacter(characters[0])
      .then(function (character) {
        expect(character.insertId).to.equal(1);
        done();
      })
      .catch(function (err) {
        console.error('something wrong inserting character test: ', err);
      });
  });

});

describe('Events DB Queries', function () {
  it('Should insert a new event into the DB', function (done) {
    eventDB.addEvent(events[0])
      .then(function (event) {
        expect(event.insertId).to.equal(1);
        done();
      })
      .catch(function (err) {
        console.error('something wrong adding event test: ', err);
      });
  });
});


describe('Helper DB Queries', function () {
  it('Should insert user roster data into ROSTER_DATA', function (done) {
    helperDB.addCharacter({ league_id: 1, user_id: 2, char_id: 1, episode: 1 })
      .then(function (character) {
        expect(character.insertId).to.equal(1);
        done();
      })
      .catch(function (err) {
        console.error('something wrong inserting into roster_data test: ', err);
      });
  });

  xit('Should update user roster data from ROSTER_DATA', function (done) {

  });

  xit('Should delete user roster data from ROSTER_DATA', function (done) {

  });
});
