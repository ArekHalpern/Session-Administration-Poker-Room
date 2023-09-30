const Sequelize = require('sequelize');
const db = require('../db');

// Table Model
const Table = db.define('table', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  seats: {
    type: Sequelize.INTEGER,
    defaultValue: 10  // default number of seats
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),  // table status
    defaultValue: 'open'
  }
});

module.exports = Table;