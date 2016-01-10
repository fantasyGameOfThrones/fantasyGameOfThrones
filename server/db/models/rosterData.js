var sequelize = require('sequelize');
var config = {
  attributes: {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    episode: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  options: {},
};

module.exports = function(db) {
  return db.define('rosterData', config.attributes, config.options);
};