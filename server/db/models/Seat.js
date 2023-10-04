const Sequelize = require('sequelize');
const db = require('../db');

const Seat = db.define('seat', {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('empty', 'occupied'),
      defaultValue: 'empty'
    },
  });

  module.exports = { Seat };