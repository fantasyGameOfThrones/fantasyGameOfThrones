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
    droppedFor: {
      type: sequelize.INTEGER,
      defaultValue: null,
    },

    // Sequelize does not support unique many:many rows at this time,
    // so we have to manually add them here
    // https://github.com/sequelize/sequelize/issues/3220#issuecomment-75924060
    userId: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    characterId: {
      type: sequelize.INTEGER,
      allowNull: false,
    }
  },
  options: {},
};

module.exports = function(db) {
  return db.define('rosterData', config.attributes, config.options);
};