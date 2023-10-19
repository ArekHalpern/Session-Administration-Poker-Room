const Sequelize = require('sequelize');
const db = require('../db');

// Table Model
const Table = db.define('table', {
    number: { 
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },

    
});

module.exports = { Table };
