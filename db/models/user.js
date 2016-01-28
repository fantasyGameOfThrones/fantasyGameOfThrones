var sequelize = require('sequelize');
var Bluebird = require('bluebird');
var bcrypt = Bluebird.promisifyAll(require('bcrypt-nodejs'));

var hashOnePassword = function(user) {
  // even though we promisified bcrypt
  // we still must pass in null args for the now-useless
  // callbacks so that bcrypt doesn't have a hissy fit
  return bcrypt.genSaltAsync(null)
  .then(function(salt) {
    return bcrypt.hashAsync(user.dataValues.password, salt, null);
  })
  .then(function(hash) {
    user.password = hash;
  })
  .catch(function(err) {
    console.error('Error hashing password: ', err);
  });
};

var hashMultiplePasswords = function(userArray) {
  // TODO: make async? worth it?
  userArray.forEach(function(user) {
    var salt = bcrypt.genSaltSync();
    var hash = bcrypt.hashSync(user.dataValues.password, salt);
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
      beforeBulkCreate: hashMultiplePasswords,
      beforeCreate: hashOnePassword,
      beforeUpdate: hashOnePassword,
    },

    instanceMethods: {
      comparePassword: comparePassword,
    },
  },
};

module.exports = function(db) {
  return db.define('user', config.attributes, config.options);
};