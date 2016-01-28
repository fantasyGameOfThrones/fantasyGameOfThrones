var db = require('../../dbInterface');
var League = db.League;
var User = db.User;
var makeRoster = require('../helpers').makeRoster;

// When you create a new league, you are adding a moderator at same time
// League Name and Username must be sent over
var create = function (req, res) {
  var name = req.body.name;
  var league = req.body;
  var userId = req.headers.id;

  return League.findOne({where: {name}})
  .then(function(league) {
    if (league) {
      res.status(409).send('League already exists.');
    } else {
      return League.create({name, moderatorId: userId});
    }
  })
  .then(function(league) {
    // associate league with user
    return User.update({leagueId: league.dataValues.id}, {where: {id: userId}})
    .then(function() {
      // eagerly load associated user
      return League.findOne({
        where: {
          id: league.id
        },
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          }
        }]
      });
    })
  })
  .then(function(league) {
    // should only be one user since league was just created
    return makeRoster(league.dataValues.users[0])
    .then(function(roster) {
      league.dataValues.users[0].dataValues.roster = roster;
      res.status(200).json(league);
    });
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Server error creating league: ', err);
  });

};

var update = function (req, res) {
  var league = req.body;
  var id = req.params.leagueId;

  return League.update(league, {where: {id}})
    .then(function (results) {
      // Sequelize only returns the number of rows affected
      // so we have to query again to grab the model
      return League.findOne({
        where: {id},
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          }
        }]
      });
    })
    .then(function(league) {
      res.status(200).json({league});
    })
    .catch(function (err) {
      console.error('Server error updating league: ', err);
      res.status(500).send('Server error updating league');
    });
};

var retrieve = function (req, res) {
  var id = req.params.leagueId;
  return League.findOne({
    where: {id},
    include: [{
      model: User,
      attributes: {
        exclude: ['password']
      }
    }]
  })
  .then(function(league) {
    res.status(200).json({league});
  })
  .catch(function(err) {
    console.err('Error retrieving league: ', err);
    res.status(500).send('Server error retrieving league');
  })
};

var destroy = function(req, res) {
  var id = req.params.leagueId;
  return League.destroy({where: {id}})
  .then(function(numDestroyed) {
    res.status(200).json({success: true, leagueId: id});
  })
  .catch(function(err) {
    console.err('Error deleting league: ', err);
    res.status(500).send('Server error deleting league');
  })
};

module.exports = {
  create,
  retrieve,
  update, 
  destroy
}