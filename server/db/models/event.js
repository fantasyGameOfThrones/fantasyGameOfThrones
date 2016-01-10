var sequelize = require('sequelize');
var config = {
  attributes: {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: sequelize.STRING,
    },
    points: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    episode: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  options: {},
};

module.exports = function(db) {
  return db.define('event', config.attributes, config.options);
};