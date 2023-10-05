const Sequelize = require('sequelize');
const db = require('../db');
const { Table } = require('./Table');  // Import Table model
const { Player } = require('./Player');  // Import Player model

const Waitlist = db.define('waitlist', {
  notes: {
    type: Sequelize.TEXT,
    allowNull: true, 
  },
  playerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Player,
      key: 'id',
    },
    allowNull: false,
  },
  tableId: {
    type: Sequelize.INTEGER,
    references: {
      model: Table,
      key: 'id',
    },
    allowNull: true,
  },
});


module.exports = { Waitlist };