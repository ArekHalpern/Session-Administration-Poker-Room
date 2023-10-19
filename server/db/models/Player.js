const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
 
});

module.exports = { Player };

