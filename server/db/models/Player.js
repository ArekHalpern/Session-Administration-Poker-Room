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
  status: {
    type: Sequelize.ENUM('waiting', 'seated', 'left'),
    defaultValue: 'waiting'
  },
  seatedAt: {
    type: Sequelize.DATE,
    allowNull: true  // allowNull is true since the player might not have been seated yet
  },
  leftAt: {
    type: Sequelize.DATE,
    allowNull: true  // allowNull is true since the player might not have left yet
  }
});

Player.addHook('beforeSave', (player, options) => {
  if (player.changed('status')) {  // Check if the status field has changed
    if (player.status === 'seated') {
      player.seatedAt = new Date();  // Set seatedAt to now if status changed to 'seated'
    } else if (player.status === 'left') {
      player.leftAt = new Date();  // Set leftAt to now if status changed to 'left'
    }
  }
});

module.exports = Player;
