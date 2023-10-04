const Sequelize = require('sequelize');
const db = require('../db');

const Waitlist = db.define('waitlist', {
  position: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});


module.exports = { Waitlist };