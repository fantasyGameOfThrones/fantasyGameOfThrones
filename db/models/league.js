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
    latestSeen: {
      type: sequelize.INTEGER,
      defaultValue: 0,
    }
  },
  options: {},
};

module.exports = function(db) {
  return db.define('league', config.attributes, config.options);
};