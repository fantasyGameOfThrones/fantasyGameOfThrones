var sequelize = require('sequelize');
var config = {
  attributes: {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    nickname: {
      type: sequelize.STRING,
    },
    house: {
      type: sequelize.STRING,
    },
    imageUrl: {
      allowNull: false,
      // eventually store actual image here
      type: sequelize.STRING,
    },
  },
  options: {},
};

module.exports = function(db) {
  return db.define('character', config.attributes, config.options);
};