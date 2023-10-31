// db/index.js
const db = require('./db');

const { User } = require('./models/User');
const { Table } = require('./models/Table');
const { Player } = require('./models/Player');
const { Waitlist } = require('./models/Waitlist');  
const { Session } = require('./models/Session');

// Associations

// Waitlist.belongsTo(Player, { foreignKey: 'playerId' });
// Player.hasMany(Waitlist, { foreignKey: 'playerId'});
// Waitlist.belongsTo(Table);
// Table.hasMany(Waitlist);


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
    Waitlist,
    Session
  },
};
