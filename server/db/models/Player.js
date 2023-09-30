const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('waiting', 'seated', 'left'),  // player status
      defaultValue: 'waiting'
    }
  });

  module.exports = Player;