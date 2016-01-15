var User = require('../../dbInterface').User;

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
    var context = this;
    var id = req.params.userId;
    var updates = req.body;
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