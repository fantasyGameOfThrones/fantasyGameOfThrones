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
  },
  options: {},
};

module.exports = function(db) {
  return db.define('league', config.attributes, config.options);
};