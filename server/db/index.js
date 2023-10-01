// db/index.js
const db = require('./db');

const User = require('./models/User');
const Table = require('./models/Table');
const Player = require('./models/Player');
const Seat = require('./models/Seat');
const Waitlist = require('./models/Waitlist');  // Import the Waitlist model

// Associations
Player.belongsTo(Table, { foreignKey: 'tableId' });
Table.hasMany(Player, { foreignKey: 'tableId' });

Table.hasMany(Seat, { as: 'tableSeats', foreignKey: 'tableId', onDelete: 'CASCADE' });
Seat.belongsTo(Table, { foreignKey: 'tableId' });

Player.hasOne(Seat, { foreignKey: 'playerId', onDelete: 'CASCADE' });
Seat.belongsTo(Player, { foreignKey: 'playerId' });

Table.hasMany(Waitlist, { as: 'waitlist', foreignKey: 'tableId', onDelete: 'CASCADE' });  // New association
Waitlist.belongsTo(Table, { foreignKey: 'tableId' });  // New association
Waitlist.belongsTo(Player, { foreignKey: 'playerId' });  // New association
Player.hasMany(Waitlist, { foreignKey: 'playerId', onDelete: 'CASCADE' });  // New association

module.exports = {
  db,
  models: {
    User,
    Table,
    Player,
    Seat,
    Waitlist  
  },
}

