var sequelize = require('sequelize');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));

var hashPassword = function(user) {
  return bcrypt.hashAsync(user.password, null, null)
    .then(function(hash) {
      user.password = hash;
    });
};

var comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var config = {
  attributes: {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  options: {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },

    instanceMethods: {
      comparePassword: comparePassword,
    },
  },
};

module.exports = function(db) {
  return db.define('user', config.attributes, config.options);
};