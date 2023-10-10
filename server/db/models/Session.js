const Sequelize = require('sequelize');
const db = require('../db');
const { Player } = require('./Player');  // Import Player model
const { Table } = require('./Table');  // Import Table model

const Session = db.define('session', {
    startTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: true  // This field will be null until the session ends
    },
    duration: {
        type: Sequelize.VIRTUAL,  // Virtual field, not stored in DB
        get() {
            if (this.endTime) {
                return (new Date(this.endTime) - new Date(this.startTime)) / (1000 * 60);  // Duration in minutes
            }
            return null;  // Duration is null if session hasn't ended
        }
    },
    playerId: {
        type: Sequelize.INTEGER,
        references: {
            model: Player,
            key: 'id',
        },
        allowNull: false
    },
    tableId: {
        type: Sequelize.INTEGER,
        references: {
            model: Table,
            key: 'id',
        },
        allowNull: false
    },
});


module.exports = { Session };
