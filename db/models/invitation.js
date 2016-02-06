var sequelize = require('sequelize');
var config = {
  attributes: {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: sequelize.STRING,
      defaultValue: 'pending',
    }
  },
  options: {},
};

module.exports = function(db) {
  return db.define('invitation', config.attributes, config.options);
};