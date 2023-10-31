const Sequelize = require('sequelize');
const db = require('../db');
const { Player } = require('./Player'); 
const { Table } = require('./Table');  

const Session = db.define('session', {

    startTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: true
    },
    duration: {
        type: Sequelize.VIRTUAL,  
        get() {
            if (this.endTime) {
                return (new Date(this.endTime) - new Date(this.startTime)) / (1000 * 60);  
            }
            return null;
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
