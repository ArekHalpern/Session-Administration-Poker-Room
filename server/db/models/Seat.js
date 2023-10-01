const Sequelize = require('sequelize');
const db = require('../db');

const Seat = db.define('seat', {
  seatNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Seat;