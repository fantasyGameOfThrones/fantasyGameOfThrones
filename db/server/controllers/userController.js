var User = require('../../dbInterface').User;
var RosterData = require('../../dbInterface').RosterData;

module.exports = {
  retrieve: function (req, res) {
    var id = req.params.userId;
    User.findById(id, {attributes: {exclude: ['password']} })
    .then(function(user) {
      if (user) {
        res.status(201).json({user});
      } else {
        res.status(500).send('User does not exist');
      }
    })
    .catch(function(error) {
      console.error('Error finding user: ', error);
      res.status(500).send('Server error: user not found');
    })
  },
  
  update: function (req, res) {
    var id = req.params.userId;
    var updates = req.body;

    if (updates.leave) {
      // means user wants to leave league
      // update user, delete associated rows in RosterData,
      // fetch updated user and send back to client
      return User.findOne({where: {id}})
      .then((user) => {
        return user.setLeague(null);
      })
      .then(() => {
      // return User.update({league: null}, {where: {id: id}})
      // .then(function() {
        return RosterData.destroy({where: {userId: id}})
      })
      .then((rowsDestroyed) => {
        return User.findOne({where: {id}})
      })
      .then((user) => {
        res.status(201).json({user});
      })
      .catch((error) => {
        console.error('Error leaving league: ', error);
        res.status(500).send('Server error leaving league');
      });

    } else {

      User.update(updates, {where: {id}})
      .then(function(updateArray) {
        return User.findById(id, {attributes: {exclude: ['password']} })
      })
      .then(function(user) {
        if (user) {
          res.status(201).json({user});
        } else {
          res.status(500).send('User does not exist');
        }
      })
      .catch(function(error) {
        console.error('Error updating user: ', error);
        res.status(500).send('Server error updating user');
      });
    }
  },

  delete: function (req, res) {
    var id = req.params.userId;
    User.destroy({where: {id}})
    .then(function(numberDestroyed) {
      if (numberDestroyed) {
        res.status(201).json({
          success: true,
          userId: id
        });
      } else {
        res.status(500).send('Server error deleting user');
      }
    })
    .catch(function(error) {
      console.error('Error deleting user: ', error);
      res.status(500).send('Server error deleting user');
    });
  }
};