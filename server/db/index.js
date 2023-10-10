// db/index.js
const db = require('./db');

const { User } = require('./models/User');
const { Table } = require('./models/Table');
const { Player } = require('./models/Player');
const { Seat } = require('./models/Seat');
const { Waitlist } = require('./models/Waitlist');  
const { Session } = require('./models/Session');

// Associations
Player.belongsTo(Table, { foreignKey: 'tableId' });
Table.hasMany(Player, { foreignKey: 'tableId' });

Seat.belongsTo(Table, { foreignKey: 'tableId' });
Table.hasMany(Seat, { foreignKey: 'tableId', onDelete: 'CASCADE' });

Seat.belongsTo(Player, { foreignKey: 'playerId', allowNull: true });
Player.hasMany(Seat, { foreignKey: 'playerId', onDelete: 'SET NULL' });

Waitlist.belongsTo(Table, { foreignKey: 'tableId' });
Table.hasMany(Waitlist, { foreignKey: 'tableId', onDelete: 'CASCADE' });

Waitlist.belongsTo(Player, { foreignKey: 'playerId' });
Player.hasMany(Waitlist, { foreignKey: 'playerId', onDelete: 'CASCADE' });

Session.belongsTo(Player, { foreignKey: 'playerId' });
Session.belongsTo(Table, { foreignKey: 'tableId' });
Player.hasMany(Session, { foreignKey: 'playerId' });
Table.hasMany(Session, { foreignKey: 'tableId' });

module.exports = {
  db,
  models: {
    User,
    Table,
    Player,
    Seat,
    Waitlist,
    Session
  },
};
